'use client'

import { useEffect, useRef, useState } from 'react'

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /** Whether to freeze the state once intersected */
  freezeOnceVisible?: boolean
}

/**
 * Custom hook to observe element intersection with viewport
 * 
 * @param options - IntersectionObserver options
 * @returns ref and intersection state
 * 
 * @example
 * ```tsx
 * const { ref, isIntersecting } = useIntersectionObserver({
 *   threshold: 0.5,
 *   freezeOnceVisible: true,
 * })
 * 
 * return <div ref={ref}>{isIntersecting && 'Visible!'}</div>
 * ```
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const { threshold = 0, root = null, rootMargin = '0px', freezeOnceVisible = false } = options

  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef<T>(null)

  const frozen = entry?.isIntersecting && freezeOnceVisible

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // If already frozen, don't create new observer
    if (frozen) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry)
      if (entry.isIntersecting) {
        setHasIntersected(true)
      }
    }, observerParams)

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, root, rootMargin, frozen])

  return {
    ref: elementRef,
    entry,
    isIntersecting: frozen || !!entry?.isIntersecting,
    hasIntersected,
  }
}
