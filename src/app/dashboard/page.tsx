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
      color: 'bg-[#3b82f6]',
      link: '/dashboard/essay'
    },
    {
      icon: Target,
      title: 'Find Schools',
      description: 'Discover universities that match your profile',
      color: 'bg-[#a78bfa]',
      link: '/dashboard/schools'
    },
    {
      icon: FileCheck,
      title: 'Check Visa Requirements',
      description: 'Get your personalized visa checklist',
      color: 'bg-[#34d399]',
      link: '#'
    },
    {
      icon: MessageSquare,
      title: 'Ask AI Assistant',
      description: 'Get instant answers to your questions',
      color: 'bg-[#ff8a65]',
      link: '#'
    }
  ]

  return (
    <div>
      {/* Trial Banner */}
      <div className="bg-gradient-to-r from-[#3b82f6] to-[#a78bfa] text-white py-3 px-6 rounded-2xl mb-6">
        <div className="flex items-center justify-between">
          <p className="text-sm">
            <Sparkles className="w-4 h-4 inline mr-2" />
            You&apos;re on a 7-day free trial - Upgrade anytime to unlock full features
          </p>
          <Button size="sm" className="bg-white text-[#3b82f6] hover:bg-white/90 border-0 rounded-xl">
            Upgrade Now
          </Button>
        </div>
      </div>

      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#374151] mb-2">Welcome back, {user.name}!</h1>
        <p className="text-gray-500">Let&apos;s continue building your application</p>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#374151]">Your Application Progress</h2>
          <span className="text-2xl font-bold text-[#3b82f6]">{progress}%</span>
        </div>
        <Progress value={progress} className="h-3 mb-6" />

        <div className="grid md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#34d399]/20 flex items-center justify-center">
              <span className="text-[#34d399]">✓</span>
            </div>
            <span className="text-sm text-[#374151]">Profile Created</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#3b82f6]/20 flex items-center justify-center">
              <span className="text-[#3b82f6] text-xs font-medium">0/5</span>
            </div>
            <span className="text-sm text-[#374151]">Schools Selected</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">○</span>
            </div>
            <span className="text-sm text-gray-400">Essay Draft</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">○</span>
            </div>
            <span className="text-sm text-gray-400">Submit</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#374151] mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.title}
                href={action.link}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left group block"
              >
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-[#374151] mb-2">{action.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{action.description}</p>
                <span className="text-[#3b82f6] text-sm flex items-center gap-1 font-medium">
                  Try now <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
        <h2 className="text-xl font-semibold text-[#374151] mb-6">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
            <div className="w-2 h-2 rounded-full bg-[#3b82f6] mt-2" />
            <div>
              <p className="font-medium text-[#374151]">Profile created successfully</p>
              <p className="text-sm text-gray-400">Just now</p>
            </div>
          </div>
          <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
            <div className="w-2 h-2 rounded-full bg-[#34d399] mt-2" />
            <div>
              <p className="font-medium text-[#374151]">School matches available</p>
              <p className="text-sm text-gray-400">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-2 h-2 rounded-full bg-[#a78bfa] mt-2" />
            <div>
              <p className="font-medium text-[#374151]">Trial started - 7 days remaining</p>
              <p className="text-sm text-gray-400">5 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
