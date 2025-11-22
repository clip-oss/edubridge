'use client'

import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'

const problems = [
  'Confusing requirements for each country',
  'Expensive consultants ($3000+)',
  'No one to guide you through the process',
  'Missed deadlines and opportunities',
  'Essays that get rejected',
]

const solutions = [
  'AI matches you to perfect universities',
  'Affordable for everyone ($0 to start)',
  '24/7 AI guidance whenever you need it',
  'Never miss a deadline with smart alerts',
  'Essays that get you accepted',
]

export function ProblemSolution() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
          {/* Problem side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900 p-8 md:p-12"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              Applying abroad is overwhelming...
            </h3>
            <p className="text-zinc-400 mb-8">
              Most students face these challenges
            </p>

            <ul className="space-y-4">
              {problems.map((problem, i) => (
                <motion.li
                  key={problem}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center mt-0.5">
                    <X className="w-3.5 h-3.5 text-rose-400" />
                  </span>
                  <span className="text-zinc-300">{problem}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solution side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 md:p-12"
          >
            <h3 className="text-2xl font-bold text-zinc-900 mb-2">
              EduBridge makes it simple
            </h3>
            <p className="text-zinc-600 mb-8">
              Here's how we help you succeed
            </p>

            <ul className="space-y-4">
              {solutions.map((solution, i) => (
                <motion.li
                  key={solution}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span className="text-zinc-700">{solution}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
