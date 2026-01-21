'use client'

import { useEffect, useRef } from 'react'

/**
 * Particle class for individual particle instances
 */
class Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  canvas: HTMLCanvasElement

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 2 + 1
    this.speedX = (Math.random() - 0.5) * 0.5
    this.speedY = (Math.random() - 0.5) * 0.5
    this.opacity = Math.random() * 0.5 + 0.2
  }

  /**
   * Update particle position
   */
  update() {
    this.x += this.speedX
    this.y += this.speedY

    // Wrap around screen edges
    if (this.x > this.canvas.width) this.x = 0
    if (this.x < 0) this.x = this.canvas.width
    if (this.y > this.canvas.height) this.y = 0
    if (this.y < 0) this.y = this.canvas.height
  }

  /**
   * Draw particle on canvas
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgba(100, 255, 218, ${this.opacity})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

/**
 * Particles component that renders an animated particle background
 * 
 * Creates a canvas with floating particles that move slowly across the screen.
 * Particles wrap around the edges for continuous animation.
 * 
 * Features:
 * - Responsive canvas that adapts to window size
 * - Smooth particle animation with RAF
 * - Configurable particle count and behavior
 * 
 * @component
 * @example
 * ```tsx
 * <div className="relative">
 *   <Particles />
 *   <h1>Content overlays particles</h1>
 * </div>
 * ```
 */
export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    /**
     * Resize canvas to match window dimensions
     */
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = 50

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle(canvas))
    }

    /**
     * Animation loop
     */
    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesArray.forEach((particle) => {
        particle.update()
        particle.draw(ctx)
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.4 }}
      aria-hidden="true"
    />
  )
}
