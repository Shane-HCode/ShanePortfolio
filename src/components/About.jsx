import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: 'easeOut' },
  }),
}

export default function About() {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -10, y: px * 12 })
  }
  const resetTilt = () => setTilt({ x: 0, y: 0 })

  return (
    <section id="about" className="relative px-6 py-32 md:px-12">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-16 items-center">
        {/* Photo */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="relative w-[280px] mx-auto md:w-[400px] lg:w-80"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={resetTilt}
            style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
            className="relative aspect-[4/5] rounded-3xl glass-strong p-3 transition-transform duration-300 ease-out [transform-style:preserve-3d]"
          >
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-cyan/20 to-indigo/20 blur-2xl -z-10 animate-pulse-slow" />
            <img
              src="/profile.jpg"
              alt="Portrait"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextSibling.style.display = 'flex'
              }}
              className="object-cover rounded-2xl"
            />
            <div
              className="items-center justify-center hidden w-full h-full px-4 font-mono text-xs text-center rounded-2xl bg-gradient-to-br from-panel to-void text-white/30"
            >
              Drop your photo at
              <br />
              <span className="block mt-1 text-cyan-soft">/public/profile.jpg</span>
            </div>
            <div className="absolute px-3 py-2 font-mono md:text-lg lg:text-sm top-1 md:top-4 -right-14 md:-right-16 lg:-right-6 glass rounded-2xl text-cyan-soft animate-float">
              &lt;/&gt; open to work
            </div>
          </div>
        </motion.div>

        {/* Text */}
        <div>
          <motion.span
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-base md:text-2xl lg:text-base section-eyebrow"
          >
            About
          </motion.span>

          <motion.h2
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl md:mt-6 lg:mt-4 font-display "
          >
            Where design
            <span className="text-gradient"> systems</span> meet
            <span className="text-gradient"> shipped code</span>.
          </motion.h2>

          <motion.p
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-6 text-lg leading-relaxed text-justify md:text-2xl lg:text-lg text-white/60 font-body"
          >
            I'm a UI/UX designer and frontend developer who takes ideas from a blank
            Figma canvas all the way to production ready React. I care about the
            details most people scroll past, the easing curve on a hover state, the
            way a glass panel catches light, the millisecond a page feels instant.
          </motion.p>

          <motion.p
            custom={3}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-4 text-lg leading-relaxed text-justify md:text-2xl lg:text-lg text-white/60 font-body"
          >
            Lately that means building immersive, motion-driven interfaces with
            Three.js and Framer Motion, pushing what a browser tab can feel like.
          </motion.p>

          <motion.div
            custom={4}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="grid grid-cols-3 gap-4 mt-12"
          >
            {[
              ['2+', 'Years crafting UI'],
              ['5+', 'Projects delivered'],
              ['24/7', 'Curiosity at work'],
            ].map(([n, l]) => (
              <div key={l} className="px-4 py-4 text-center glass rounded-xl">
                <div className="text-2xl font-semibold md:text-4xl lg:text-2xl font-display text-gradient">{n}</div>
                <div className="text-[13px] md:text-[17px] lg:text-[13px] text-white/50 mt-2 font-body">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
