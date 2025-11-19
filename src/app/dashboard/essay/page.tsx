'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Sparkles, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function EssayPage() {
  const [essay, setEssay] = useState('')
  const [feedback, setFeedback] = useState<null | {
    score: number
    strengths: string[]
    improvements: string[]
  }>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (!essay.trim()) return

    setIsAnalyzing(true)

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000))

    setFeedback({
      score: 72,
      strengths: [
        'Strong opening that captures attention',
        'Good use of specific examples',
        'Clear connection to your goals'
      ],
      improvements: [
        'Add more personal reflection on challenges faced',
        'Strengthen the conclusion with future aspirations',
        'Consider varying sentence structure for better flow'
      ]
    })

    setIsAnalyzing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link href="/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI Essay Studio</h1>
              <p className="text-gray-600">Get instant feedback on your personal statement</p>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Your Essay</label>
            <textarea
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              placeholder="Paste your personal statement here..."
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-2">{essay.length} characters</p>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !essay.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
          >
            {isAnalyzing ? 'Analyzing...' : 'Get AI Feedback'}
          </Button>

          {feedback && (
            <div className="mt-8 space-y-6">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <span className="font-semibold">Essay Score</span>
                <span className="text-3xl font-bold text-blue-600">{feedback.score}/100</span>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {feedback.strengths.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {feedback.improvements.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-orange-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
