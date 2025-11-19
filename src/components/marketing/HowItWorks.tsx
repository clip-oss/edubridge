'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Create Your Profile',
    description: 'Tell us about your academic background, interests, and goals. Our AI will use this to personalize your experience.'
  },
  {
    number: '02',
    title: 'Match with Schools',
    description: 'Get AI-powered recommendations for schools that fit your profile, budget, and career aspirations.'
  },
  {
    number: '03',
    title: 'Write Your Essays',
    description: 'Use our AI Essay Studio to craft compelling personal statements with real-time feedback and suggestions.'
  },
  {
    number: '04',
    title: 'Apply & Get Accepted',
    description: 'Submit your applications with confidence. We handle document preparation, deadlines, and visa support.'
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Your Journey to Success
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Four simple steps to your dream school
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Number circle */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg z-10">
                  {step.number}
                </div>

                {/* Content */}
                <div className={`ml-24 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:pl-20'}`}>
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
