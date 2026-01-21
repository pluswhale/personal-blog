'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui'
import { socialLinks } from '@/config/site'

/**
 * Footer component with social links and site information
 * 
 * Features:
 * - Responsive three-column layout
 * - Animated social media icons
 * - Quick navigation links
 * - Brand information
 * 
 * @component
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Posts', href: '/posts' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/#contact' },
  ]

  const techStack = ['React', 'Next.js', 'TypeScript']

  return (
    <footer className="relative mt-auto py-16 glass overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 50%, var(--color-accent-primary) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      <Container>
        <div className="grid md:grid-cols-3 gap-12 mb-12 relative z-10">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <h3 className="text-3xl font-bold mb-3">
              <span className="text-gradient">Your Name</span>
            </h3>
            <p
              className="text-sm leading-relaxed mb-4 text-text-secondary"
            >
              Building elegant digital experiences with modern technologies and
              thoughtful design.
            </p>
            <div className="flex gap-2 justify-center md:justify-start">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full glass text-accent-primary"
                  style={{
                    borderColor: 'var(--color-accent-primary)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <h4
              className="text-sm font-semibold mb-4 uppercase tracking-wider text-accent-primary"
            >
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary transition-all duration-300 hover:translate-x-1 hover:text-accent-primary inline-block"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <h4
              className="text-sm font-semibold mb-4 uppercase tracking-wider text-accent-primary"
            >
              Connect
            </h4>
            <div className="flex gap-4 justify-center md:justify-end">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center cursor-pointer text-accent-primary"
                  style={{
                    borderColor: 'var(--color-accent-primary)',
                  }}
                  aria-label={social.ariaLabel}
                >
                  <SocialIcon name={social.name} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 text-center"
          style={{
            borderTop: '1px solid var(--glass-border)',
          }}
        >
          <p className="text-sm text-text-secondary">
            © {currentYear} All rights reserved. Built with{' '}
            <span className="text-accent-primary">❤️</span> and{' '}
            <span className="font-semibold text-accent-primary">Next.js</span>
          </p>
        </motion.div>
      </Container>
    </footer>
  )
}

/**
 * Social media icon component
 * Returns the appropriate SVG icon for each platform
 */
function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    GitHub: (
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    ),
    LinkedIn: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
    Telegram: (
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    ),
  }

  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      {icons[name] || null}
    </svg>
  )
}
