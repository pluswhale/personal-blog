import { supabase } from '@/lib/supabase'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ProjectCard } from '@/components/ProjectCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A collection of projects I have worked on',
}

export const revalidate = 60 // Revalidate every 60 seconds

async function getProjects() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return projects || []
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h1
              className="text-6xl font-bold mb-6"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Projects
            </h1>
            <p className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>
              Things I've built and contributed to
            </p>
          </div>
        </ScrollReveal>

        {projects.length === 0 ? (
          <ScrollReveal>
            <div className="text-center py-20">
              <p className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>
                No projects yet. Check back soon!
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 100}>
                <ProjectCard project={project} index={index} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
