'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Button variants for different use cases
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'glass'

/**
 * Button sizes
 */
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  /** Visual variant of the button */
  variant?: ButtonVariant
  /** Size of the button */
  size?: ButtonSize
  /** Whether the button should take full width */
  fullWidth?: boolean
  /** Whether the button is in loading state */
  isLoading?: boolean
  /** Icon to display before the text */
  leftIcon?: React.ReactNode
  /** Icon to display after the text */
  rightIcon?: React.ReactNode
}

/**
 * A highly reusable, accessible button component with multiple variants and animations
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-accent-primary text-bg-primary hover:bg-accent-secondary focus:ring-accent-primary shadow-lg hover:shadow-xl',
      secondary:
        'bg-bg-secondary text-text-primary border border-accent-primary/20 hover:border-accent-primary/40 focus:ring-accent-primary',
      ghost:
        'bg-transparent text-text-primary hover:bg-bg-secondary focus:ring-accent-primary',
      glass:
        'glass text-text-primary hover:bg-bg-secondary/50 focus:ring-accent-primary',
    }

    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-4 py-2 text-base gap-2',
      lg: 'px-6 py-3 text-lg gap-2.5',
    }

    const widthStyles = fullWidth ? 'w-full' : ''

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyles,
          className
        )}
        disabled={disabled || isLoading}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Loading...
          </span>
        ) : (
          <>
            {leftIcon && <span className="inline-flex">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
