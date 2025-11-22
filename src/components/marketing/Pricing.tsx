'use client'

import { motion } from 'framer-motion'
import { Check, PaperPlane, Rocket, Crown } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Explorer',
    subtitle: 'Free',
    price: 0,
    description: 'Perfect to get started',
    icon: PaperPlane,
    features: [
      '3 University matches',
      '2 Essay reviews/month',
      'Basic profile builder',
      'Community support',
    ],
    cta: 'Start Exploring →',
    href: '/auth/signup',
    popular: false,
    gradient: 'from-zinc-600 to-zinc-700',
  },
  {
    name: 'Achiever',
    subtitle: 'Premium',
    price: 597,
    description: 'Everything you need to get accepted',
    icon: Rocket,
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
    cta: 'Become an Achiever →',
    href: '/auth/signup?plan=premium',
    popular: true,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'VIP',
    subtitle: 'Concierge',
    price: 997,
    description: 'White-glove service',
    icon: Crown,
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
    cta: 'Go VIP →',
    href: '/auth/signup?plan=concierge',
    popular: false,
    gradient: 'from-amber-500 to-orange-500',
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4"
          >
            Choose Your Path
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-600 max-w-2xl mx-auto"
          >
            Start free, upgrade when you're ready
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
              className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`h-full rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-white shadow-2xl border-2 border-emerald-500'
                  : 'bg-white shadow-lg border border-zinc-200'
              }`}>
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4`}>
                  <plan.icon className="w-6 h-6 text-white" />
                </div>

                {/* Plan name */}
                <h3 className="text-xl font-bold text-zinc-900">{plan.name}</h3>
                <p className="text-sm text-zinc-500 mb-4">{plan.subtitle}</p>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-4xl font-bold text-zinc-900">
                    ${plan.price}
                  </span>
                  <span className="text-zinc-500 ml-1">USD</span>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-600 mb-6">{plan.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-500" />
                      <span className="text-sm text-zinc-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href={plan.href}
                  className={`block w-full py-3.5 px-4 text-center font-semibold rounded-xl transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/30'
                      : 'bg-zinc-900 text-white hover:bg-zinc-800'
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
