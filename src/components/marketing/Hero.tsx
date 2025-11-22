'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, GraduationCap, Plane, Building, Globe2 } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-zinc-900">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-900/40 via-zinc-900 to-zinc-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />

        {/* Animated blobs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl"
        />

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                AI-Powered Study Abroad Platform
              </span>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
                From Moldova to the{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  World's Best
                </span>{' '}
                Universities
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-zinc-400 mb-8 max-w-lg">
                The AI platform that got 200+ Eastern European students into Oxford, MIT, and more
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div>
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-sm text-zinc-500">Students</div>
                </div>
                <div className="w-px bg-zinc-700" />
                <div>
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-sm text-zinc-500">Countries</div>
                </div>
                <div className="w-px bg-zinc-700" />
                <div>
                  <div className="text-2xl font-bold text-white">95%</div>
                  <div className="text-sm text-zinc-500">Success Rate</div>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/auth/signup"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-105"
              >
                Start Your Free Profile
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right side - 3D Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square">
              {/* Central globe */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Globe2 className="w-32 h-32 text-emerald-400/50" />
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 bg-white rounded-xl p-4 shadow-2xl"
              >
                <GraduationCap className="w-8 h-8 text-emerald-600" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 left-10 bg-white rounded-xl p-4 shadow-2xl"
              >
                <Plane className="w-8 h-8 text-amber-500" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 left-0 bg-white rounded-xl p-4 shadow-2xl"
              >
                <Building className="w-8 h-8 text-rose-500" />
              </motion.div>

              {/* Acceptance badge */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 right-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl px-4 py-3 shadow-2xl"
              >
                <div className="text-sm font-medium">Accepted! 🎉</div>
                <div className="text-xs opacity-80">University of Oxford</div>
              </motion.div>

              {/* Glowing dots */}
              <div className="absolute top-20 left-1/3 w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
              <div className="absolute bottom-1/3 right-20 w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
              <div className="absolute top-1/2 right-10 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
