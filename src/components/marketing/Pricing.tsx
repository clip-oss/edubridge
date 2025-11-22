'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '€0',
    description: 'For getting started',
    features: [
      '3 University matches',
      '2 Essay reviews/month',
      'Basic profile',
      'Community support',
      'Email support',
    ],
    cta: 'Start Free',
    href: '/auth/signup',
    color: 'gray',
  },
  {
    name: 'Premium',
    price: '€597',
    description: 'For serious applicants',
    badge: 'POPULAR',
    features: [
      'Unlimited matches',
      'Unlimited essays',
      'AI-powered feedback',
      'Visa navigator',
      'Deadline tracking',
      'Scholarship finder',
      'Priority support',
      'Strategy call',
      'Document review',
      'Interview prep',
    ],
    cta: 'Get Premium',
    href: '/auth/signup?plan=premium',
    color: 'blue',
  },
  {
    name: 'Concierge',
    price: '€997',
    description: 'For VIP treatment',
    features: [
      'Everything in Premium',
      'Personal counselor',
      'Essay editing',
      'Document preparation',
      'Interview coaching',
      'Visa support',
      '24/7 priority support',
      'University liaison',
    ],
    cta: 'Contact Us',
    href: '/auth/signup?plan=concierge',
    color: 'purple',
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Simple Pricing
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.color === 'blue'
                  ? 'bg-gradient-to-b from-[#00d4ff]/10 to-transparent border-2 border-[#00d4ff]/50'
                  : 'bg-[#1a1a2e]/50 border border-white/5'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-[#00d4ff] text-black text-xs font-bold rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block w-full py-3 text-center font-medium rounded-full transition-all ${
                  plan.color === 'blue'
                    ? 'bg-[#00d4ff] text-black hover:bg-[#00d4ff]/90 shadow-lg shadow-[#00d4ff]/25'
                    : plan.color === 'purple'
                    ? 'bg-[#a855f7] text-white hover:bg-[#a855f7]/90'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
