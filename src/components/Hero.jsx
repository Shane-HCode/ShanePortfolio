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
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center md:justify-normal lg:justify-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex items-center md:gap-4 px-4 py-2 mb-6 text-[16px] md:text-[22px] rounded-full lg:text-sm section-eyebrow glass md:mt-[5em] lg:mt-0"
        >
          <Sparkles className="w-9 h-9 md:lg:w-10 md:h-10 lg:w-5 lg:h-5 text-cyan-soft" />
          UI/UX Designer · WEB DEVELOPER
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: 'easeOut' }}
          className="font-display font-semibold text-[13vw] md:text-7xl leading-[0.95] tracking-tight text-white max-w-5xl md:mt-14 lg:mt-0"
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
          className="max-w-xl mt-12 text-lg md:mt-[300px] lg:mt-12 md:text-3xl lg:text-lg text-white/60 font-body"
        >
          Crafting immersive, motion-driven digital products at the intersection
          of design and code, from pixel perfect UI to production ready React.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-5 md:mt-10 lg:mt-8"
        >
          <a href="#work" className="md:text-xl lg:text-sm btn-glow">
            View my work
          </a>
          <a href="/ShaneHenricus-CV.pdf" download className="md:text-xl lg:text-sm btn-ghost">
            Download CV
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
        <span className="text-[10px] md:text-[15px] lg:text-[10px] font-mono tracking-[0.3em] uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  )
}
