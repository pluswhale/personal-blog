'use client'

import { motion } from 'framer-motion'
import { Card, Button } from '@/components/ui'
import { formatDate } from '@/lib/utils'
import type { Project } from '@/types'

export interface ProjectCardProps {
  /** Project data to display */
  project: Project
  /** Index for stagger animation */
  index?: number
}

/**
 * Project card component with hover effects and action buttons
 * 
 * Features:
 * - Glass morphism design with hover effects
 * - Animated action buttons (GitHub, Live Demo)
 * - Tech stack tags
 * - Responsive layout
 * 
 * @component
 * @example
 * ```tsx
 * <ProjectCard project={projectData} index={0} />
 * ```
 */
export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const handleViewCode = () => {
    if (project.github_url) {
      window.open(project.github_url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleViewDemo = () => {
    if (project.demo_url) {
      window.open(project.demo_url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card
        variant="glass"
        interactive
        className="group relative h-full flex flex-col"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
        }}
      >
        {/* Hover overlay with action buttons */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 z-10 p-8"
          style={{
            background:
              'linear-gradient(135deg, rgba(100, 255, 218, 0.15) 0%, rgba(87, 203, 255, 0.15) 100%)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {project.github_url && (
            <Button
              variant="glass"
              size="md"
              onClick={handleViewCode}
              leftIcon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              }
              className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100"
              style={{
                background: 'var(--color-bg-primary)',
                color: 'var(--color-accent-primary)',
                willChange: 'transform',
              }}
            >
              View Code
            </Button>
          )}

          {project.demo_url && (
            <Button
              variant="primary"
              size="md"
              onClick={handleViewDemo}
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              }
              className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200"
              style={{ willChange: 'transform' }}
            >
              Live Demo
            </Button>
          )}
        </motion.div>

        {/* Content */}
        <div className="relative z-0 flex flex-col h-full">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            {project.title}
          </h2>

          <p className="text-text-secondary mb-6 leading-relaxed flex-grow">
            {project.description}
          </p>

          {project.tags && project.tags.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-accent-secondary mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs px-3 py-1 rounded-full font-mono"
                    style={{
                      background: 'rgba(100, 255, 218, 0.1)',
                      color: 'var(--color-accent-primary)',
                      border: '1px solid var(--color-accent-primary)',
                    }}
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          <time className="text-sm font-medium text-text-secondary">
            {formatDate(project.created_at)}
          </time>
        </div>
      </Card>
    </motion.div>
  )
}
