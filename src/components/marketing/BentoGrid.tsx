'use client'

import { motion } from 'framer-motion'
import { Search, FileText, Globe, MessageCircle, BarChart3, Zap } from 'lucide-react'

const items = [
  {
    title: 'University Finder',
    description: 'AI matches you with perfect universities',
    icon: Search,
    color: '#00d4ff',
    size: 'large',
  },
  {
    title: 'Essay Checker',
    description: 'Get instant AI feedback',
    icon: FileText,
    color: '#a855f7',
    size: 'medium',
  },
  {
    title: '3 FREE',
    description: 'searches per month',
    icon: Zap,
    color: '#22c55e',
    size: 'small',
  },
  {
    title: 'Visa Checklist',
    description: 'Step-by-step guidance',
    icon: Globe,
    color: '#f59e0b',
    size: 'medium',
  },
  {
    title: '24/7',
    description: 'AI assistance',
    icon: MessageCircle,
    color: '#00d4ff',
    size: 'small',
  },
  {
    title: 'Application Tracker',
    description: 'Never miss a deadline',
    icon: BarChart3,
    color: '#a855f7',
    size: 'large',
  },
]

export function BentoGrid() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            What You Get
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative bg-[#1a1a2e]/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-white/10 hover:-translate-y-1 transition-all ${
                item.size === 'large' ? 'col-span-2 row-span-2' :
                item.size === 'medium' ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ boxShadow: `0 0 60px ${item.color}15` }}
              />

              <div className="relative">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
