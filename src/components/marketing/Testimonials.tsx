'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Maria Popescu',
    school: 'Oxford University',
    country: 'Romania → UK',
    text: 'EduBridge helped me get into Oxford with a full scholarship. The AI essay feedback was incredible, and my counselor knew exactly how to position my application.',
    rating: 5
  },
  {
    name: 'Alexandru Ionescu',
    school: 'MIT',
    country: 'Moldova → USA',
    text: 'I was overwhelmed by the application process until I found EduBridge. They simplified everything and I got accepted to my dream school with financial aid!',
    rating: 5
  },
  {
    name: 'Elena Kowalski',
    school: 'ETH Zurich',
    country: 'Poland → Switzerland',
    text: "The visa guidance alone was worth it. EduBridge made sure I had every document perfect, and I got my visa on the first try. Now I'm studying engineering at ETH!",
    rating: 5
  }
]

export function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600">From our students who made it</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.school}</p>
                  <p className="text-xs text-gray-500">{testimonial.country}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
