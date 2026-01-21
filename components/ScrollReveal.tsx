'use client'

import { useEffect, useRef, ReactNode } from 'react'

export interface ScrollRevealProps {
  /** Content to be revealed on scroll */
  children: ReactNode
  /** Delay in milliseconds before revealing the element */
  delay?: number
  /** Additional CSS classes */
  className?: string
}

/**
 * ScrollReveal component that animates elements when they enter the viewport
 * 
 * Uses Intersection Observer API to detect when elements are visible
 * and applies reveal animations with optional delays.
 * 
 * @component
 * @example
 * ```tsx
 * <ScrollReveal delay={200}>
 *   <h1>This will fade in when scrolled into view</h1>
 * </ScrollReveal>
 * ```
 */
export function ScrollReveal({
  children,
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('active')
            }, delay)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    )

    const element = elementRef.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [delay])

  return (
    <div ref={elementRef} className={`reveal ${className}`}>
      {children}
    </div>
  )
}
