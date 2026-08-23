import { motion } from 'framer-motion'

const TIMELINE = [
  {
    role: 'Senior UI/UX & Frontend Designer',
    company: 'Nimbus Studio',
    period: '2023 — Present',
    desc: 'Leading design systems and frontend architecture for enterprise SaaS products, mentoring a team of four.',
  },
  {
    role: 'Product Designer / Frontend Developer',
    company: 'Lumen Labs',
    period: '2021 — 2023',
    desc: 'Owned end-to-end design and implementation for three flagship consumer apps.',
  },
  {
    role: 'UI Designer',
    company: 'Freelance',
    period: '2019 — 2021',
    desc: 'Partnered with early-stage startups on brand identity, landing pages, and interactive prototypes.',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-eyebrow"
          >
            Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display font-semibold text-4xl md:text-5xl text-white"
          >
            Where I've been
          </motion.h2>
        </div>

        <div className="relative pl-8 md:pl-0">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan/50 via-indigo/30 to-transparent md:-translate-x-1/2" />

          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative mb-14 md:w-1/2 ${
                i % 2 === 0 ? 'md:pr-12 md:text-right md:ml-0' : 'md:pl-12 md:ml-[50%]'
              }`}
            >
              <span className="absolute -left-8 md:left-auto md:right-auto top-1 w-3 h-3 rounded-full bg-cyan shadow-[0_0_16px_rgba(0,229,255,0.7)] md:hidden" />
              <div className="glass rounded-2xl p-6 hover:border-cyan/40 transition-colors duration-300">
                <span className="font-mono text-xs text-cyan-soft">{item.period}</span>
                <h3 className="font-display font-semibold text-xl text-white mt-2">{item.role}</h3>
                <div className="text-white/50 text-sm font-body mt-1">{item.company}</div>
                <p className="text-white/55 text-sm font-body mt-3 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
