'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface NavLink {
  href: string
  label: string
  section: string
}

/**
 * Main navigation component with sticky positioning and scroll detection
 * 
 * Features:
 * - Sticky header with glassmorphism effect when scrolled
 * - Active section highlighting
 * - Smooth scroll to anchor links
 * - Responsive design
 * 
 * @component
 */
export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const links: NavLink[] = [
    { href: '/#home', label: 'Home', section: 'home' },
    { href: '/#about', label: 'About', section: 'about' },
    { href: '/posts', label: 'Posts', section: 'posts' },
    { href: '/projects', label: 'Projects', section: 'projects' },
    { href: '/#contact', label: 'Contact', section: 'contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = ['home', 'about', 'contact']
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /**
   * Determine if a navigation link is active
   */
  const isActive = (link: NavLink): boolean => {
    if (pathname.startsWith('/posts')) return link.section === 'posts'
    if (pathname.startsWith('/projects')) return link.section === 'projects'
    return activeSection === link.section
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
      style={{
        position: 'sticky',
        top: 0,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold cursor-pointer">
            <span className="text-gradient">Portfolio</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer relative ${
                    isActive(link) ? '' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    background: isActive(link)
                      ? 'var(--color-accent-primary)'
                      : 'transparent',
                    color: isActive(link)
                      ? 'var(--color-bg-primary)'
                      : 'var(--color-text-primary)',
                    willChange: 'opacity, background',
                  }}
                  aria-current={isActive(link) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Spacer for balance */}
          <div className="w-10" aria-hidden="true" />
        </div>
      </div>
    </motion.nav>
  )
}
