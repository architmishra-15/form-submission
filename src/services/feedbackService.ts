import { FormData as CustomFormData } from '../types';

export const submitFeedback = async (data: CustomFormData): Promise<void> => {
  const response = await fetch('/api/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to submit feedback')
  }
}