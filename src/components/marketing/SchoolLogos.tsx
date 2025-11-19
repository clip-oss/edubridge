'use client';

import { motion } from 'framer-motion';

const schools = [
  'Harvard', 'Oxford', 'MIT', 'Stanford', 'Cambridge',
  'Yale', 'Princeton', 'Columbia', 'LSE', 'UCL',
  'Imperial', 'ETH Zurich', 'Toronto', 'McGill', 'Melbourne'
];

export function SchoolLogos() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p className="text-center text-gray-600 font-medium">
          Students accepted to top universities worldwide
        </p>
      </div>

      <div className="relative">
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex gap-12 items-center"
          >
            {[...schools, ...schools].map((school, index) => (
              <div
                key={`${school}-${index}`}
                className="flex-shrink-0 px-6 py-3 bg-gray-100 rounded-lg text-gray-600 font-medium hover:bg-gray-200 transition-colors"
              >
                {school}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
