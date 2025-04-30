import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { z } from 'zod';

admin.initializeApp();
const db = admin.firestore();

// Define schema for input validation
const formDataSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name cannot exceed 100 characters"),
  category: z.enum([
    'Product Feedback',
    'Website Improvements',
    'Customer Service', 
    'Bug Report',
    'Feature Request',
    'Other'
  ], {
    errorMap: () => ({ message: "Please select a valid category" })
  }),
  suggestions: z.string().max(1000, "Suggestions cannot exceed 1000 characters").optional(),
});

// Function to format date as dd-mm-yyyy
const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Cloud function to handle feedback submission
export const submitFeedback = functions.https.onCall(async (data, context) => {
  try {
    // Validate form data
    const validatedData = formDataSchema.parse(data);
    
    // Sanitize input (basic sanitization)
    const sanitizedData = {
      name: validatedData.name.trim(),
      category: validatedData.category,
      suggestions: validatedData.suggestions ? validatedData.suggestions.trim() : "",
    };
    
    // Get counter document for automatic numbering
    const counterRef = db.collection('counters').doc('submissions');
    
    // Transaction to ensure atomic incrementing of the counter
    const result = await db.runTransaction(async (transaction) => {
      const counterDoc = await transaction.get(counterRef);
      
      // Get current count or initialize if first entry
      const currentCount = counterDoc.exists ? counterDoc.data()?.count || 0 : 0;
      const newCount = currentCount + 1;
      
      // Update counter
      transaction.set(counterRef, { count: newCount }, { merge: true });
      
      // Current date formatted as dd-mm-yyyy
      const currentDate = formatDate(new Date());
      
      // Create new submission document
      const submissionRef = db.collection('submissions').doc();
      transaction.set(submissionRef, {
        ...sanitizedData,
        entryNumber: newCount,
        createdAt: currentDate,
        timestamp: admin.firestore.FieldValue.serverTimestamp() // For sorting purposes
      });
      
      return { success: true, id: submissionRef.id };
    });
    
    return { success: true, message: "Feedback submitted successfully", id: result.id };
  } catch (error) {
    console.error("Error processing feedback submission:", error);
    
    if (error instanceof z.ZodError) {
      // Return validation errors
      const errorMessages = error.errors.map(err => `${err.path}: ${err.message}`).join(', ');
      throw new functions.https.HttpsError('invalid-argument', errorMessages);
    }
    
    throw new functions.https.HttpsError(
      'internal', 
      'An unexpected error occurred while processing your feedback'
    );
  }
});