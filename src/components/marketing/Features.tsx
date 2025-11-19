'use client'

import { motion } from 'framer-motion'
import { BookOpen, Target, FileCheck, Globe, Award, HeadphonesIcon } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'AI Essay Studio',
    description: 'Get intelligent feedback on your essays with our advanced AI that understands what universities look for.'
  },
  {
    icon: Target,
    title: 'Smart School Matching',
    description: 'Find your perfect fit from thousands of schools based on your profile, goals, and budget.'
  },
  {
    icon: FileCheck,
    title: 'Visa Copilot',
    description: 'Never miss a document or deadline with our automated visa guidance system.'
  },
  {
    icon: Globe,
    title: 'Housing & Travel',
    description: 'Book accommodations and flights with our partner network at student-friendly prices.'
  },
  {
    icon: Award,
    title: 'Scholarship Finder',
    description: 'Discover and apply to scholarships that match your profile and reduce costs.'
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Get help anytime with our AI chatbot and human counselors when you need them.'
  }
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything You Need</h2>
          <p className="text-xl text-gray-600">Comprehensive tools to make studying abroad simple</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
