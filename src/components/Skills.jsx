import { motion } from 'framer-motion'
import { Palette, Code2, Boxes, Wand2 } from 'lucide-react'

const GROUPS = [
  {
    icon: Palette,
    title: 'Design',
    items: ['Figma', 'Design Systems', 'Prototyping', 'Motion Design', 'User Research'],
  },
  {
    icon: Code2,
    title: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vite'],
  },
  {
    icon: Boxes,
    title: '3D & Motion',
    items: ['Three.js', 'React Three Fiber', 'Framer Motion', 'GSAP', 'WebGL'],
  },
  {
    icon: Wand2,
    title: 'Craft',
    items: ['Accessibility', 'Micro-interactions', 'Design Tokens', 'Performance', 'Testing'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-eyebrow"
          >
            Toolkit
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display font-semibold text-4xl md:text-5xl text-white"
          >
            What I bring to the table
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GROUPS.map(({ icon: Icon, title, items }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass rounded-2xl p-6 group hover:border-cyan/40 transition-colors duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan/20 to-indigo/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Icon size={20} className="text-cyan-soft" />
              </div>
              <h3 className="font-display font-medium text-lg text-white mb-4">{title}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="text-sm text-white/55 font-body flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-cyan-soft/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
