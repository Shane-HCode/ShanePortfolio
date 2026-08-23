import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown, Sparkles } from 'lucide-react'
import Hero3D from './Hero3D.jsx'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const textY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  const sceneOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.15])

  return (
    <section id="top" ref={ref} className="relative h-[100vh] w-full overflow-hidden bg-void">
      {/* 3D centerpiece — dominant visual */}
      <motion.div style={{ scale: sceneScale, opacity: sceneOpacity }} className="absolute inset-0">
        <Hero3D />
      </motion.div>

      {/* gradient wash to keep text legible without hiding the animation */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-void via-transparent to-void/40" />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex items-center gap-2 px-4 py-2 mb-6 rounded-full section-eyebrow glass"
        >
          <Sparkles size={14} className="text-cyan-soft" />
          UI/UX Designer · WEB DEVELOPER
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: 'easeOut' }}
          className="font-display font-semibold text-[13vw] sm:text-7xl md:text-8xl leading-[0.95] tracking-tight text-white max-w-5xl"
        >
          Designing
          <br />
          <span className="text-gradient">interfaces</span> that
          <br />
          feel alive
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="max-w-xl mt-8 text-base text-white/60 font-body md:text-lg"
        >
          Crafting immersive, motion-driven digital products at the intersection
          of design and code, from pixel perfect UI to production ready React.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          <a href="#work" className="btn-glow">
            View my work
          </a>
          <a href="#contact" className="btn-ghost">
            Get in touch
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute z-10 flex flex-col items-center gap-2 transition-colors -translate-x-1/2 bottom-8 left-1/2 text-white/40 hover:text-cyan-soft"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  )
}
