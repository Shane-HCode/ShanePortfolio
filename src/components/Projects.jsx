import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const PROJECTS = [
  {
    title: 'Nebula Analytics',
    tag: 'SaaS Dashboard',
    desc: 'A real-time analytics platform with a fully custom design system and animated data visualizations.',
    stack: ['React', 'D3.js', 'Tailwind'],
    gradient: 'from-cyan/30 to-indigo/10',
  },
  {
    title: 'Aurora Commerce',
    tag: 'E-commerce',
    desc: 'Headless storefront with 3D product previews and buttery scroll-triggered transitions.',
    stack: ['Next.js', 'Three.js', 'Framer Motion'],
    gradient: 'from-indigo/30 to-cyan/10',
  },
  {
    title: 'Pulse Fitness App',
    tag: 'Mobile-first Web App',
    desc: 'Gamified fitness tracker UI with glassmorphism cards and micro-interaction-rich onboarding.',
    stack: ['React Native Web', 'Framer Motion'],
    gradient: 'from-cyan/20 to-indigo/30',
  },
  {
    title: 'Vertex Design System',
    tag: 'Design System',
    desc: 'A token-driven component library shipped to five product teams, cutting build time by 40%.',
    stack: ['Figma', 'Storybook', 'React'],
    gradient: 'from-indigo/20 to-cyan/20',
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -8, y: px * 10 })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.15 }}
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className="group relative rounded-3xl glass overflow-hidden transition-transform duration-300 ease-out [transform-style:preserve-3d] hover:border-cyan/40"
    >
      <div className={`h-56 relative bg-gradient-to-br ${project.gradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-grid-lines bg-[size:32px_32px] opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-6xl font-semibold text-white/10 group-hover:text-white/20 transition-colors duration-500 select-none">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <a
          href="#"
          className="absolute top-5 right-5 w-10 h-10 rounded-full glass-strong flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
        >
          <ArrowUpRight size={16} className="text-cyan-soft" />
        </a>
      </div>

      <div className="p-7">
        <span className="section-eyebrow">{project.tag}</span>
        <h3 className="font-display font-semibold text-2xl text-white mt-2">{project.title}</h3>
        <p className="text-white/55 font-body text-sm mt-3 leading-relaxed">{project.desc}</p>
        <div className="flex flex-wrap gap-2 mt-5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="work" className="relative py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-eyebrow"
            >
              Selected Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 font-display font-semibold text-4xl md:text-5xl text-white"
            >
              Projects worth a
              <span className="text-gradient"> second look</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 font-body max-w-xs text-sm"
          >
            A mix of product design and hands-on frontend engineering, chosen for
            the problems they solved.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
