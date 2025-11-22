'use client'

import { motion } from 'framer-motion'
import { Search, FileText, Globe, MessageCircle, BarChart3, Gift } from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Smart Matching',
    description: 'AI analyzes your profile to find perfect university matches from 1000+ programs',
  },
  {
    icon: FileText,
    title: 'Essay Feedback',
    description: 'Get instant AI feedback to craft compelling application essays',
  },
  {
    icon: Globe,
    title: 'Visa Guidance',
    description: 'Step-by-step visa requirements and document checklists',
  },
  {
    icon: MessageCircle,
    title: 'AI Assistant',
    description: '24/7 answers to all your study abroad questions',
  },
  {
    icon: BarChart3,
    title: 'Track Progress',
    description: 'Never miss deadlines with smart reminders',
  },
  {
    icon: Gift,
    title: 'Scholarships',
    description: 'Discover funding opportunities that match your profile',
  },
]

export function Features() {
  return (
    <section id="features" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-violet-600 mb-4"
          >
            FEATURES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900"
          >
            Everything you need
          </motion.h2>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-3xl bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
