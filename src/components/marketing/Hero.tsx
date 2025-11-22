'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Floating blobs */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"
        />

        {/* Decorative circles */}
        <div className="absolute top-40 right-1/4 w-4 h-4 bg-orange-400 rounded-full opacity-60" />
        <div className="absolute bottom-1/3 left-20 w-3 h-3 bg-cyan-400 rounded-full opacity-60" />
        <div className="absolute top-1/4 right-20 w-2 h-2 bg-pink-400 rounded-full opacity-80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              AI-Powered Study Abroad Platform
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight mb-6"
            >
              Turn Your Study Abroad{' '}
              <span className="relative">
                <span className="relative z-10">Dreams</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-orange-500/30 -z-0" />
              </span>{' '}
              Into Reality
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-white/80 mb-10 max-w-xl mx-auto lg:mx-0"
            >
              AI-powered platform helping students from Eastern Europe get accepted to top universities worldwide
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/auth/signup"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105"
              >
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative">Start Your Journey — It's Free</span>
                <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center gap-2 px-6 py-4 text-white font-medium hover:text-white/80 transition-colors">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <Play className="w-4 h-4 ml-0.5" />
                </span>
                Watch Demo
              </button>
            </motion.div>
          </div>

          {/* Right side - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            {/* Main dashboard mockup */}
            <div className="relative transform perspective-1000 rotate-y-[-5deg] rotate-x-[5deg]">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                {/* Browser bar */}
                <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white rounded-md px-3 py-1.5 text-xs text-gray-500 text-center max-w-xs mx-auto">
                      app.edubridge.io/dashboard
                    </div>
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="p-6 bg-gray-50">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="text-2xl font-bold text-purple-600">12</div>
                      <div className="text-xs text-gray-500">Matches</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="text-2xl font-bold text-blue-600">3</div>
                      <div className="text-xs text-gray-500">Essays</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="text-2xl font-bold text-green-600">85%</div>
                      <div className="text-xs text-gray-500">Complete</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="h-2 w-20 bg-gray-200 rounded mb-2" />
                    <div className="space-y-2">
                      <div className="h-8 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg" />
                      <div className="h-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-2xl -z-10 rounded-3xl" />
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div>
                <div className="text-xs font-semibold">Application Sent!</div>
                <div className="text-xs text-gray-500">MIT</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-8 bg-white rounded-xl shadow-lg p-3"
            >
              <div className="text-xs font-semibold text-purple-600">Match Score</div>
              <div className="text-lg font-bold">94%</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
