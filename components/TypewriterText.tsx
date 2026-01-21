'use client'

import { useEffect, useState } from 'react'

interface TypewriterTextProps {
  texts: string[]
  speed?: number
  delay?: number
}

export function TypewriterText({ texts, speed = 100, delay = 2000 }: TypewriterTextProps) {
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
    <span
      className="inline-block"
      style={{
        color: 'var(--color-accent-primary)',
        borderRight: '3px solid var(--color-accent-primary)',
        paddingRight: '5px',
        animation: 'blink 0.7s step-end infinite',
      }}
    >
      {currentText}
    </span>
  )
}
