'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

// Global lock to prevent double calls
let isSearching = false

export default function UniversityFinder() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [error, setError] = useState('')

  const handleSearch = async () => {
    // Global lock check
    if (isSearching) {
      console.log('BLOCKED - already searching')
      return
    }
    isSearching = true

    if (isLoading) return
    setIsLoading(true)
    setError('')
    setResults([])

    try {
      // Get profile from Supabase
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single()

      const requestBody = {
        user_name: profile?.full_name || 'Student',
        education_level: profile?.education_level || 'High School',
        country_origin: profile?.country || 'Moldova',
        interests: profile?.interests || 'business',
        gpa: profile?.gpa || '8',
        bacalaureat: '9',
        ielts: '8',
        budget_min: 0,
        budget_max: 50000,
        preferred_countries: profile?.preferred_countries || 'uk, spain',
        degree_type: 'Bachelor',
        language_of_instruction: 'English'
      }

      // STEP 1: Start the search
      console.log('Starting search...')
      const startRes = await fetch('https://anaav.app.n8n.cloud/webhook/start-universities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      if (!startRes.ok) {
        throw new Error(`Failed to start search: ${startRes.status}`)
      }

      const startData = await startRes.json()
      console.log('Job started:', startData)
      const job_id = startData.job_id

      if (!job_id) {
        throw new Error('No job_id returned')
      }

      // STEP 2: Poll for results
      console.log('Polling for results...')
      const maxAttempts = 60 // 60 * 3s = 3 minutes
      const delay = 3000 // 3 seconds

      for (let i = 0; i < maxAttempts; i++) {
        console.log(`Poll attempt ${i + 1}/${maxAttempts}`)
        console.log('Polling URL:', `https://anaav.app.n8n.cloud/webhook/get-universities?job_id=${encodeURIComponent(job_id)}`)

        await new Promise(r => setTimeout(r, delay))

        const pollRes = await fetch(
          `https://anaav.app.n8n.cloud/webhook/get-universities?job_id=${encodeURIComponent(job_id)}`
        )

        console.log('Poll response status:', pollRes.status)

        const pollData = await pollRes.json()
        console.log('Poll result RAW:', JSON.stringify(pollData, null, 2))

        if (pollData.status === 'done') {
          console.log('Results ready!')

          // Extract universities from result
          let universities = []
          if (pollData.result?.universities) {
            universities = pollData.result.universities
          } else if (pollData.result?.result?.universities) {
            universities = pollData.result.result.universities
          } else if (Array.isArray(pollData.result) && pollData.result[0]?.result?.universities) {
            universities = pollData.result[0].result.universities
          }

          setResults(universities)
          return
        }

        if (pollData.status === 'not_found') {
          throw new Error('Invalid job_id')
        }

        // Still processing, continue polling
      }

      throw new Error('Search timed out after 3 minutes')

    } catch (err: any) {
      console.error('Search error:', err)
      setError(err.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
      isSearching = false
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Find Your Perfect University</h1>

      <button
        type="button"
        disabled={isLoading}
        onClick={handleSearch}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg disabled:opacity-50 hover:opacity-90 transition"
      >
        {isLoading ? 'Searching universities... (this takes 1-2 minutes)' : 'Find My Universities'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="mt-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analyzing your profile and searching universities...</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">Found {results.length} Universities</h2>
          {results.map((uni, i) => (
            <div key={i} className="p-6 border rounded-lg hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{uni.name}</h3>
                  <p className="text-gray-600">{uni.location}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {uni.match_percentage}% Match
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Tuition:</span>
                  <span className="ml-2 font-semibold">${uni.tuition_usd}/year</span>
                </div>
                <div>
                  <span className="text-gray-600">Admission Chance:</span>
                  <span className="ml-2 font-semibold">{uni.admission_chance}</span>
                </div>
              </div>
              <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">
                Save to My List →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
