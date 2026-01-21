'use client'

import { forwardRef, InputHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label text for the input */
  label?: string
  /** Error message to display */
  error?: string
  /** Helper text to display below the input */
  helperText?: string
  /** Icon to display on the left side of the input */
  leftIcon?: React.ReactNode
  /** Icon to display on the right side of the input */
  rightIcon?: React.ReactNode
}

/**
 * A styled input component with label, error, and helper text support
 * 
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   error={errors.email}
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-primary mb-2"
          >
            {label}
            {props.required && (
              <span className="text-accent-primary ml-1">*</span>
            )}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
              {leftIcon}
            </div>
          )}

          <motion.input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full px-4 py-3 bg-bg-secondary text-text-primary rounded-lg border-2 border-transparent',
              'focus:border-accent-primary focus:outline-none transition-all duration-300',
              'placeholder:text-text-secondary/50',
              'hover:border-accent-primary/30',
              error && 'border-red-500 focus:border-red-500',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            whileFocus={{ scale: 1.01 }}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <motion.p
            id={`${inputId}-error`}
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
            id={`${inputId}-helper`}
            className="mt-2 text-sm text-text-secondary"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
