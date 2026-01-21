'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Button, Input, Textarea } from '@/components/ui'
import { useFormValidation } from '@/lib/hooks'
import { validateEmail, validateName, validateMessage } from '@/lib/validations'
import { ContactFormData } from '@/types'
import { delay } from '@/lib/utils'

/**
 * Contact form component with validation and animations
 * 
 * Features:
 * - Form validation with real-time error messages
 * - Loading state with animated spinner
 * - Smooth animations on form submission
 * - Accessible form inputs
 * 
 * @component
 */
export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  })

  const { errors, validate, clearError } = useFormValidation<ContactFormData>({
    name: validateName,
    email: validateEmail,
    message: validateMessage,
  })

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validate(formData)) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await delay(2000)

      // TODO: Replace with actual API call
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })

      console.log('Form submitted:', formData)

      // Reset form
      setFormData({ name: '', email: '', message: '' })
      setIsSuccess(true)

      // Hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      // TODO: Add proper error handling
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handle input change
   */
  const handleChange = (
    field: keyof ContactFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      clearError(field)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto relative"
    >
      {/* Decorative background elements */}
      <div
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'var(--color-accent-primary)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'var(--color-accent-secondary)' }}
        aria-hidden="true"
      />

      <form onSubmit={handleSubmit} className="glass p-8 md:p-10 rounded-3xl relative z-10 space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Input
            label="Name"
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
            placeholder="John Doe"
            className="cursor-pointer"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Input
            label="Email"
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
            placeholder="john@example.com"
            className="cursor-pointer"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Textarea
            label="Message"
            id="message"
            required
            rows={6}
            resize={false}
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            error={errors.message}
            placeholder="Tell me about your project..."
            className="cursor-pointer"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            rightIcon={
              !isLoading && (
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              )
            }
            className="shadow-xl"
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </Button>
        </motion.div>

        {/* Success message */}
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-4 rounded-lg glass-border text-center"
          >
            <p className="text-accent-primary font-semibold">
              ✨ Thank you! Your message has been sent successfully.
            </p>
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}
