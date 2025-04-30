// Our custom form data type - renamed to avoid conflicts with browser's built-in FormData
export interface FormData {
  name: string;
  category: string;
  suggestions?: string;
  customCategory?: string;
}

export interface FormSubmission extends FormData {
  id?: string;
  entryNumber: number;
  createdAt: string; // dd-mm-yyyy format
}