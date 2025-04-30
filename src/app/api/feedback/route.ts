import { NextResponse } from 'next/server'
import { z } from 'zod'
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import categories from '../../../data/categories.json'
import { FormData as CustomFormData } from '../../../types'

// Initialize Firebase Admin
let db;

try {
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}'
  )

  if (getApps().length === 0) {
    const app = initializeApp({
      credential: cert(serviceAccount)
    })
    db = getFirestore(app);
  } else {
    db = getFirestore();
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Fallback to mock implementation if Firebase init fails
}

// Define submission type
interface Submission {
  id: string;
  name: string;
  category: string;
  suggestions: string;
  entryNumber: number;
  createdAt: string;
  timestamp: Date;
}

// Mock database as fallback
let mockSubmissions: Submission[] = [];
let mockCounter = 0;

// Schema validation with support for custom categories
const formDataSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name cannot exceed 100 characters"),
  category: z.string().min(1, "Category is required").max(100, "Category cannot exceed 100 characters"),
  customCategory: z.string().optional(),
  suggestions: z.string().max(1000, "Suggestions cannot exceed 1000 characters").optional(),
})

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const validatedData = formDataSchema.parse(data) as CustomFormData
    
    // Determine the category (use customCategory if category is "Other")
    let categoryValue = validatedData.category
    if (validatedData.category === "Other" && validatedData.customCategory) {
      categoryValue = validatedData.customCategory
    }
    
    // Sanitize input
    const sanitizedData = {
      name: validatedData.name.trim(),
      category: categoryValue.trim(),
      suggestions: validatedData.suggestions ? validatedData.suggestions.trim() : "",
    }

    // Current date formatted
    const currentDate = formatDate(new Date())
    
    if (db) {
      try {
        // Firebase implementation
        // Get counter for automatic numbering
        const counterRef = db.collection('counters').doc('submissions')
        
        const result = await db.runTransaction(async (transaction) => {
          const counterDoc = await transaction.get(counterRef)
          const currentCount = counterDoc.exists ? counterDoc.data()?.count || 0 : 0
          const newCount = currentCount + 1
          
          transaction.set(counterRef, { count: newCount }, { merge: true })
          
          const submissionRef = db.collection('submissions').doc()
          transaction.set(submissionRef, {
            ...sanitizedData,
            entryNumber: newCount,
            createdAt: currentDate,
            timestamp: new Date()
          })
          
          return { success: true, id: submissionRef.id }
        })
        
        console.log('Firebase submission saved:', result.id);
        
        return NextResponse.json({ 
          success: true, 
          message: "Feedback submitted successfully to Firebase", 
          id: result.id 
        })
      } catch (firebaseError) {
        console.error('Firebase error:', firebaseError);
        // Fall back to mock implementation if Firebase operation fails
      }
    }
    
    // Mock implementation as fallback
    mockCounter++;
    const submissionId = `mock-${Date.now()}`;
    
    const submission = {
      id: submissionId,
      ...sanitizedData,
      entryNumber: mockCounter,
      createdAt: currentDate,
      timestamp: new Date()
    };
    
    mockSubmissions.push(submission);
    console.log('Mock submission saved:', submission);
    
    return NextResponse.json({ 
      success: true, 
      message: "Feedback submitted successfully (mock)", 
      id: submissionId 
    })
  } catch (error) {
    console.error("Error processing feedback submission:", error)
    
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => `${err.path}: ${err.message}`).join(', ')
      return NextResponse.json(
        { error: errorMessages },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your feedback' },
      { status: 500 }
    )
  }
}