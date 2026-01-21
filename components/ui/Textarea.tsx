'use client'

import { forwardRef, TextareaHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text for the textarea */
  label?: string
  /** Error message to display */
  error?: string
  /** Helper text to display below the textarea */
  helperText?: string
  /** Whether to allow resize */
  resize?: boolean
}

/**
 * A styled textarea component with label, error, and helper text support
 * 
 * @example
 * ```tsx
 * <Textarea
 *   label="Message"
 *   placeholder="Enter your message"
 *   rows={5}
 *   error={errors.message}
 * />
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      className,
      id,
      resize = true,
      ...props
    },
    ref
  ) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-semibold mb-3 uppercase tracking-wider"
            style={{ color: 'var(--color-accent-primary)' }}
          >
            {label}
            {props.required && (
              <span className="ml-1">*</span>
            )}
          </label>
        )}

        <motion.textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none',
            'placeholder:text-text-secondary/50',
            !resize && 'resize-none',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          style={{
            background: 'rgba(17, 34, 64, 0.5)',
            borderColor: error ? 'rgb(239, 68, 68)' : 'rgba(100, 255, 218, 0.1)',
            color: 'var(--color-text-primary)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'rgba(100, 255, 218, 0.4)'
            e.currentTarget.style.boxShadow = '0 0 15px rgba(100, 255, 218, 0.1)'
            e.currentTarget.style.background = 'rgba(17, 34, 64, 0.7)'
          }}
          onBlur={(e) => {
            if (!error) {
              e.currentTarget.style.borderColor = 'rgba(100, 255, 218, 0.1)'
            }
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.background = 'rgba(17, 34, 64, 0.5)'
          }}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helperText
              ? `${textareaId}-helper`
              : undefined
          }
          {...props}
        />

        {error && (
          <motion.p
            id={`${textareaId}-error`}
            className="mt-2 text-sm text-red-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
          >
            {error}
          </motion.p>
        )}

        {!error && helperText && (
          <p
            id={`${textareaId}-helper`}
            className="mt-2 text-sm text-text-secondary"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
