// src/components/Contact.jsx
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Github, Linkedin, Instagram, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

const SOCIALS = [
  { icon: Github, href: 'https://github.com/Shane-HCode', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/shane-henricus-496034297/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/_shanehenri/', label: 'Instagram' },
]

// Use relative path for API - works locally and in production
const API_URL = '/api'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState({
    sent: false,
    loading: false,
    error: '',
    fieldErrors: {}
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (status.fieldErrors[name]) {
      setStatus(prev => ({
        ...prev,
        fieldErrors: { ...prev.fieldErrors, [name]: '' }
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(prev => ({ ...prev, loading: true, error: '', fieldErrors: {} }))

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.errors) {
          setStatus(prev => ({ ...prev, fieldErrors: data.errors }))
        }
        throw new Error(data.message || 'Failed to send message')
      }

      setStatus(prev => ({ ...prev, sent: true, loading: false }))
      setFormData({ name: '', email: '', message: '' })

    } catch (error) {
      setStatus(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to send message. Please try again.'
      }))
    }
  }

  return (
    <section id="contact" className="relative px-6 py-32 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="relative p-8 overflow-hidden glass-strong rounded-3xl md:p-14"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-cyan/10 blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-indigo/10 blur-[100px]" />

          <div className="relative mb-10 text-center">
            <span className="text-base md:text-xl lg:text-base section-eyebrow">Get in touch</span>
            <h2 className="mt-4 text-4xl font-semibold text-white lg:text-4xl font-display">
              Let's build something
              <span className="text-gradient"> unforgettable</span>.
            </h2>
            <p className="max-w-lg mx-auto mt-8 text-xl md:text-2xl lg:text-lg text-white/55 font-body">
              Have a project in mind, or just want to talk design and code? My inbox
              is always open.
            </p>
          </div>

          {!status.sent ? (
            <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`w-full px-4 py-3 text-lg text-white transition-colors border outline-none md:text-xl lg:text-base bg-white/5 rounded-xl placeholder-white/30 font-body focus:border-cyan/50 ${
                      status.fieldErrors.name ? 'border-red-500' : 'border-white/10'
                    }`}
                  />
                  {status.fieldErrors.name && (
                    <p className="mt-1 text-sm text-red-400">{status.fieldErrors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className={`w-full px-4 py-3 text-lg text-white transition-colors border outline-none md:text-xl lg:text-base bg-white/5 rounded-xl placeholder-white/30 font-body focus:border-cyan/50 ${
                      status.fieldErrors.email ? 'border-red-500' : 'border-white/10'
                    }`}
                  />
                  {status.fieldErrors.email && (
                    <p className="mt-1 text-sm text-red-400">{status.fieldErrors.email}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project"
                  className={`w-full px-4 py-3 text-lg text-white transition-colors border outline-none resize-none md:text-xl lg:text-base bg-white/5 rounded-xl placeholder-white/30 font-body focus:border-cyan/50 ${
                    status.fieldErrors.message ? 'border-red-500' : 'border-white/10'
                  }`}
                />
                {status.fieldErrors.message && (
                  <p className="mt-1 text-sm text-red-400">{status.fieldErrors.message}</p>
                )}
              </div>
              {status.error && (
                <div className="flex items-center gap-2 p-3 mt-4 border bg-red-500/10 border-red-500/20 rounded-xl">
                  <AlertCircle size={16} className="flex-shrink-0 text-red-400" />
                  <p className="text-sm text-red-400">{status.error}</p>
                </div>
              )}
              <button 
                type="submit" 
                disabled={status.loading}
                className="flex items-center justify-center w-full mt-4 btn-glow md:text-lg lg:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status.loading ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send message
                  </>
                )}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center font-body"
            >
              <div className="flex justify-center mb-4">
                <CheckCircle size={48} className="text-green-400" />
              </div>
              <h3 className="mb-2 text-2xl font-semibold text-white">Message Sent! 🎉</h3>
              <p className="text-white/60">
                Thank you for reaching out! I'll get back to you as soon as possible.
              </p>
              <p className="mt-2 text-sm text-white/40">
                A confirmation email has been sent to your inbox.
              </p>
            </motion.div>
          )}

          <div className="relative flex flex-col items-center justify-center gap-5 pt-8 mt-10 border-t sm:flex-row border-white/10">
            <a
              href="mailto:shanem.henricus@gmail.com"
              className="flex items-center gap-2 transition-colors md:text-xl lg:text-base text-white/60 hover:text-cyan-soft font-body"
            >
              <Mail size={18} /> shanem.henricus@gmail.com
            </a>
            <span className="hidden w-px h-4 sm:block bg-white/15" />
            <div className="flex items-center gap-5">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-colors rounded-full w-9 h-9 md:w-12 md:h-12 lg:w-9 lg:h-9 glass text-white/60 hover:text-cyan-soft hover:border-cyan/40"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}