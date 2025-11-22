'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play, ChevronDown } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Animated gradient orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00d4ff]/20 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#a855f7]/20 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#22c55e]/10 rounded-full blur-[120px]"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
        >
          <span>🚀</span>
          <span className="text-sm text-gray-300">Trusted by 500+ students</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="text-white">Get Into Your</span>
          <br />
          <span className="bg-gradient-to-r from-[#00d4ff] to-[#a855f7] bg-clip-text text-transparent">
            Dream University
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
        >
          AI-powered platform for students from Moldova & Romania to get accepted into top universities worldwide
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/auth/signup"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[#00d4ff] text-black font-semibold rounded-full hover:bg-[#00d4ff]/90 transition-all shadow-lg shadow-[#00d4ff]/25 animate-pulse"
          >
            Start Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="inline-flex items-center gap-2 px-8 py-4 text-white font-medium border border-white/20 rounded-full hover:bg-white/5 transition-all">
            <Play className="w-4 h-4" />
            See Demo
          </button>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 relative"
        >
          <div className="relative mx-auto max-w-4xl">
            {/* Glow behind */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#00d4ff]/20 to-[#a855f7]/20 blur-3xl rounded-3xl" />

            {/* Dashboard card */}
            <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-[#00d4ff]">12</div>
                  <div className="text-xs text-gray-500">Matches</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-[#a855f7]">3</div>
                  <div className="text-xs text-gray-500">Essays</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-[#22c55e]">85%</div>
                  <div className="text-xs text-gray-500">Complete</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gradient-to-r from-[#00d4ff]/30 to-transparent rounded-full w-full" />
                <div className="h-3 bg-gradient-to-r from-[#a855f7]/30 to-transparent rounded-full w-3/4" />
                <div className="h-3 bg-gradient-to-r from-[#22c55e]/30 to-transparent rounded-full w-1/2" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-white/30" />
      </motion.div>
    </section>
  )
}
