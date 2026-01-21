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
            className="block text-sm font-medium text-text-primary mb-2"
          >
            {label}
            {props.required && (
              <span className="text-accent-primary ml-1">*</span>
            )}
          </label>
        )}

        <motion.textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full px-4 py-3 bg-bg-secondary text-text-primary rounded-lg border-2 border-transparent',
            'focus:border-accent-primary focus:outline-none transition-all duration-300',
            'placeholder:text-text-secondary/50',
            'hover:border-accent-primary/30',
            !resize && 'resize-none',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helperText
              ? `${textareaId}-helper`
              : undefined
          }
          whileFocus={{ scale: 1.01 }}
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
