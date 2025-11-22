'use client'

import { motion } from 'framer-motion'

const universities = [
  'Oxford', 'MIT', 'ETH Zürich', 'TU Munich', 'Cambridge', 'Stanford', 'Imperial'
]

export function TrustedBy() {
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-medium text-slate-500 mb-6">
            Helping students get accepted to
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {universities.map((uni, index) => (
              <motion.div
                key={uni}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-slate-400 font-semibold text-sm md:text-base tracking-wide"
              >
                {uni}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
