'use client'

import { motion } from 'framer-motion'

const stats = [
  { value: '500+', label: 'Students helped' },
  { value: '50+', label: 'Countries' },
  { value: '95%', label: 'Success rate' },
  { value: '€2M+', label: 'Scholarships won' },
]

export function Stats() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#a855f7] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
