import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Github, Linkedin, Instagram, Send } from 'lucide-react'

const SOCIALS = [
  { icon: Github, href: 'https://github.com/Shane-HCode', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/shane-henricus-496034297/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/_shanehenri/', label: 'Instagram' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
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

          {!sent ? (
            <div className="relative grid max-w-xl gap-4 mx-auto">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your name"
                  className="px-4 py-3 text-lg text-white transition-colors border outline-none md:text-xl lg:text-base bg-white/5 border-white/10 rounded-xl placeholder-white/30 font-body focus:border-cyan/50"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-3 text-lg text-white transition-colors border outline-none md:text-xl lg:text-base bg-white/5 border-white/10 rounded-xl placeholder-white/30 font-body focus:border-cyan/50"
                />
              </div>
              <textarea
                rows={4}
                placeholder="Tell me about your project"
                className="px-4 py-3 text-lg text-white transition-colors border outline-none resize-none md:text-xl lg:text-base bg-white/5 border-white/10 rounded-xl placeholder-white/30 font-body focus:border-cyan/50"
              />
              <button onClick={handleSubmit} className="justify-center mt-2 btn-glow md:text-lg lg:text-sm">
                <Send size={16} />
                Send message
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center text-cyan-soft font-body"
            >
              Thanks — your message is ready to send once this is connected to a backend or form service.
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