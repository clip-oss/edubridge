'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Check,
  X,
  Target,
  PenTool,
  BarChart3,
  ChevronDown,
  Lock,
  CreditCard,
  Shield,
  Star,
  Zap,
  ArrowRight,
  Play
} from 'lucide-react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const universities = [
    'Harvard', 'MIT', 'Stanford', 'Oxford', 'Cambridge',
    'Yale', 'Princeton', 'Columbia', 'ETH Zurich', 'Imperial'
  ]

  const faqs = [
    {
      q: "Is it really free?",
      a: "Yes! Our free plan gives you access to university matching, basic essay feedback, and application tracking. No credit card required, no time limits."
    },
    {
      q: "How does AI help me?",
      a: "Our AI analyzes your profile against 10,000+ programs to find your best matches. It also provides instant feedback on your essays, helping you write compelling applications."
    },
    {
      q: "What's the success rate?",
      a: "Students using EduBridge are 3x more likely to get accepted. 89% of our premium users got into at least one of their top 3 choices."
    },
    {
      q: "Can I upgrade later?",
      a: "Absolutely! Start free and upgrade anytime. Your data and progress are always saved."
    },
    {
      q: "Do you support all countries?",
      a: "We support applications to universities in 50+ countries including the US, UK, EU, Canada, and Australia."
    }
  ]

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-[#111827]">
              EduBridge
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-gray-600 hover:text-[#111827] transition-colors">Features</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-[#111827] transition-colors">Pricing</Link>
              <Link href="#faq" className="text-gray-600 hover:text-[#111827] transition-colors">FAQ</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="text-gray-600 hover:text-[#111827] transition-colors">
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="bg-[#2563eb] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1d4ed8] transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left side - 60% */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 bg-[#10b981]/10 text-[#10b981] px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎓
                  </motion.span>
                  500+ students accepted
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#111827] leading-tight mb-6">
                  Get Into Your Dream University
                </h1>

                <p className="text-xl text-gray-600 mb-8 max-w-xl">
                  AI finds the best universities for YOU. Perfect your essays. Track everything. Get accepted.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#111827]"
                  />
                  <motion.button
                    whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(255, 107, 53, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#ff6b35] text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    Start Free <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-[#10b981]" /> Free forever
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-[#10b981]" /> No credit card
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-[#10b981]" /> 2 min setup
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right side - 40% */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb]/20 to-[#8b5cf6]/20 rounded-2xl blur-3xl" />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-100 rounded w-3/4" />
                      <div className="h-8 bg-[#2563eb]/10 rounded" />
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-20 bg-[#10b981]/10 rounded p-2">
                          <div className="text-xs text-[#10b981] font-medium">Match Rate</div>
                          <div className="text-2xl font-bold text-[#10b981]">94%</div>
                        </div>
                        <div className="h-20 bg-[#8b5cf6]/10 rounded p-2">
                          <div className="text-xs text-[#8b5cf6] font-medium">Programs</div>
                          <div className="text-2xl font-bold text-[#8b5cf6]">127</div>
                        </div>
                      </div>
                      <div className="h-4 bg-gray-100 rounded w-1/2" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-8 bg-gray-50 border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Students got into:</span>
            <div className="relative flex-1 overflow-hidden">
              <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="flex gap-12 whitespace-nowrap"
              >
                {[...universities, ...universities].map((uni, i) => (
                  <span key={i} className="text-lg font-semibold text-gray-400">
                    {uni}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-12">
              Applying to universities abroad is...
            </h2>
          </motion.div>

          <div className="space-y-6 mb-12">
            {[
              { text: "Confusing", desc: "100s of different requirements" },
              { text: "Expensive", desc: "Consultants charge €3000+" },
              { text: "Risky", desc: "One mistake = rejection" }
            ].map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-4 bg-red-50 p-4 rounded-lg"
              >
                <X className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div className="text-left">
                  <span className="font-semibold text-[#111827]">{problem.text}</span>
                  <span className="text-gray-600"> — {problem.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-[#2563eb] font-medium"
          >
            There's a better way ↓
          </motion.p>
        </div>
      </section>

      {/* Solution - 3 Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-4">
              EduBridge Does It All
            </h2>
            <p className="text-gray-600 text-lg">Everything you need to get accepted</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Smart Matching",
                headline: "Find universities where you'll get in",
                desc: "Our AI analyzes your profile vs. 10,000+ programs",
                color: "#2563eb"
              },
              {
                icon: PenTool,
                title: "Perfect Essays",
                headline: "Get AI feedback in seconds",
                desc: "Write essays that admissions officers love",
                color: "#8b5cf6"
              },
              {
                icon: BarChart3,
                title: "Track Everything",
                headline: "Never miss a deadline",
                desc: "All your applications in one place",
                color: "#10b981"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-2">{feature.headline}</h3>
                <p className="text-gray-600 mb-6">{feature.desc}</p>
                <div className="bg-gray-50 rounded-lg h-32 flex items-center justify-center">
                  <span className="text-sm text-gray-400">{feature.title} Preview</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-4">
              See it in action
            </h2>
            <p className="text-gray-600 text-lg mb-8">Watch how EduBridge helps you get accepted</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gray-900 rounded-2xl aspect-video mb-8 overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
              >
                <Play className="w-8 h-8 text-[#111827] ml-1" />
              </motion.div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white/60 text-sm">
              <span>2:34</span>
              <span>Product Demo</span>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#2563eb] text-white px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center gap-2"
          >
            Try University Finder <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-4">
              Simple Pricing. Huge Results.
            </h2>
            <p className="text-gray-600 text-lg">Choose the plan that fits your goals</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Free */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-bold text-[#111827] mb-2">Free</h3>
              <div className="mb-4">
                <span className="text-5xl font-bold text-[#111827]">€0</span>
              </div>
              <p className="text-gray-600 mb-6">Perfect to start</p>
              <ul className="space-y-3 mb-8">
                {['5 university matches', 'Basic essay feedback', 'Application tracker', 'Email support', 'Community access'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600">
                    <Check className="w-5 h-5 text-[#10b981]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 border-2 border-[#2563eb] text-[#2563eb] rounded-lg font-semibold hover:bg-[#2563eb]/5 transition-colors">
                Start Free
              </button>
            </motion.div>

            {/* Premium - Highlighted */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-xl border-2 border-[#2563eb] relative md:-mt-4 md:mb-4"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2563eb] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Star className="w-4 h-4" /> MOST POPULAR
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-2">Premium</h3>
              <div className="mb-1">
                <span className="text-5xl font-bold text-[#111827]">€597</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">One-time payment</p>
              <p className="text-gray-600 mb-6">Everything you need to get accepted</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited matches',
                  'Advanced AI essay coach',
                  'Scholarship finder',
                  'Application templates',
                  'Priority support',
                  'Deadline reminders',
                  'Document storage',
                  'Interview prep',
                  'Visa guidance',
                  'Success guarantee'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600">
                    <Check className="w-5 h-5 text-[#10b981]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(255, 107, 53, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-[#ff6b35] text-white rounded-lg font-semibold text-lg"
              >
                Get Premium
              </motion.button>
              <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-1">
                <span>💰</span> Average student saves €2500 vs consultants
              </p>
            </motion.div>

            {/* Concierge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-bold text-[#111827] mb-2">Concierge</h3>
              <div className="mb-4">
                <span className="text-5xl font-bold text-[#111827]">€997</span>
              </div>
              <p className="text-gray-600 mb-6">Personal guidance</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Premium',
                  '1-on-1 advisor calls',
                  'Essay review by experts',
                  'Application strategy',
                  'Unlimited revisions'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600">
                    <Check className="w-5 h-5 text-[#10b981]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 bg-[#111827] text-white rounded-lg font-semibold hover:bg-[#1f2937] transition-colors">
                Book a Call
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Urgency/Scarcity */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-amber-600 font-semibold mb-2">
              <Zap className="w-5 h-5" />
              Application deadlines are coming up
            </div>
            <p className="text-gray-600 mb-6">
              Most universities close applications in January. Don't miss your chance.
            </p>
            <motion.button
              whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(255, 107, 53, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#ff6b35] text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2"
            >
              Start your profile now <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fafafa]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-[#111827]">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#111827]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Join 500+ Students Who Already Started
            </h2>
            <p className="text-gray-400 mb-8">
              Takes 2 minutes. No credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
              />
              <motion.button
                whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(255, 107, 53, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#ff6b35] text-white px-8 py-4 rounded-lg font-semibold text-lg whitespace-nowrap"
              >
                Start Free
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <Link href="/" className="text-xl font-bold text-[#111827]">
                EduBridge
              </Link>
              <p className="text-gray-500 text-sm mt-1">Your path to studying abroad</p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-500">
              <Link href="#" className="hover:text-[#111827] transition-colors">About</Link>
              <Link href="#" className="hover:text-[#111827] transition-colors">Blog</Link>
              <Link href="#" className="hover:text-[#111827] transition-colors">Contact</Link>
              <Link href="#" className="hover:text-[#111827] transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-[#111827] transition-colors">Terms</Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Lock className="w-4 h-4" /> Secure
              </span>
              <span className="flex items-center gap-1">
                <CreditCard className="w-4 h-4" /> Stripe
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" /> GDPR
              </span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} EduBridge. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
