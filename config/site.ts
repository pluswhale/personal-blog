import { NavLink, SocialLink } from '@/types'

/**
 * Site-wide configuration
 * 
 * Centralized configuration for site metadata, navigation, and social links
 */
export const siteConfig = {
  name: 'Egor Dultsev',
  description: 'Full-stack Developer & UI/UX Designer',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.jpg',
  
  author: {
    name: 'Egor Dultsev',
    email: 'hello@example.com',
    twitter: '@yourusername',
  },

  links: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    telegram: 'https://t.me/yourusername',
  },
} as const

/**
 * Navigation links configuration
 */
export const navLinks: NavLink[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Posts',
    href: '/posts',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'Contact',
    href: '/#contact',
  },
]

/**
 * Social media links configuration
 * Icons should be passed as React components when used
 */
export const socialLinks = [
  {
    name: 'GitHub',
    url: siteConfig.links.github,
    ariaLabel: 'Visit my GitHub profile',
  },
  {
    name: 'LinkedIn',
    url: siteConfig.links.linkedin,
    ariaLabel: 'Connect with me on LinkedIn',
  },
  {
    name: 'Telegram',
    url: siteConfig.links.telegram,
    ariaLabel: 'Contact me on Telegram',
  },
]

/**
 * Skills and technologies
 */
export const skills = [
  {
    name: 'TypeScript',
    category: 'Languages',
  },
  {
    name: 'React',
    category: 'Frontend',
  },
  {
    name: 'Next.js',
    category: 'Frontend',
  },
  {
    name: 'Node.js',
    category: 'Backend',
  },
  {
    name: 'Supabase',
    category: 'Backend',
  },
  {
    name: 'Tailwind CSS',
    category: 'Styling',
  },
  {
    name: 'Framer Motion',
    category: 'Animation',
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
  },
]

/**
 * Animation configuration for consistent motion across the site
 */
export const animationConfig = {
  defaultTransition: {
    duration: 0.3,
    ease: 'easeInOut',
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
} as const
