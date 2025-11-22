'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Beautiful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-slate-300">AI-Powered Study Abroad Platform</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
          >
            <span className="text-white">Your path to</span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              world-class education
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Join 500+ students from Moldova & Romania who used our AI platform to get accepted into top universities worldwide
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/auth/signup"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-full hover:bg-slate-100 transition-all shadow-lg shadow-white/10"
            >
              Start Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-4 text-slate-300 font-medium hover:text-white transition-colors"
            >
              Learn more
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 flex flex-wrap items-center justify-center gap-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-slate-500">Students helped</div>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-slate-500">Countries</div>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">95%</div>
              <div className="text-sm text-slate-500">Success rate</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
