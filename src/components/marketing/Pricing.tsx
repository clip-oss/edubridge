'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Get started',
    features: [
      '3 University matches',
      '2 Essay reviews/month',
      'Basic profile',
      'Community support',
    ],
    cta: 'Start free',
    href: '/auth/signup',
    featured: false,
  },
  {
    name: 'Premium',
    price: 597,
    description: 'Most popular',
    features: [
      'Unlimited matches',
      'Unlimited essays',
      'AI feedback',
      'Visa navigator',
      'Deadline tracking',
      'Scholarship finder',
      'Priority support',
      'Strategy call',
    ],
    cta: 'Get Premium',
    href: '/auth/signup?plan=premium',
    featured: true,
  },
  {
    name: 'Concierge',
    price: 997,
    description: 'Full service',
    features: [
      'Everything in Premium',
      'Personal counselor',
      'Essay editing',
      'Document prep',
      'Interview coaching',
      'Visa support',
      '24/7 support',
    ],
    cta: 'Get Concierge',
    href: '/auth/signup?plan=concierge',
    featured: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-32 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-violet-600 mb-4"
          >
            PRICING
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900"
          >
            Simple pricing
          </motion.h2>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                plan.featured
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xs font-medium rounded-full">
                    Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-lg font-semibold ${plan.featured ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.featured ? 'text-slate-400' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.featured ? 'text-white' : 'text-slate-900'}`}>
                  ${plan.price}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      plan.featured ? 'text-violet-400' : 'text-violet-500'
                    }`} />
                    <span className={`text-sm ${plan.featured ? 'text-slate-300' : 'text-slate-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block w-full py-3 text-center font-medium rounded-full transition-all ${
                  plan.featured
                    ? 'bg-white text-slate-900 hover:bg-slate-100'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
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
