import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Github, Linkedin, Dribbble, Send } from 'lucide-react'

const SOCIALS = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Dribbble, href: '#', label: 'Dribbble' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="relative py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="glass-strong rounded-3xl p-8 md:p-14 relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-cyan/10 blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-indigo/10 blur-[100px]" />

          <div className="relative text-center mb-10">
            <span className="section-eyebrow">Get in touch</span>
            <h2 className="mt-4 font-display font-semibold text-4xl md:text-5xl text-white">
              Let's build something
              <span className="text-gradient"> unforgettable</span>.
            </h2>
            <p className="mt-4 text-white/55 font-body max-w-lg mx-auto">
              Have a project in mind, or just want to talk design and code? My inbox
              is always open.
            </p>
          </div>

          {!sent ? (
            <div className="relative grid gap-4 max-w-xl mx-auto">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 font-body text-sm focus:border-cyan/50 outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 font-body text-sm focus:border-cyan/50 outline-none transition-colors"
                />
              </div>
              <textarea
                rows={4}
                placeholder="Tell me about your project"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 font-body text-sm focus:border-cyan/50 outline-none transition-colors resize-none"
              />
              <button onClick={handleSubmit} className="btn-glow justify-center mt-2">
                <Send size={16} />
                Send message
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center text-cyan-soft font-body py-6"
            >
              Thanks — your message is ready to send once this is connected to a backend or form service.
            </motion.div>
          )}

          <div className="relative flex items-center justify-center gap-5 mt-10 pt-8 border-t border-white/10">
            <a
              href="mailto:hello@example.com"
              className="flex items-center gap-2 text-white/60 hover:text-cyan-soft transition-colors text-sm font-body"
            >
              <Mail size={16} /> hello@example.com
            </a>
            <span className="w-px h-4 bg-white/15" />
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/60 hover:text-cyan-soft hover:border-cyan/40 transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
