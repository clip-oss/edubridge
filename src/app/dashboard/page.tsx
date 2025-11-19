'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Target, FileCheck, MessageSquare, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string; country: string; goal: string } | null>(null)
  const [progress] = useState(15)

  useEffect(() => {
    // Check if user has trial access
    const trialUser = localStorage.getItem('trialUser')
    const trialActive = localStorage.getItem('trialActive')

    if (!trialUser || trialActive !== 'true') {
      router.push('/trial')
      return
    }

    setUser(JSON.parse(trialUser))
  }, [router])

  if (!user) return null

  const quickActions = [
    {
      icon: BookOpen,
      title: 'Write Your Essay',
      description: 'Get AI feedback on your personal statement',
      color: 'bg-blue-500',
      link: '/dashboard/essay'
    },
    {
      icon: Target,
      title: 'Find Schools',
      description: 'Discover universities that match your profile',
      color: 'bg-purple-500',
      link: '/dashboard/schools'
    },
    {
      icon: FileCheck,
      title: 'Check Visa Requirements',
      description: 'Get your personalized visa checklist',
      color: 'bg-green-500',
      link: '#'
    },
    {
      icon: MessageSquare,
      title: 'Ask AI Assistant',
      description: 'Get instant answers to your questions',
      color: 'bg-orange-500',
      link: '#'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Trial Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-sm">
            <Sparkles className="w-4 h-4 inline mr-2" />
            You&apos;re on a 7-day free trial - Upgrade anytime to unlock full features
          </p>
          <Button size="sm" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50 border-0">
            Upgrade Now
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Let&apos;s continue building your application</p>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Application Progress</h2>
            <span className="text-2xl font-bold text-blue-600">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3 mb-6" />

          <div className="grid md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600">✓</span>
              </div>
              <span className="text-sm">Profile Created</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-xs">0/5</span>
              </div>
              <span className="text-sm">Schools Selected</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">○</span>
              </div>
              <span className="text-sm text-gray-500">Essay Draft</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">○</span>
              </div>
              <span className="text-sm text-gray-500">Submit</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.title}
                  href={action.link}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 text-left group block"
                >
                  <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                  <span className="text-blue-600 text-sm flex items-center gap-1">
                    Try now <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
              <div>
                <p className="font-medium">Profile created successfully</p>
                <p className="text-sm text-gray-500">Just now</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
              <div>
                <p className="font-medium">School matches available</p>
                <p className="text-sm text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
              <div>
                <p className="font-medium">Trial started - 7 days remaining</p>
                <p className="text-sm text-gray-500">5 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
