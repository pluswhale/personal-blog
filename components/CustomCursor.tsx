'use client'

import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', updateCursorPosition)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor - More Subtle */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-screen transition-transform duration-150"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`,
          willChange: 'transform',
        }}
      >
        <div
          className="rounded-full transition-all duration-300"
          style={{
            width: isHovering ? '35px' : '20px',
            height: isHovering ? '35px' : '20px',
            background: 'var(--color-accent-primary)',
            opacity: isHovering ? 0.25 : 0.15,
          }}
        />
      </div>
      
      {/* Trailing dot - Softer */}
      <div
        className="fixed pointer-events-none z-[9998] transition-all duration-300 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      >
        <div
          className="rounded-full"
          style={{
            width: '6px',
            height: '6px',
            background: 'var(--color-accent-primary)',
            opacity: 0.4,
          }}
        />
      </div>
    </>
  )
}
