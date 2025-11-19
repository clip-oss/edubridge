'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  Upload,
  MessageCircle,
  CheckCircle2,
  Clock,
  Circle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const progressSteps = [
  { name: 'Profile Created', completed: true },
  { name: 'Schools Selected (3/5)', completed: true },
  { name: 'Essay In Progress', completed: false, inProgress: true },
  { name: 'Documents Pending', completed: false },
  { name: 'Submit Application', completed: false },
];

const quickActions = [
  { name: 'Continue Essay', icon: FileText, href: '/application/essays', color: 'bg-blue-100 text-blue-600' },
  { name: 'Upload Document', icon: Upload, href: '/application/documents', color: 'bg-green-100 text-green-600' },
  { name: 'Get Help', icon: MessageCircle, href: '#', color: 'bg-purple-100 text-purple-600' },
];

const recentActivity = [
  { text: 'Essay feedback received', time: '2 hours ago' },
  { text: 'New school match found', time: 'Yesterday' },
  { text: 'Document uploaded: Transcript.pdf', time: '2 days ago' },
];

export default function DashboardPage() {
  const completedSteps = progressSteps.filter(s => s.completed).length;
  const progressPercent = (completedSteps / progressSteps.length) * 100;

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-gray-600">Here&apos;s your application progress</p>
      </motion.div>

      {/* Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Application Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">{Math.round(progressPercent)}% Complete</span>
                <span className="text-gray-500">{completedSteps}/{progressSteps.length} steps</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>

            <ul className="space-y-3">
              {progressSteps.map((step, index) => (
                <li key={index} className="flex items-center gap-3">
                  {step.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : step.inProgress ? (
                    <Clock className="w-5 h-5 text-orange-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                  <span className={step.completed ? 'text-gray-900' : 'text-gray-500'}>
                    {step.name}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link key={action.name} href={action.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${action.color}`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <span className="font-medium">{action.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentActivity.map((activity, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
