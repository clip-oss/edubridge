'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  const [email, setEmail] = useState('')

  return (
    <section className="py-24 bg-gradient-to-r from-[#00d4ff] to-[#a855f7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Change Your Future?
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Link
              href={`/auth/signup${email ? `?email=${encodeURIComponent(email)}` : ''}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-black/80 transition-all"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-sm text-white/70">
            No credit card needed
          </p>
        </motion.div>
      </div>
    </section>
  )
}
