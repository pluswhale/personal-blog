/**
 * Form validation utilities
 * 
 * Reusable validation functions for form fields
 */

/**
 * Validate email format
 */
export function validateEmail(email: string): string | undefined {
  if (!email) {
    return 'Email is required'
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address'
  }
  
  return undefined
}

/**
 * Validate name (minimum length)
 */
export function validateName(name: string): string | undefined {
  if (!name || name.trim().length === 0) {
    return 'Name is required'
  }
  
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters long'
  }
  
  return undefined
}

/**
 * Validate message (minimum length)
 */
export function validateMessage(message: string): string | undefined {
  if (!message || message.trim().length === 0) {
    return 'Message is required'
  }
  
  if (message.trim().length < 10) {
    return 'Message must be at least 10 characters long'
  }
  
  return undefined
}

/**
 * Validate required field
 */
export function validateRequired(value: string, fieldName = 'This field'): string | undefined {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`
  }
  return undefined
}

/**
 * Validate minimum length
 */
export function validateMinLength(
  value: string,
  minLength: number,
  fieldName = 'This field'
): string | undefined {
  if (value.trim().length < minLength) {
    return `${fieldName} must be at least ${minLength} characters long`
  }
  return undefined
}

/**
 * Validate maximum length
 */
export function validateMaxLength(
  value: string,
  maxLength: number,
  fieldName = 'This field'
): string | undefined {
  if (value.trim().length > maxLength) {
    return `${fieldName} must be no more than ${maxLength} characters long`
  }
  return undefined
}
