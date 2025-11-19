'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function TrialPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    goal: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Save to localStorage (no database needed)
    localStorage.setItem('trialUser', JSON.stringify(formData))
    localStorage.setItem('trialActive', 'true')
    localStorage.setItem('trialStartDate', new Date().toISOString())

    // Redirect to dashboard
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center py-20 px-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduBridge
            </span>
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            7-Day Free Trial - No Credit Card Required
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Start Your Free Trial
          </h1>
          <p className="text-xl text-gray-600">
            Experience the full platform - cancel anytime
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select your country</option>
                <option value="moldova">Moldova</option>
                <option value="romania">Romania</option>
                <option value="poland">Poland</option>
                <option value="ukraine">Ukraine</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">What&apos;s your goal?</label>
              <textarea
                placeholder="I want to study Computer Science at a top UK university..."
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg">
              Start My Free Trial <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <p className="text-center text-sm text-gray-500">
              By starting your trial, you agree to our Terms of Service and Privacy Policy
            </p>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-semibold mb-4">What&apos;s included in your trial:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Full access to AI Essay Studio</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>School matching for 20+ universities</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Visa document checklist</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>AI chatbot support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
