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
    <section id="skills" className="relative px-6 py-32 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base md:text-2xl lg:text-base section-eyebrow"
          >
            Toolkit
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl font-semibold text-white md:text-5xl lg:text-4xl font-display"
          >
            What I bring to the table
          </motion.h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map(({ icon: Icon, title, items }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="p-6 transition-colors duration-300 glass rounded-2xl group hover:border-cyan/40"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-5 transition-transform duration-300 md:w-14 md:h-14 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-cyan/20 to-indigo/20 group-hover:scale-110">
                <Icon className=" text-cyan-soft" />
              </div>
              <h3 className="mb-4 text-2xl font-medium text-white md:text-4xl lg:text-2xl font-display">{title}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-lg md:text-2xl lg:text-base text-white/55 font-body">
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
