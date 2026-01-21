'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'

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
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl mx-auto relative"
    >
      {/* Decorative elements */}
      <div
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-10 blur-3xl"
        style={{ background: 'var(--color-accent-primary)' }}
      />
      <div
        className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-10 blur-3xl"
        style={{ background: 'var(--color-accent-secondary)' }}
      />

      <div className="glass p-10 rounded-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="form-group"
        >
          <label
            htmlFor="name"
            className="block text-sm font-semibold mb-3 uppercase tracking-wider"
            style={{ color: 'var(--color-accent-primary)' }}
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none cursor-pointer"
            placeholder="John Doe"
            style={{
              background: 'rgba(17, 34, 64, 0.5)',
              borderColor: 'rgba(100, 255, 218, 0.1)',
              color: 'var(--color-text-primary)',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(100, 255, 218, 0.4)'
              e.target.style.boxShadow = '0 0 15px rgba(100, 255, 218, 0.1)'
              e.target.style.background = 'rgba(17, 34, 64, 0.7)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(100, 255, 218, 0.1)'
              e.target.style.boxShadow = 'none'
              e.target.style.background = 'rgba(17, 34, 64, 0.5)'
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="form-group"
        >
          <label
            htmlFor="email"
            className="block text-sm font-semibold mb-3 uppercase tracking-wider"
            style={{ color: 'var(--color-accent-primary)' }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none cursor-pointer"
            placeholder="john@example.com"
            style={{
              background: 'rgba(17, 34, 64, 0.5)',
              borderColor: 'rgba(100, 255, 218, 0.1)',
              color: 'var(--color-text-primary)',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(100, 255, 218, 0.4)'
              e.target.style.boxShadow = '0 0 15px rgba(100, 255, 218, 0.1)'
              e.target.style.background = 'rgba(17, 34, 64, 0.7)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(100, 255, 218, 0.1)'
              e.target.style.boxShadow = 'none'
              e.target.style.background = 'rgba(17, 34, 64, 0.5)'
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="form-group"
        >
          <label
            htmlFor="message"
            className="block text-sm font-semibold mb-3 uppercase tracking-wider"
            style={{ color: 'var(--color-accent-primary)' }}
          >
            Message
          </label>
          <textarea
            id="message"
            required
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none resize-none cursor-pointer"
            placeholder="Tell me about your project..."
            style={{
              background: 'rgba(17, 34, 64, 0.5)',
              borderColor: 'rgba(100, 255, 218, 0.1)',
              color: 'var(--color-text-primary)',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(100, 255, 218, 0.4)'
              e.target.style.boxShadow = '0 0 15px rgba(100, 255, 218, 0.1)'
              e.target.style.background = 'rgba(17, 34, 64, 0.7)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(100, 255, 218, 0.1)'
              e.target.style.boxShadow = 'none'
              e.target.style.background = 'rgba(17, 34, 64, 0.5)'
            }}
          />
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full py-5 rounded-full font-bold text-lg transition-all duration-300 relative overflow-hidden cursor-pointer"
          style={{
            background: isLoading
              ? 'rgba(100, 255, 218, 0.5)'
              : 'var(--color-accent-primary)',
            color: 'var(--color-bg-primary)',
            boxShadow: '0 10px 30px rgba(100, 255, 218, 0.3)',
          }}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 rounded-full"
                style={{ background: 'var(--color-bg-primary)' }}
              />
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                className="w-2 h-2 rounded-full"
                style={{ background: 'var(--color-bg-primary)' }}
              />
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                className="w-2 h-2 rounded-full"
                style={{ background: 'var(--color-bg-primary)' }}
              />
            </span>
          ) : (
            <>
              Send Message
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </>
          )}
        </motion.button>
      </div>
    </motion.form>
  )
}
