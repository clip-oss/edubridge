'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PRICING_TIERS } from '@/lib/constants';

export function Pricing() {
  return (
    <section className="py-24 bg-gray-50" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Choose Your Plan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Transparent pricing, no hidden fees
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={tier.popular ? 'md:-mt-4 md:mb-4' : ''}
            >
              <Card
                className={`relative p-8 h-full flex flex-col ${
                  tier.popular
                    ? 'border-2 border-blue-500 shadow-xl'
                    : 'border border-gray-200'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-gray-600 text-sm">{tier.description}</p>
                </div>

                <div className="mb-8">
                  <span className="text-5xl font-bold">${tier.price}</span>
                  <span className="text-gray-600 ml-2">USD</span>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/signup">
                  <Button
                    className={`w-full py-6 text-lg rounded-xl ${
                      tier.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200'
                    }`}
                  >
                    Get Started
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-gray-600"
        >
          <p className="text-sm">
            <span className="font-medium">Add-ons available:</span> Extra applications ($99),
            Essay rush review ($149), Visa fast-track ($199)
          </p>
        </motion.div>
      </div>
    </section>
  );
}
