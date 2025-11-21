'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function EssayPage() {
  const [essay, setEssay] = useState('')
  const [targetUniversity, setTargetUniversity] = useState('')
  const [essayPrompt, setEssayPrompt] = useState('')
  const [feedback, setFeedback] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleGetFeedback = async () => {
    setLoading(true)
    setFeedback(null)

    try {
      const user = JSON.parse(localStorage.getItem('trialUser') || '{}')

      const response = await fetch('https://anaav.app.n8n.cloud/webhook/essay-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          essay: essay,
          user_name: user.name || 'Student',
          target_university: targetUniversity,
          prompt: essayPrompt,
          interests: user.goal || ''
        })
      })

      const data = await response.json()

      // Use consensus for the main feedback
      if (data.success && data.consensus) {
        setFeedback({
          ...data.consensus,
          judgeA: data.judgeA,
          judgeB: data.judgeB
        })
      } else {
        throw new Error('Failed to get feedback')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to get AI feedback. Please try again.')
    } finally {
      setLoading(false)
    }
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

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Target University</label>
            <input
              type="text"
              value={targetUniversity}
              onChange={(e) => setTargetUniversity(e.target.value)}
              placeholder="e.g. University of Oxford, MIT, Stanford..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Essay Prompt</label>
            <input
              type="text"
              value={essayPrompt}
              onChange={(e) => setEssayPrompt(e.target.value)}
              placeholder="Why do you want to study Computer Science?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
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
            onClick={handleGetFeedback}
            disabled={!essay || !targetUniversity || !essayPrompt || loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
          >
            {loading ? 'Analyzing...' : 'Get AI Feedback'}
          </Button>

          {feedback && (
            <div className="mt-8 space-y-6">
              {/* Overall Score */}
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Overall Score</p>
                <p className="text-5xl font-bold text-blue-600">{feedback.score_overall}/100</p>
              </div>

              {/* Score Breakdown */}
              {feedback.scores_breakdown && (
                <div className="grid grid-cols-5 gap-2">
                  {Object.entries(feedback.scores_breakdown).map(([key, value]) => (
                    <div key={key} className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 capitalize">{key.replace('_', ' ')}</p>
                      <p className="text-lg font-bold text-gray-800">{value as number}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* University Context */}
              {feedback.university_context && (
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h3 className="font-semibold text-blue-700 mb-2">What {targetUniversity} Looks For</h3>
                  <p className="text-sm text-gray-700">{feedback.university_context.what_they_look_for}</p>
                </div>
              )}

              {/* Overall Assessment */}
              {feedback.overall_assessment && (
                <div>
                  <h3 className="font-semibold mb-2">Overall Assessment</h3>
                  <p className="text-gray-700">{feedback.overall_assessment}</p>
                </div>
              )}

              {/* Strengths */}
              {feedback.strengths && feedback.strengths.length > 0 && (
                <div>
                  <h3 className="font-semibold text-green-600 mb-2">✓ Strengths</h3>
                  <ul className="space-y-2">
                    {feedback.strengths.map((s: string, i: number) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-500">•</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Issues */}
              {feedback.issues && feedback.issues.length > 0 && (
                <div>
                  <h3 className="font-semibold text-orange-600 mb-2">⚠ Issues to Fix</h3>
                  {feedback.issues.map((issue: any, i: number) => (
                    <div key={i} className="mb-4 p-4 bg-orange-50 rounded-lg">
                      <p className="text-sm font-medium text-orange-800">{issue.type} - {issue.location}</p>
                      <p className="text-sm text-gray-600 mt-1"><strong>Current:</strong> &quot;{issue.current_text}&quot;</p>
                      <p className="text-sm text-green-700 mt-1"><strong>Better:</strong> &quot;{issue.suggested_rewrite}&quot;</p>
                      <p className="text-xs text-gray-500 mt-1">{issue.reason}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Plan */}
              {feedback.action_plan && feedback.action_plan.length > 0 && (
                <div>
                  <h3 className="font-semibold text-blue-600 mb-2">📋 Action Plan</h3>
                  <ul className="space-y-2">
                    {feedback.action_plan.map((action: string, i: number) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-blue-500 font-bold">{i + 1}.</span>{action}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
