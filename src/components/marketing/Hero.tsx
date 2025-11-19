'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Background blur elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Join 500+ students already preparing
          </motion.div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Get Into Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dream School Abroad
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            From essay writing to visa approval — we handle everything
            with AI-powered guidance
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="#pricing">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Start Your Application
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg rounded-xl hover:bg-gray-50"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-600"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white"
                />
              ))}
            </div>
            <p>
              <span className="font-semibold text-gray-900">2,500+</span> students helped
            </p>
            <p>
              <span className="font-semibold text-gray-900">85%</span> acceptance rate
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 rounded-full border-2 border-gray-300 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
