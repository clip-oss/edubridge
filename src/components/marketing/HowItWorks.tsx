'use client'

import { motion } from 'framer-motion'
import { User, Search, FileText, PartyPopper } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Build Your Profile',
    description: 'Tell us about your academic background, interests, and goals',
    icon: User,
    color: 'bg-indigo-500',
  },
  {
    number: '02',
    title: 'Get Matched',
    description: 'Our AI finds universities that fit your profile perfectly',
    icon: Search,
    color: 'bg-teal-500',
  },
  {
    number: '03',
    title: 'Perfect Your Application',
    description: 'Get AI feedback on essays and track your documents',
    icon: FileText,
    color: 'bg-orange-500',
  },
  {
    number: '04',
    title: 'Get Accepted!',
    description: 'Receive offers from your dream universities',
    icon: PartyPopper,
    color: 'bg-pink-500',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            From profile to acceptance letter in four simple steps
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gray-200" />
              )}

              <div className="relative bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors">
                {/* Number badge */}
                <span className="absolute -top-3 -left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-gray-400 shadow-md">
                  {step.number}
                </span>

                {/* Icon */}
                <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center mb-4`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
