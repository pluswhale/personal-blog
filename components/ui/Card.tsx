'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

export type CardVariant = 'default' | 'glass' | 'bordered' | 'elevated'

export interface CardProps extends HTMLMotionProps<'div'> {
  /** Visual variant of the card */
  variant?: CardVariant
  /** Whether the card should be interactive with hover effects */
  interactive?: boolean
  /** Whether the card should have padding */
  noPadding?: boolean
}

/**
 * A versatile card component with multiple variants and optional hover effects
 * 
 * @example
 * ```tsx
 * <Card variant="glass" interactive>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </Card>
 * ```
 */
export function Card({
  children,
  variant = 'default',
  interactive = false,
  noPadding = false,
  className,
  ...props
}: CardProps) {
  const baseStyles = 'rounded-lg transition-all duration-300'

  const variantStyles: Record<CardVariant, string> = {
    default: 'bg-bg-secondary',
    glass: 'glass',
    bordered: 'bg-bg-secondary border-2 border-accent-primary/20',
    elevated: 'bg-bg-secondary shadow-lg hover:shadow-xl',
  }

  const interactiveStyles = interactive
    ? 'cursor-pointer hover:-translate-y-2'
    : ''

  const paddingStyles = noPadding ? '' : 'p-6'

  return (
    <motion.div
      className={cn(
        baseStyles,
        variantStyles[variant],
        interactiveStyles,
        paddingStyles,
        className
      )}
      whileHover={interactive ? { scale: 1.02 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * Card header component for consistent card titles
 */
export function CardHeader({
  children,
  className,
  ...props
}: HTMLMotionProps<'div'>) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
}

/**
 * Card title component
 */
export function CardTitle({
  children,
  className,
  ...props
}: HTMLMotionProps<'h3'>) {
  return (
    <h3
      className={cn('text-xl font-bold text-text-primary', className)}
      {...props}
    >
      {children}
    </h3>
  )
}

/**
 * Card description component
 */
export function CardDescription({
  children,
  className,
  ...props
}: HTMLMotionProps<'p'>) {
  return (
    <p
      className={cn('text-sm text-text-secondary', className)}
      {...props}
    >
      {children}
    </p>
  )
}

/**
 * Card content component
 */
export function CardContent({
  children,
  className,
  ...props
}: HTMLMotionProps<'div'>) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  )
}

/**
 * Card footer component
 */
export function CardFooter({
  children,
  className,
  ...props
}: HTMLMotionProps<'div'>) {
  return (
    <div className={cn('mt-4 pt-4 border-t border-accent-primary/10', className)} {...props}>
      {children}
    </div>
  )
}
