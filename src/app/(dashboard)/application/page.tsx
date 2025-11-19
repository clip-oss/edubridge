'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  User,
  GraduationCap,
  FileText,
  FolderOpen,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const sections = [
  {
    name: 'Profile',
    description: 'Your personal and academic information',
    icon: User,
    href: '/application/profile',
    status: 'Complete',
    statusColor: 'text-green-600 bg-green-50'
  },
  {
    name: 'Schools',
    description: 'View matches and manage applications',
    icon: GraduationCap,
    href: '/application/schools',
    status: '3 Selected',
    statusColor: 'text-blue-600 bg-blue-50'
  },
  {
    name: 'Essays',
    description: 'Write and get AI feedback on essays',
    icon: FileText,
    href: '/application/essays',
    status: 'In Progress',
    statusColor: 'text-orange-600 bg-orange-50'
  },
  {
    name: 'Documents',
    description: 'Upload transcripts and certificates',
    icon: FolderOpen,
    href: '/application/documents',
    status: '2/5 Uploaded',
    statusColor: 'text-purple-600 bg-purple-50'
  },
  {
    name: 'Timeline',
    description: 'Deadlines and important dates',
    icon: Calendar,
    href: '/application/timeline',
    status: 'View',
    statusColor: 'text-gray-600 bg-gray-50'
  }
];

export default function ApplicationPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Application Hub</h1>
        <p className="text-gray-600">Manage all aspects of your application</p>
      </motion.div>

      <div className="grid gap-4">
        {sections.map((section, index) => (
          <motion.div
            key={section.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={section.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{section.name}</h3>
                    <p className="text-sm text-gray-500">{section.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${section.statusColor}`}>
                    {section.status}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
