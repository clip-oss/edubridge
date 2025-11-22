'use client'

// WINDOW LOCK - only initialize if it doesn't exist (don't reset!)
if (typeof window !== 'undefined' && (window as any).__edubridge_search_lock__ === undefined) {
  (window as any).__edubridge_search_lock__ = false
}

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function UniversityFinder() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [error, setError] = useState('')
  const hasSearched = useRef(false)

  const handleSearch = async () => {
    // WINDOW LOCK - strongest possible lock
    if (typeof window !== 'undefined') {
      if ((window as any).__edubridge_search_lock__) {
        console.log('WINDOW LOCK - BLOCKED')
        return
      }
      (window as any).__edubridge_search_lock__ = true
    }

    // REF LOCK - backup
    if (hasSearched.current || isLoading) {
      console.log('REF LOCK - BLOCKED')
      return
    }
    hasSearched.current = true

    setIsLoading(true)
    setError('')

    console.log('=== SEARCH STARTED ===')

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      let profile: any = null
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        profile = data
      }

      // Parse test_scores if available
      const testScores = profile?.test_scores || []
      const getTestScore = (name: string) => {
        const test = testScores.find((t: any) =>
          t.test_name?.toLowerCase().includes(name.toLowerCase()) ||
          t.name?.toLowerCase().includes(name.toLowerCase())
        )
        return test?.score || test?.value || ''
      }

      const requestBody = {
        user_name: profile?.full_name || 'Student',
        education_level: profile?.education_level || 'High School',
        country_origin: profile?.country_origin || 'Moldova',
        interests: profile?.fields_of_interest || 'business',
        gpa: profile?.grade_value?.toString() || '8',
        gpa_scale: profile?.grade_scale || '10',
        bacalaureat: getTestScore('bacalaureat') || getTestScore('bac') || '',
        ielts: getTestScore('ielts') || '',
        toefl: getTestScore('toefl') || '',
        sat: getTestScore('sat') || '',
        budget_min: profile?.budget_min || 0,
        budget_max: profile?.budget_max || 50000,
        preferred_countries: Array.isArray(profile?.preferred_countries)
          ? profile.preferred_countries.join(', ')
          : profile?.preferred_countries || '',
        degree_type: profile?.degree_type || 'Bachelor',
        scholarship_needed: profile?.scholarship_needed || false,
        language_of_instruction: 'English'
      }

      console.log('Sending request:', requestBody)

      // Set up 3-minute timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        console.log('Request timeout after 3 minutes')
        controller.abort()
      }, 180000) // 3 minutes

      try {
        const response = await fetch('https://anaav.app.n8n.cloud/webhook/find-universities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          mode: 'cors',
          signal: controller.signal,
          body: JSON.stringify(requestBody)
        })

        clearTimeout(timeoutId)
        console.log('Response:', response.status, response.statusText)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Error response:', errorText)
        throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
      }

      const text = await response.text()
      console.log('Raw response:', text.substring(0, 200))

      const data = JSON.parse(text)
      console.log('Data parsed:', data)

      let universities: any[] = []
      if (Array.isArray(data) && data[0]?.result?.universities) {
        universities = data[0].result.universities
      } else if (data?.result?.universities) {
        universities = data.result.universities
      } else if (data?.universities) {
        universities = data.universities
      }

      console.log('Found universities:', universities.length)
      setResults(universities)
      sessionStorage.setItem('university_results', JSON.stringify(universities))

      } catch (fetchErr: any) {
        clearTimeout(timeoutId)
        if (fetchErr.name === 'AbortError') {
          throw new Error('Request timed out after 3 minutes')
        }
        throw fetchErr
      }

    } catch (err: any) {
      console.error('Search error:', err)
      setError(err.message || 'Search failed')
    } finally {
      setIsLoading(false)
      hasSearched.current = false
      if (typeof window !== 'undefined') {
        (window as any).__edubridge_search_lock__ = false
      }
      console.log('=== SEARCH COMPLETED ===')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link href="/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-2">Find Your Perfect University</h1>
        <p className="text-gray-600 mb-8">AI-powered matching based on your profile</p>

        {/* Simple button - no form */}
        <button
          type="button"
          disabled={isLoading}
          onClick={handleSearch}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Searching... (this takes 1-2 minutes)
            </span>
          ) : (
            'Find My Universities'
          )}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Found {results.length} Universities</h2>
            <div className="grid gap-4">
              {results.map((uni, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{uni.name}</h3>
                    {uni.match_percentage && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {uni.match_percentage}% match
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{uni.location}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    {uni.tuition_usd && (
                      <span className="text-gray-500">
                        💰 ${uni.tuition_usd.toLocaleString()}/year
                      </span>
                    )}
                    {uni.admission_chance && (
                      <span className="text-gray-500">
                        📊 {uni.admission_chance} chance
                      </span>
                    )}
                    {uni.match_type && (
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        uni.match_type === 'Safety' ? 'bg-green-100 text-green-700' :
                        uni.match_type === 'Target' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {uni.match_type}
                      </span>
                    )}
                  </div>
                  {uni.why_good_fit && uni.why_good_fit.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs font-medium text-gray-700 mb-1">Why it's a good fit:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {uni.why_good_fit.slice(0, 2).map((reason: string, j: number) => (
                          <li key={j} className="flex items-start gap-1">
                            <span className="text-green-500">✓</span> {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {uni.website && (
                    <a
                      href={uni.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Visit Website →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && results.length === 0 && !error && (
          <p className="mt-8 text-center text-gray-500">
            Click the button above to find universities that match your profile.
          </p>
        )}
      </div>
    </div>
  )
}
