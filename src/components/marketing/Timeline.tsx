'use client'

import { motion } from 'framer-motion'
import { FileText, Search, PenTool, Send, Plane, GraduationCap, PartyPopper } from 'lucide-react'

const steps = [
  {
    month: 'September',
    title: 'Build Profile & Get Matched',
    description: 'Create your profile and discover universities that match your goals',
    icon: FileText,
    color: 'bg-emerald-500',
  },
  {
    month: 'October',
    title: 'Research & Shortlist',
    description: 'Explore programs, compare options, and create your target list',
    icon: Search,
    color: 'bg-teal-500',
  },
  {
    month: 'November',
    title: 'Write Essays with AI',
    description: 'Craft compelling essays with instant AI feedback',
    icon: PenTool,
    color: 'bg-amber-500',
  },
  {
    month: 'December',
    title: 'Submit Applications',
    description: 'Track deadlines and submit polished applications',
    icon: Send,
    color: 'bg-orange-500',
  },
  {
    month: 'Jan-Mar',
    title: 'Visa Preparation',
    description: 'Get step-by-step visa guidance for your destination',
    icon: Plane,
    color: 'bg-rose-500',
  },
  {
    month: 'April',
    title: 'Acceptance Letters!',
    description: 'Receive offers and choose your dream university',
    icon: GraduationCap,
    color: 'bg-purple-500',
  },
  {
    month: 'September',
    title: 'Start Your Journey!',
    description: 'Begin classes at your dream university',
    icon: PartyPopper,
    color: 'bg-pink-500',
  },
]

export function Timeline() {
  return (
    <section className="py-24 bg-zinc-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4"
          >
            Your Journey to Success
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-600"
          >
            From first step to first day of class
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-300 via-amber-300 to-pink-300 transform md:-translate-x-1/2" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.month}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Icon */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-10 h-10 ${step.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
                    <span className="text-sm font-medium text-emerald-600">{step.month}</span>
                    <h3 className="text-lg font-semibold text-zinc-900 mt-1">{step.title}</h3>
                    <p className="text-sm text-zinc-500 mt-1">{step.description}</p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
