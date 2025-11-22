'use client'

import { motion } from 'framer-motion'

const universities = [
  'Oxford', 'Cambridge', 'MIT', 'Stanford', 'Harvard',
  'ETH Zürich', 'TU Munich', 'Imperial College', 'Yale', 'Princeton',
  'Columbia', 'Berkeley', 'Chicago', 'Duke', 'Northwestern'
]

export function LogoScroll() {
  return (
    <section className="py-8 bg-amber-50/50 border-y border-amber-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-zinc-500 mb-6">
          Our students got accepted to
        </p>
      </div>

      {/* Infinite scroll container */}
      <div className="relative">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...universities, ...universities, ...universities].map((uni, i) => (
            <span
              key={`${uni}-${i}`}
              className="text-zinc-400 font-semibold text-sm tracking-wide"
            >
              {uni}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
