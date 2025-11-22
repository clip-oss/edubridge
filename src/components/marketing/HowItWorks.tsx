'use client'

import { motion } from 'framer-motion'
import { UserPlus, Search, Send, Trophy } from 'lucide-react'

const steps = [
  {
    icon: UserPlus,
    title: 'Create Profile',
    description: 'Quick 2-minute setup',
    color: 'bg-purple-500',
  },
  {
    icon: Search,
    title: 'Get Matched',
    description: 'AI finds your fits',
    color: 'bg-blue-500',
  },
  {
    icon: Send,
    title: 'Apply Smart',
    description: 'Perfect your apps',
    color: 'bg-orange-500',
  },
  {
    icon: Trophy,
    title: 'Get Accepted!',
    description: 'Achieve your dreams',
    color: 'bg-green-500',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            From profile to acceptance letter in four simple steps
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-200 via-blue-200 to-green-200 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Icon circle */}
                <div className="relative inline-flex">
                  <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  {/* Step number */}
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-slate-900 shadow-md border border-slate-200">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
