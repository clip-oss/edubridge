'use client'

import { motion } from 'framer-motion'

const universities = [
  'OXFORD', 'MIT', 'CAMBRIDGE', 'ETH ZURICH', 'TU MUNICH', 'STANFORD',
  'HARVARD', 'IMPERIAL', 'YALE', 'PRINCETON', 'COLUMBIA', 'BERKELEY'
]

export function Marquee() {
  return (
    <section className="py-8 bg-[#0a0a0a] border-y border-white/5 overflow-hidden">
      <div className="relative">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap"
        >
          {[...universities, ...universities, ...universities].map((uni, i) => (
            <span key={i} className="text-sm font-medium text-gray-600 tracking-widest">
              {uni} •
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
