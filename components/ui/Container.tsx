import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum width of the container */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  /** Whether to add vertical padding */
  noPadding?: boolean
}

/**
 * A responsive container component with consistent max-width and padding
 * 
 * @example
 * ```tsx
 * <Container maxWidth="xl">
 *   <h1>Page Content</h1>
 * </Container>
 * ```
 */
export function Container({
  children,
  maxWidth = 'xl',
  noPadding = false,
  className,
  ...props
}: ContainerProps) {
  const maxWidthStyles: Record<typeof maxWidth, string> = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  }

  const paddingStyles = noPadding ? '' : 'px-4 sm:px-6 lg:px-8'

  return (
    <div
      className={cn(
        'mx-auto w-full',
        maxWidthStyles[maxWidth],
        paddingStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
