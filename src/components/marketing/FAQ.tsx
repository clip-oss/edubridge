'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How does the AI essay tool work?',
    answer: 'Our AI analyzes your profile, the school requirements, and successful essays to provide personalized feedback. It helps with structure, grammar, tone, and content suggestions while maintaining your authentic voice.'
  },
  {
    question: 'What if I need help during the process?',
    answer: 'Our AI chatbot is available 24/7 for instant help. Premium and Concierge members also get access to human counselors via scheduled calls and priority email support.'
  },
  {
    question: 'Can I upgrade my plan later?',
    answer: 'Yes! You can upgrade at any time. We&apos;ll pro-rate the difference based on your current subscription. All your previous work and progress will be preserved.'
  },
  {
    question: 'Which countries and schools do you support?',
    answer: 'We support applications to over 150 universities across the US, UK, Canada, Australia, and Europe. Our database includes Ivy League schools, Oxbridge, and top schools in each region.'
  },
  {
    question: 'How accurate is the school matching?',
    answer: 'Our AI has been trained on thousands of successful applications. On average, students who follow our recommendations get accepted to 3 out of their top 5 matched schools.'
  },
  {
    question: 'Do you help with scholarships?',
    answer: 'Yes! Our Scholarship Finder identifies opportunities you qualify for based on your profile. Premium members get help with scholarship essays, and Concierge members get full application assistance.'
  }
];

export function FAQ() {
  return (
    <section className="py-24 bg-white" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Everything you need to know
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
