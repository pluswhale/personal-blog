import type { Metadata } from 'next'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ContactForm } from '@/components/ContactForm'
import { TypewriterText } from '@/components/TypewriterText'
import { Particles } from '@/components/Particles'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to my personal brand - elegant portfolio and blog',
}

export default function Home() {
  return (
    <>
      {/* Hero Section with Particles */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Particles Background */}
        <Particles />
        
        {/* Subtle Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(100, 255, 218, 0.05) 0%, transparent 50%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <ScrollReveal>
            <h1
              className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6"
              style={{ 
                fontWeight: 700, 
                letterSpacing: '-0.02em',
                color: 'var(--color-text-primary)',
              }}
            >
              Hi, I'm Your Name
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p
              className="text-2xl sm:text-3xl lg:text-4xl mb-12 h-16 flex items-center justify-center"
            >
              I'm a{' '}
              <TypewriterText
                texts={[
                  'Full-stack Developer',
                  'UI/UX Designer',
                  'Problem Solver',
                  'Creative Thinker',
                ]}
                speed={100}
                delay={2000}
              />
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#about"
                className="px-8 py-4 rounded-full font-semibold transition-all duration-300 cursor-pointer btn-accent"
              >
                Learn More
              </a>
              <a
                href="#contact"
                className="px-8 py-4 rounded-full font-semibold transition-all duration-300 cursor-pointer btn-glass"
              >
                Get in Touch
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6"
            style={{ color: 'var(--color-accent-primary)', opacity: 0.6 }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2
              className="text-5xl font-bold mb-16 text-center"
              style={{ color: 'var(--color-text-primary)' }}
            >
              About Me
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal delay={200}>
              <div className="glass p-12 rounded-3xl">
                <p
                  className="text-lg leading-relaxed mb-6"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  I'm a passionate software developer with expertise in modern web technologies.
                  I love building elegant solutions to complex problems and sharing my knowledge
                  through writing.
                </p>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  When I'm not coding, you can find me exploring new technologies,
                  contributing to open-source projects, or writing about my experiences.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="space-y-6">
                <div
                  className="p-6 rounded-2xl transition-all duration-300 hover:translate-x-2 cursor-pointer glass"
                  style={{
                    borderLeft: '4px solid var(--color-accent-primary)',
                    willChange: 'transform',
                  }}
                >
                  <h3 
                    className="text-xl font-semibold mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    💻 Development
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    TypeScript, React, Next.js, Node.js
                  </p>
                </div>
                <div
                  className="p-6 rounded-2xl transition-all duration-300 hover:translate-x-2 cursor-pointer glass"
                  style={{
                    borderLeft: '4px solid var(--color-accent-secondary)',
                    willChange: 'transform',
                  }}
                >
                  <h3 
                    className="text-xl font-semibold mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    🎨 Design
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    UI/UX, Figma, Creative Direction
                  </p>
                </div>
                <div
                  className="p-6 rounded-2xl transition-all duration-300 hover:translate-x-2 cursor-pointer glass"
                  style={{
                    borderLeft: '4px solid var(--color-accent-primary)',
                    willChange: 'transform',
                  }}
                >
                  <h3 
                    className="text-xl font-semibold mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    ✍️ Writing
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Technical blogs, Documentation, Tutorials
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2
              className="text-5xl font-bold mb-16 text-center"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Get in Touch
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <ContactForm />
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="mt-16 flex justify-center gap-6">
              {[
                { icon: 'github', href: 'https://github.com/yourusername', label: 'GitHub' },
                { icon: 'linkedin', href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
                { icon: 'telegram', href: 'https://t.me/yourusername', label: 'Telegram' },
              ].map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer group glass"
                  style={{
                    border: '2px solid var(--color-accent-primary)',
                    willChange: 'transform',
                  }}
                  aria-label={social.label}
                >
                  <span 
                    className="text-2xl group-hover:animate-bounce"
                    style={{ color: 'var(--color-accent-primary)' }}
                  >
                    {social.icon === 'github' ? '⚡' :
                     social.icon === 'linkedin' ? '💼' : '📱'}
                  </span>
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
