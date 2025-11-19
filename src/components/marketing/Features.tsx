'use client';

import { motion } from 'framer-motion';
import {
  PenTool,
  School,
  FileCheck,
  MessageCircle,
  Award,
  Home
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: PenTool,
    title: 'AI Essay Studio',
    description: 'Get personalized essay prompts, AI-powered feedback, and writing suggestions to craft compelling narratives.'
  },
  {
    icon: School,
    title: 'Smart School Matching',
    description: 'Our AI analyzes your profile to find the perfect schools based on your goals, budget, and preferences.'
  },
  {
    icon: FileCheck,
    title: 'Visa Copilot',
    description: 'Step-by-step visa guidance with automated document checklists and deadline reminders.'
  },
  {
    icon: MessageCircle,
    title: '24/7 AI Support',
    description: 'Get instant answers to your questions anytime with our intelligent chatbot assistant.'
  },
  {
    icon: Award,
    title: 'Scholarship Finder',
    description: 'Discover scholarships you qualify for and get help with applications to fund your education.'
  },
  {
    icon: Home,
    title: 'Housing Assistance',
    description: 'Find safe, affordable housing near your university with our verified listings and guidance.'
  }
];

export function Features() {
  return (
    <section className="py-24 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Why Choose EduBridge?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Everything you need to successfully apply to schools abroad, powered by AI
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
