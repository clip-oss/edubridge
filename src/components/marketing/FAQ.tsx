'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Is this really free to start?',
    answer: 'Yes! Our Free plan includes 3 university matches, 2 essay reviews per month, and access to our community. You can upgrade anytime for more features.',
  },
  {
    question: 'How is this different from a consultant?',
    answer: 'Traditional consultants charge $3000+ and have limited availability. EduBridge provides 24/7 AI-powered guidance at a fraction of the cost, while being more comprehensive and always available.',
  },
  {
    question: 'What countries do you support?',
    answer: 'We support applications to universities in 50+ countries including USA, UK, Germany, Netherlands, Canada, Australia, and more. Our AI is trained on requirements for each country.',
  },
  {
    question: 'How does the AI matching work?',
    answer: 'Our AI analyzes your academic profile, interests, budget, and goals against 1000+ university programs. It considers acceptance rates, costs, program fit, and career outcomes to find your best matches.',
  },
  {
    question: 'Can I get a refund?',
    answer: 'Yes, we offer a 14-day money-back guarantee on all paid plans. If you\'re not satisfied, contact us for a full refund.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-zinc-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-50 transition-colors"
              >
                <span className="font-medium text-zinc-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-zinc-500 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-zinc-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
