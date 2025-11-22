'use client'

import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Get started with basic tools',
    features: [
      '3 University matches',
      '2 Essay reviews/month',
      'Basic profile builder',
      'Community support',
    ],
    cta: 'Get Started',
    href: '/auth/signup',
    popular: false,
  },
  {
    name: 'Premium',
    price: 597,
    description: 'Everything you need to succeed',
    features: [
      'Unlimited matches',
      'Unlimited essay reviews',
      'AI-powered feedback',
      'Visa navigator',
      'Application tracker',
      'Scholarship finder',
      'Priority support',
      '1 strategy call',
    ],
    cta: 'Go Premium',
    href: '/auth/signup?plan=premium',
    popular: true,
  },
  {
    name: 'Concierge',
    price: 997,
    description: 'Done-for-you service',
    features: [
      'Everything in Premium',
      'Personal counselor',
      'Essay editing',
      'Document prep',
      'Interview coaching',
      'Visa support',
      '24/7 support',
      'University liaison',
    ],
    cta: 'Contact Us',
    href: '/auth/signup?plan=concierge',
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Choose the plan that fits your needs. No hidden fees, cancel anytime.
          </motion.p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl ${
                plan.popular
                  ? 'bg-gradient-to-br from-violet-600 to-blue-600 p-[2px] shadow-2xl shadow-purple-500/20 scale-105 z-10'
                  : ''
              }`}
            >
              <div className={`h-full rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 border-2 border-slate-200 hover:border-slate-300 transition-colors'
              }`}>
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold rounded-full shadow-lg">
                      <Star className="w-4 h-4 fill-current" />
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>

                {/* Description */}
                <p className={`text-sm mb-6 ${plan.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                    ${plan.price}
                  </span>
                  <span className={`ml-2 ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                    USD
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.popular ? 'text-purple-400' : 'text-green-500'
                      }`} />
                      <span className={`text-sm ${plan.popular ? 'text-slate-300' : 'text-slate-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href={plan.href}
                  className={`block w-full py-3.5 px-4 text-center font-semibold rounded-xl transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/30'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
