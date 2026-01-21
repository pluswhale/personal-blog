'use client'

import { useState, FormEvent } from 'react'

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log('Form submitted:', formData)
    setIsLoading(false)
    setFormData({ name: '', email: '', message: '' })
    alert('Thank you! Your message has been sent.')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto glass p-8 rounded-3xl">
      <div className="form-group">
        <label 
          htmlFor="name" 
          className="block text-sm font-medium mb-2"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none cursor-pointer"
          style={{
            background: 'var(--color-bg-secondary)',
            borderColor: 'transparent',
            borderBottomColor: 'var(--color-accent-secondary)',
            borderBottomWidth: '2px',
            color: 'var(--color-text-primary)',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(100, 255, 218, 0.4)'
            e.target.style.boxShadow = '0 0 10px rgba(100, 255, 218, 0.1)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'transparent'
            e.target.style.borderBottomColor = 'var(--color-accent-secondary)'
            e.target.style.boxShadow = 'none'
          }}
        />
      </div>

      <div className="form-group">
        <label 
          htmlFor="email" 
          className="block text-sm font-medium mb-2"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none cursor-pointer"
          style={{
            background: 'var(--color-bg-secondary)',
            borderColor: 'transparent',
            borderBottomColor: 'var(--color-accent-secondary)',
            borderBottomWidth: '2px',
            color: 'var(--color-text-primary)',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(100, 255, 218, 0.4)'
            e.target.style.boxShadow = '0 0 10px rgba(100, 255, 218, 0.1)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'transparent'
            e.target.style.borderBottomColor = 'var(--color-accent-secondary)'
            e.target.style.boxShadow = 'none'
          }}
        />
      </div>

      <div className="form-group">
        <label 
          htmlFor="message" 
          className="block text-sm font-medium mb-2"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Message
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none resize-none cursor-pointer"
          style={{
            background: 'var(--color-bg-secondary)',
            borderColor: 'transparent',
            borderBottomColor: 'var(--color-accent-secondary)',
            borderBottomWidth: '2px',
            color: 'var(--color-text-primary)',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(100, 255, 218, 0.4)'
            e.target.style.boxShadow = '0 0 10px rgba(100, 255, 218, 0.1)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'transparent'
            e.target.style.borderBottomColor = 'var(--color-accent-secondary)'
            e.target.style.boxShadow = 'none'
          }}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 rounded-full font-semibold text-lg transition-all duration-300 relative overflow-hidden cursor-pointer btn-accent"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: 'var(--color-bg-primary)' }}
            />
            <span 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: 'var(--color-bg-primary)', animationDelay: '0.2s' }}
            />
            <span 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: 'var(--color-bg-primary)', animationDelay: '0.4s' }}
            />
          </span>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}
