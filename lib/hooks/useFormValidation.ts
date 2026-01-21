'use client'

import { useState } from 'react'
import { FormErrors } from '@/types'

/**
 * Generic form validation hook
 * 
 * @template T - The type of form data
 * @param validationRules - Object containing validation functions for each field
 * @returns Form validation state and methods
 * 
 * @example
 * ```tsx
 * const { errors, validate, clearError } = useFormValidation<ContactFormData>({
 *   name: (value) => value.length < 2 ? 'Name must be at least 2 characters' : undefined,
 *   email: (value) => !value.includes('@') ? 'Invalid email' : undefined,
 * })
 * ```
 */
export function useFormValidation<T extends Record<string, any>>(
  validationRules: Partial<Record<keyof T, (value: any) => string | undefined>>
) {
  const [errors, setErrors] = useState<FormErrors<T>>({})

  /**
   * Validate a single field
   */
  const validateField = (name: keyof T, value: any): string | undefined => {
    const rule = validationRules[name]
    if (!rule) return undefined
    return rule(value)
  }

  /**
   * Validate entire form
   */
  const validate = (data: T): boolean => {
    const newErrors: FormErrors<T> = {}
    let isValid = true

    Object.keys(validationRules).forEach((key) => {
      const fieldName = key as keyof T
      const error = validateField(fieldName, data[fieldName])
      if (error) {
        newErrors[fieldName] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  /**
   * Clear error for a specific field
   */
  const clearError = (name: keyof T) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[name]
      return newErrors
    })
  }

  /**
   * Clear all errors
   */
  const clearAllErrors = () => {
    setErrors({})
  }

  /**
   * Set error manually
   */
  const setError = (name: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  return {
    errors,
    validate,
    validateField,
    clearError,
    clearAllErrors,
    setError,
  }
}
