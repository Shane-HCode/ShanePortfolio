import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`w-full max-w-5xl flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500 ${
          scrolled ? 'glass-strong shadow-[0_8px_40px_rgba(0,0,0,0.4)]' : 'bg-transparent border border-transparent'
        }`}
      >
        <a href="#top" className="text-xl md:text-3xl lg:text-xl font-semibold tracking-tight text-white font-display">
          <span className="text-gradient">SHANE HENRICUS </span>
        </a>

        <ul className="items-center hidden gap-8 text-md lg:flex font-body text-white/70">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="relative transition-colors group hover:text-white">
                {link.label}
                <span className="absolute left-0 w-0 h-px transition-all duration-300 -bottom-1 bg-gradient-to-r from-cyan to-indigo group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="hidden lg:inline-flex btn-glow !py-2 !px-5 !text-md">
          Let's talk
        </a>

        <button
          className="text-white lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? (
            <X className="w-6 h-6 md:w-8 md:h-8" />
          ) : (
            <Menu className="w-6 h-6 md:w-8 md:h-8" />
          )}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 w-[90%] md:w-[80%] glass-strong rounded-2xl p-4 md:p-6 flex flex-col gap-3 md:gap-5 lg:hidden"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg md:text-2xl text-white/80 font-body"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="justify-center btn-glow md:text-xl">
            Let's talk
          </a>
        </motion.div>
      )}
    </motion.header>
  )
}
