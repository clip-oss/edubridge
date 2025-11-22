'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50" />

      {/* Abstract shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-100/20 to-teal-100/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
              AI-Powered Study Abroad Guidance
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6"
          >
            Your Dream University is{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
              Closer Than You Think
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            AI-powered guidance for students from Moldova & Romania to study abroad at top universities worldwide
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/auth/signup"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              <Play className="w-5 h-5" />
              See How It Works
            </Link>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto max-w-4xl">
              {/* Browser frame */}
              <div className="bg-gray-900 rounded-t-xl p-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-800 rounded-md px-3 py-1 text-sm text-gray-400 text-center">
                    edubridge.app/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard preview content */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-b-xl p-6 shadow-2xl border border-gray-200">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 bg-white rounded-lg p-4 shadow-sm">
                    <div className="h-3 w-32 bg-gray-200 rounded mb-3" />
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-indigo-100 rounded" />
                      <div className="h-2 w-3/4 bg-indigo-100 rounded" />
                      <div className="h-2 w-1/2 bg-indigo-100 rounded" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="h-3 w-20 bg-gray-200 rounded mb-3" />
                    <div className="flex items-end gap-1 h-16">
                      <div className="w-4 h-8 bg-teal-400 rounded" />
                      <div className="w-4 h-12 bg-teal-500 rounded" />
                      <div className="w-4 h-10 bg-teal-400 rounded" />
                      <div className="w-4 h-16 bg-indigo-500 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-teal-500/10 blur-2xl -z-10 rounded-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
