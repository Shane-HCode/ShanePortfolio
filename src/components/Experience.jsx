import { motion } from 'framer-motion'

const TIMELINE = [
  {
    role: 'B.Sc. (Hons) in Information Technology & Management',
    company: 'University of Moratuwa',
    period: '2026 — Present',
    desc: 'Currently pursuing an undergraduate degree in Information Technology & Management, with a focus on technology, software development, business, and information systems.',
  },

  {
    role: 'BCS Higher Education Qualification – Postgraduate Diploma',
    company: 'British Computer Society (BCS)',
    period: 'Completed 2026',
    desc: 'Completed the BCS Higher Education Qualification Postgraduate Diploma, strengthening my foundation in computing and software development.',
  },

  {
    role: 'GCE Advanced & Ordinary Level',
    company: "S. Thomas' College",
    period: '2011 — 2023',
    desc: 'Completed GCE Advanced Level with 3 A passes and GCE Ordinary Level with 8 A passes and 1 B pass.',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-32 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base md:text-xl lg:text-base section-eyebrow"
          >
            Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-4xl font-semibold text-white md:text-4xl lg:text-5xl font-display"
          >
            Where I've been
          </motion.h2>
        </div>

        <div className="relative pl-8 md:pl-0">
          <div className="absolute top-0 bottom-0 left-0 w-px md:left-1/2 bg-gradient-to-b from-cyan/50 via-indigo/30 to-transparent md:-translate-x-1/2" />

          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative mb-14 md:w-[400px] lg:w-1/2 ${
                i % 2 === 0 ? 'md:pr-12 lg:text-right md:ml-0' : 'md:pl-12 md:ml-[50%]'
              }`}
            >
              <span className="absolute -left-8 md:left-auto md:right-auto top-1 w-3 h-3 rounded-full bg-cyan shadow-[0_0_16px_rgba(0,229,255,0.7)] md:hidden" />
              <div className="p-6 transition-colors duration-300 glass rounded-2xl hover:border-cyan/40">
                <span className="font-mono text-md md:text-xl lg:text-sm text-cyan-soft">{item.period}</span>
                <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl lg:text-xl font-display">{item.role}</h3>
                <div className="mt-2 text-[18px] md:text-[22px] lg:text-md text-white/50 font-body">{item.company}</div>
                <p className="mt-3 text-[16px] lg:text-[15px] md:text-[20px] leading-relaxed text-white/55 font-body">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
