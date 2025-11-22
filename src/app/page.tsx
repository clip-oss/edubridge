'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Check,
  Search,
  PenTool,
  ClipboardList,
  ChevronDown,
  Lock,
  MessageCircle,
  Target,
  Plus,
  Minus,
  Sparkles
} from 'lucide-react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const universities = [
    'Oxford', 'MIT', 'TU Munich', 'ETH Zurich', 'Cambridge',
    'Stanford', 'Imperial', 'Sorbonne', 'TU Delft', 'KU Leuven'
  ]

  const faqs = [
    {
      q: "Is it really free to start?",
      a: "Yes! Our free plan gives you access to university matching, basic essay feedback, and application tracking. No credit card needed, no time limits. You can use it forever."
    },
    {
      q: "How does the AI help me?",
      a: "Our AI analyzes your profile against 10,000+ programs to find your best matches. It also reviews your essays instantly, suggesting improvements that admissions officers love."
    },
    {
      q: "What's your success rate?",
      a: "89% of our premium users got into at least one of their top 3 choices! We're really proud of helping students achieve their dreams."
    },
    {
      q: "Can I upgrade later?",
      a: "Of course! Start free and upgrade whenever you're ready. All your data and progress will be saved."
    },
    {
      q: "Do you help with visas too?",
      a: "Yes! Premium users get visa guidance and document checklists for their destination country."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-[#374151]">
              EduBridge
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#how-it-works" className="text-gray-500 hover:text-[#374151] transition-colors">How it works</Link>
              <Link href="#features" className="text-gray-500 hover:text-[#374151] transition-colors">Features</Link>
              <Link href="#pricing" className="text-gray-500 hover:text-[#374151] transition-colors">Pricing</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="text-gray-500 hover:text-[#374151] transition-colors">
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="bg-[#3b82f6] text-white px-4 py-2 rounded-xl font-medium hover:bg-[#2563eb] transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Soft blob backgrounds */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#3b82f6]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#a78bfa]/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-[#3b82f6]/10 text-[#3b82f6] px-4 py-2 rounded-full text-sm font-medium mb-6">
                  🎓 Trusted by 500+ students
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#374151] leading-tight mb-6">
                  Your Dream University Awaits
                </h1>

                <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                  We help students from Moldova & Romania get accepted to top universities worldwide. For free.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] text-[#374151] bg-white"
                  />
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#ff8a65] text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-[#ff8a65]/25"
                  >
                    Get Started - It's Free <Sparkles className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8">
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-[#34d399]" /> Always free to start
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-[#34d399]" /> No credit card
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-[#34d399]" /> Ready in 2 minutes
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#a78bfa] border-2 border-white" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">Join Maria, Alex, and 500+ others</span>
                </div>
              </motion.div>
            </div>

            {/* Right side */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-[#ff8a65]" />
                      <div className="w-3 h-3 rounded-full bg-[#fbbf24]" />
                      <div className="w-3 h-3 rounded-full bg-[#34d399]" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-100 rounded-lg w-3/4" />
                      <div className="h-10 bg-[#3b82f6]/10 rounded-xl" />
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-24 bg-[#34d399]/10 rounded-xl p-3">
                          <div className="text-xs text-[#34d399] font-medium mb-1">Match Rate</div>
                          <div className="text-3xl font-bold text-[#34d399]">94%</div>
                        </div>
                        <div className="h-24 bg-[#a78bfa]/10 rounded-xl p-3">
                          <div className="text-xs text-[#a78bfa] font-medium mb-1">Programs</div>
                          <div className="text-3xl font-bold text-[#a78bfa]">127</div>
                        </div>
                      </div>
                      <div className="h-4 bg-gray-100 rounded-lg w-1/2" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-8 bg-[#fffbf5] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <span className="text-sm font-medium text-gray-400 whitespace-nowrap">Our students study at:</span>
            <div className="relative flex-1 overflow-hidden">
              <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="flex gap-12 whitespace-nowrap"
              >
                {[...universities, ...universities].map((uni, i) => (
                  <span key={i} className="text-lg font-medium text-gray-300">
                    {uni}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#374151] mb-4">
              How EduBridge Works <Sparkles className="w-8 h-8 inline text-[#fbbf24]" />
            </h2>
            <p className="text-gray-500">Three simple steps to your dream university</p>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 border-t-2 border-dashed border-gray-200 -translate-y-1/2" />

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  icon: "📝",
                  title: "Tell us about yourself",
                  desc: "2-minute profile setup",
                  color: "#3b82f6"
                },
                {
                  step: "2",
                  icon: "🎯",
                  title: "Get matched",
                  desc: "AI finds your perfect universities",
                  color: "#a78bfa"
                },
                {
                  step: "3",
                  icon: "🎉",
                  title: "Get accepted!",
                  desc: "We guide you all the way",
                  color: "#34d399"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative text-center"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 relative z-10"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#374151] mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fffbf5]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#374151] mb-4">
              Everything You Need 💫
            </h2>
            <p className="text-gray-500">Tools designed to help you succeed</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Smart University Finder",
                desc: "Discover universities that match YOUR profile, grades, and dreams",
                color: "#3b82f6"
              },
              {
                icon: PenTool,
                title: "AI Essay Helper",
                desc: "Get instant feedback to write essays that stand out",
                color: "#a78bfa"
              },
              {
                icon: ClipboardList,
                title: "Application Tracker",
                desc: "Never miss a deadline. Stay organized. Stay calm.",
                color: "#34d399"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg"
              >
                <div
                  className="h-1 rounded-full mb-6 -mx-8 -mt-8"
                  style={{ background: `linear-gradient(to right, ${feature.color}, ${feature.color}50)` }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-semibold text-[#374151] mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Success */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#374151] mb-4">
              Where Our Students Are Now 🌍
            </h2>
            <p className="text-gray-500 mb-12">200+ acceptances in 2024 alone</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Oxford', 'MIT', 'TU Munich', 'ETH Zurich', 'Cambridge', 'Stanford', 'Imperial', 'Sorbonne'].map((uni, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-gray-50 rounded-xl p-4 text-sm font-medium text-gray-500"
              >
                {uni}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fffbf5]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#374151] mb-4">
              Simple, Honest Pricing 💝
            </h2>
            <p className="text-gray-500">Choose what works for you</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Free */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-[#374151] mb-2">Free Forever</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold text-[#374151]">€0</span>
              </div>
              <p className="text-gray-500 mb-6 text-sm">Perfect to explore</p>
              <ul className="space-y-3 mb-8">
                {['5 university matches', 'Basic essay feedback', 'Application tracker', 'Email support', 'Community access'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-500 text-sm">
                    <Check className="w-4 h-4 text-[#34d399]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 border-2 border-gray-200 text-[#374151] rounded-xl font-medium hover:bg-gray-50 transition-colors">
                Start Free
              </button>
            </motion.div>

            {/* Premium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border-2 border-[#ff8a65] relative md:-mt-4 md:mb-4 shadow-lg"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff8a65] text-white px-3 py-1 rounded-full text-xs font-medium">
                Most Popular 💫
              </div>
              <h3 className="text-xl font-semibold text-[#374151] mb-2">Premium</h3>
              <div className="mb-1">
                <span className="text-4xl font-bold text-[#374151]">€597</span>
              </div>
              <p className="text-gray-400 mb-6 text-sm">one-time, forever yours</p>
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
                  <li key={i} className="flex items-center gap-2 text-gray-500 text-sm">
                    <Check className="w-4 h-4 text-[#34d399]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-[#ff8a65] text-white rounded-xl font-semibold shadow-lg shadow-[#ff8a65]/25"
              >
                Get Premium
              </motion.button>
              <p className="text-center text-xs text-gray-400 mt-3">
                30-day money-back guarantee
              </p>
            </motion.div>

            {/* Concierge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 border border-[#a78bfa]"
            >
              <h3 className="text-xl font-semibold text-[#374151] mb-2">Concierge</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold text-[#374151]">€997</span>
              </div>
              <p className="text-gray-500 mb-6 text-sm">Personal touch</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Premium',
                  '1-on-1 advisor calls',
                  'Essay review by experts',
                  'Application strategy',
                  'Unlimited revisions'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-500 text-sm">
                    <Check className="w-4 h-4 text-[#34d399]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 bg-[#a78bfa] text-white rounded-xl font-medium hover:bg-[#9061f9] transition-colors">
                Let's Talk
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reassurance */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#3b82f6]/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#374151]">
              We're with you every step 💙
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Lock, text: "Your data is safe", emoji: "🔒" },
              { icon: MessageCircle, text: "Support when you need it", emoji: "💬" },
              { icon: Target, text: "500+ success stories", emoji: "🎯" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-center gap-2 text-[#374151]"
              >
                <span>{item.emoji}</span>
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#374151] mb-4">
              Questions? We've got answers 😊
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-gray-50 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-[#374151]">{faq.q}</span>
                  {openFaq === i ? (
                    <Minus className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-gray-500 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#fffbf5] to-[#fff0e6]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#374151] mb-4">
              Ready to Start Your Journey? 🚀
            </h2>
            <p className="text-gray-500 mb-8">
              Join hundreds of students who turned their dreams into acceptance letters
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff8a65]/50 focus:border-[#ff8a65] text-[#374151] bg-white"
              />
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#ff8a65] text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-[#ff8a65]/25"
              >
                Let's Go!
              </motion.button>
            </div>

            <p className="text-sm text-gray-400">
              Free forever. No credit card. No stress.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <Link href="/" className="text-xl font-bold text-[#374151]">
                EduBridge
              </Link>
              <p className="text-gray-400 text-sm mt-1">Your path to studying abroad</p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-[#374151] transition-colors">About</Link>
              <Link href="#" className="hover:text-[#374151] transition-colors">Blog</Link>
              <Link href="#" className="hover:text-[#374151] transition-colors">Contact</Link>
              <Link href="#" className="hover:text-[#374151] transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-[#374151] transition-colors">Terms</Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-400 mb-2">Made with 💙 for Moldovan & Romanian students</p>
            <p className="text-xs text-gray-300">© {new Date().getFullYear()} EduBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
