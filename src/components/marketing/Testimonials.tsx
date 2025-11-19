'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    quote: "EduBridge helped me get into Oxford with a full scholarship. The AI essay feedback was incredibly helpful and the counselors were always available.",
    name: 'Maria Popescu',
    origin: 'Romania',
    school: 'Oxford University, UK',
    image: null
  },
  {
    quote: "I was lost in the visa process until EduBridge&apos;s Visa Copilot guided me step by step. Now I&apos;m studying at MIT!",
    name: 'Ahmed Hassan',
    origin: 'Egypt',
    school: 'MIT, USA',
    image: null
  },
  {
    quote: "The school matching was spot on. I got accepted to my top 3 choices. The Concierge package was worth every penny.",
    name: 'Ana Ivanova',
    origin: 'Moldova',
    school: 'LSE, UK',
    image: null
  }
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Success Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100"
          >
            From our students who made it
          </motion.p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-8 md:p-12"
            >
              <Quote className="w-12 h-12 text-blue-200 mb-6" />
              <p className="text-xl md:text-2xl text-gray-800 mb-8 leading-relaxed">
                &quot;{testimonials[current].quote}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400" />
                <div>
                  <p className="font-semibold text-gray-900">{testimonials[current].name}</p>
                  <p className="text-sm text-gray-600">
                    {testimonials[current].origin} → {testimonials[current].school}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === current ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
