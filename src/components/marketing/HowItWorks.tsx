'use client'

import { motion } from 'framer-motion'
import { UserPlus, Search, FileText, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: UserPlus,
    title: 'Create Your Profile',
    description: 'Tell us about your academic background, interests, and goals in just 5 minutes.'
  },
  {
    icon: Search,
    title: 'Match with Schools',
    description: 'Our AI analyzes thousands of programs to find your perfect matches.'
  },
  {
    icon: FileText,
    title: 'Craft Your Application',
    description: 'Get AI-powered help writing essays, preparing documents, and meeting deadlines.'
  },
  {
    icon: CheckCircle,
    title: 'Submit & Get Accepted',
    description: 'We guide you through submission, visa, housing, and celebrate your acceptance!'
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Journey to Success</h2>
          <p className="text-xl text-gray-600">Four simple steps to studying abroad</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative text-center"
              >
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {index + 1}
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
