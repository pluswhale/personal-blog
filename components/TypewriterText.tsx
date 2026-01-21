'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export interface TypewriterTextProps {
  /** Array of texts to cycle through */
  texts: string[]
  /** Typing speed in milliseconds per character */
  speed?: number
  /** Delay in milliseconds before starting to delete text */
  delay?: number
}

/**
 * TypewriterText component that animates text with a typewriter effect
 * 
 * Automatically cycles through an array of texts, typing and deleting each one.
 * Features a blinking cursor animation.
 * 
 * @component
 * @example
 * ```tsx
 * <TypewriterText
 *   texts={['Developer', 'Designer', 'Creator']}
 *   speed={100}
 *   delay={2000}
 * />
 * ```
 */
export function TypewriterText({
  texts,
  speed = 100,
  delay = 2000,
}: TypewriterTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fullText = texts[currentTextIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < fullText.length) {
            setCurrentText(fullText.substring(0, currentText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), delay)
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(fullText.substring(0, currentText.length - 1))
          } else {
            setIsDeleting(false)
            setCurrentTextIndex((current) => (current + 1) % texts.length)
          }
        }
      },
      isDeleting ? speed / 2 : speed
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex, texts, speed, delay])

  return (
    <span className="inline-flex items-center ml-2">
      <span 
        className="font-semibold"
        style={{ color: 'var(--color-accent-primary)' }}
      >
        {currentText}
      </span>
      <motion.span
        className="inline-block w-0.5 h-8 ml-1"
        style={{ background: 'var(--color-accent-primary)' }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        aria-hidden="true"
      />
    </span>
  )
}
