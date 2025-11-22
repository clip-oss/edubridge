'use client'

import { motion } from 'framer-motion'
import { Search, FileText, Globe, MessageCircle, BarChart3, Gift } from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'University Finder',
    description: 'Find your perfect match in seconds with AI that analyzes 1000+ programs',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: FileText,
    title: 'Essay Checker',
    description: 'AI feedback that improves your essays and increases acceptance chances',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Globe,
    title: 'Visa Navigator',
    description: 'Step-by-step visa guidance for any destination country',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    icon: MessageCircle,
    title: 'AI Chatbot',
    description: '24/7 answers to any question about studying abroad',
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    icon: BarChart3,
    title: 'Application Tracker',
    description: 'Never miss a deadline with smart alerts and progress tracking',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Gift,
    title: 'Scholarship Finder',
    description: 'Discover funding opportunities that match your profile',
    gradient: 'from-teal-500 to-emerald-500',
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-zinc-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Powerful Tools for Your{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Success
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            Everything you need to navigate your study abroad journey
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
              className="group"
            >
              <div className="relative h-full bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700/50 hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
