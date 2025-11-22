'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="py-32 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to start?
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-xl mx-auto">
            Join hundreds of students who are already on their way to their dream universities.
          </p>

          <Link
            href="/auth/signup"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-full hover:bg-slate-100 transition-all"
          >
            Create free account
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="mt-6 text-sm text-slate-500">
            No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  )
}
