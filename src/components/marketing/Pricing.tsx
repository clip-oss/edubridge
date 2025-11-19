'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PRICING_TIERS } from '@/lib/constants'

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-xl text-gray-600">Transparent pricing, no hidden fees</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl ${
                tier.popular
                  ? 'bg-blue-600 text-white scale-105 shadow-2xl'
                  : 'bg-gray-50 hover:shadow-lg transition-shadow'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className={`text-sm mb-6 ${tier.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                {tier.description}
              </p>

              <div className="mb-6">
                <span className="text-5xl font-bold">${tier.price}</span>
                <span className={`ml-2 ${tier.popular ? 'text-blue-100' : 'text-gray-600'}`}>USD</span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.popular ? 'text-blue-200' : 'text-green-500'}`} />
                    <span className={tier.popular ? 'text-blue-50' : 'text-gray-700'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/trial">
                <Button
                  className={`w-full py-6 text-lg ${
                    tier.popular
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Start Free Trial
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-gray-600 mt-12 text-sm">
          <span className="font-medium">Add-ons available:</span> Extra applications ($99), Essay rush review ($149), Visa fast-track ($199)
        </p>
      </div>
    </section>
  )
}
