'use client'

import { motion } from 'framer-motion'
import { Target, FileText, Globe, MessageCircle, BarChart3, Gift } from 'lucide-react'

const features = [
  {
    icon: Target,
    title: 'Smart University Matching',
    description: 'AI finds your perfect fit from 1000+ programs worldwide',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    icon: FileText,
    title: 'Essay Perfector',
    description: 'Get instant AI feedback to craft winning application essays',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Globe,
    title: 'Visa Navigator',
    description: 'Step-by-step guidance for visa requirements in any country',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: MessageCircle,
    title: 'AI Study Advisor',
    description: '24/7 instant answers to all your study abroad questions',
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    icon: BarChart3,
    title: 'Application Tracker',
    description: 'Never miss a deadline with smart reminders and progress tracking',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Gift,
    title: 'Scholarship Finder',
    description: 'Discover funding opportunities that match your profile',
    gradient: 'from-violet-500 to-purple-500',
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Succeed
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Powerful AI tools designed to make your study abroad journey smooth and successful
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
              className="group relative"
            >
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/5">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
