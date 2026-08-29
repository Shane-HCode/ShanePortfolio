import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

// Store images in: src/assets/images/
// Example paths: /src/assets/images/kraftex.jpg, /src/assets/images/sentibeats.jpg, etc.

const PROJECTS = [
  {
    title: 'KraftEx',
    tag: 'Business Website',
    desc: 'A responsive business website developed for a real corrugated packaging company, featuring a modern interface and integrated email communication.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    gradient: 'from-cyan/30 to-indigo/10',
    image: '/src/assets/kraftex.jpg', // Path to image
    link: 'https://kraftexweb.vercel.app/' // Project link
  },
  {
    title: 'SentiBeats',
    tag: 'AI-Powered Web App',
    desc: 'An emotion-aware music player that uses facial expression recognition and a trained AI model to recommend music based on the listener\'s detected emotion.',
    stack: ['React', 'Python', 'Flask', 'AI/ML'],
    gradient: 'from-purple/30 to-pink/10',
    image: '/src/assets/sentibeats.jpg',
    link: 'https://sentibeats.example.com'
  },
  {
    title: "Shane's Cafe",
    tag: 'Cafe Website',
    desc: 'A responsive cafe website with a warm rustic aesthetic, clean menu tables, earthy tones, and subtle interactive effects.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    gradient: 'from-amber/30 to-orange/10',
    image: '/src/assets/shanescafe.jpg',
    link: 'https://github.com/Shane-HCode/Cafe-webpage.git'
  },
  {
    title: 'PapersHub.SL',
    tag: 'Web Application',
    desc: 'A multilingual A/L past paper management platform designed to help Sri Lankan students easily access and organize examination resources.',
    stack: ['React', 'PHP', 'MySQL'],
    gradient: 'from-indigo/30 to-cyan/10',
    image: '/src/assets/papershub.jpg',
    link: 'https://papershub.example.com'
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
        {/* Image overlay */}
        <img 
          src={project.image} 
          alt={project.title}
          className="absolute inset-0 object-cover w-full h-full transition-opacity duration-500 "
        />

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute flex items-center justify-center w-10 h-10 transition-all duration-300 translate-y-2 rounded-full opacity-0 glass-strong bg-black/50 top-5 right-5 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-cyan/20"
        >
          <ArrowUpRight size={16} className="text-cyan-soft" />
        </a>
      </div>

      <div className="p-7">
        <span className="text-[13px] md:text-[17px] lg:text-md section-eyebrow">{project.tag}</span>
        <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl lg:text-2xl font-display">{project.title}</h3>
        <p className="mt-3 leading-relaxed text-md md:text-lg lg:text-md text-white/55 font-body">{project.desc}</p>
        <div className="flex flex-wrap gap-2 mt-5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="text-[14px] lg:text-[12px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60"
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
    <section id="work" className="relative px-6 py-32 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-base md:text-xl lg:text-base section-eyebrow"
            >
              Selected Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-4xl font-semibold text-white font-display md:text-4xl lg:text-5xl"
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
            className="max-w-sm text-lg md:text-xl lg:text-md text-white/50 font-body"
          >
            A mix of product design and development, chosen for
            the problems they solved.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}