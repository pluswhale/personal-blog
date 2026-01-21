/**
 * Shared type definitions for the application
 */

/**
 * Blog post type from Supabase
 */
export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  published_at: string
  created_at: string
  updated_at: string
  tags?: string[]
  featured_image?: string
}

/**
 * Project type from Supabase
 */
export interface Project {
  id: string
  title: string
  description: string
  long_description?: string
  image_url?: string
  demo_url?: string
  github_url?: string
  tags?: string[]
  featured: boolean
  created_at: string
  updated_at: string
}

/**
 * Contact form data structure
 */
export interface ContactFormData {
  name: string
  email: string
  message: string
}

/**
 * Form validation error structure
 */
export interface FormErrors<T> {
  [K in keyof T]?: string
}

/**
 * API response wrapper
 */
export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
}

/**
 * Social media link configuration
 */
export interface SocialLink {
  name: string
  url: string
  icon: React.ReactNode
  ariaLabel: string
}

/**
 * Navigation link structure
 */
export interface NavLink {
  label: string
  href: string
  external?: boolean
}

/**
 * Skill or technology item
 */
export interface Skill {
  name: string
  icon?: React.ReactNode
  proficiency?: number
  category?: string
}

/**
 * SEO metadata structure
 */
export interface SEOMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
}
