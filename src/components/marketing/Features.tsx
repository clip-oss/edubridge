'use client'

import { motion } from 'framer-motion'
import { Search, FileText, ClipboardCheck, MessageCircle, ListTodo, Target } from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Smart University Matching',
    description: 'AI finds your perfect university matches based on your profile and preferences',
    color: 'bg-indigo-500',
    pro: false,
  },
  {
    icon: FileText,
    title: 'AI Essay Checker',
    description: 'Get instant feedback and suggestions to perfect your application essays',
    color: 'bg-teal-500',
    pro: false,
  },
  {
    icon: ClipboardCheck,
    title: 'Visa Checklist Generator',
    description: 'Country-specific visa requirements and document checklists',
    color: 'bg-orange-500',
    pro: true,
  },
  {
    icon: MessageCircle,
    title: '24/7 AI Assistant',
    description: 'Get instant answers to all your study abroad questions anytime',
    color: 'bg-pink-500',
    pro: false,
  },
  {
    icon: ListTodo,
    title: 'Application Tracker',
    description: 'Track deadlines, documents, and application status in one place',
    color: 'bg-purple-500',
    pro: true,
  },
  {
    icon: Target,
    title: 'Scholarship Finder',
    description: 'Discover scholarships that match your profile and goals',
    color: 'bg-cyan-500',
    pro: true,
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Everything You Need to Succeed
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Powerful tools designed to make your study abroad journey smooth and successful
          </motion.p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              {/* PRO badge */}
              {feature.pro && (
                <span className="absolute top-4 right-4 px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold rounded-md">
                  PRO
                </span>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
