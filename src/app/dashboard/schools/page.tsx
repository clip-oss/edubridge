'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MapPin, DollarSign, Users, ExternalLink, GraduationCap, Globe, ChevronDown, ChevronUp, Search, Sparkles, X, Loader2 } from 'lucide-react'
import Link from 'next/link'

const loadingMessages = [
  { progress: 0, text: "Starting search...", tip: "Did you know? Students who apply to 5+ universities have 3x better acceptance rates." },
  { progress: 15, text: "Searching universities...", tip: "Tip: Early applications often have higher acceptance rates." },
  { progress: 30, text: "Analyzing your profile...", tip: "Fun fact: The oldest university in the world is the University of Bologna, founded in 1088." },
  { progress: 50, text: "Matching requirements...", tip: "Tip: A strong motivation letter can make up for slightly lower grades." },
  { progress: 70, text: "Finding best matches...", tip: "Did you know? Many European universities offer programs in English." },
  { progress: 85, text: "Calculating admission chances...", tip: "Tip: Scholarships aren't just for top students - many consider financial need." },
  { progress: 95, text: "Almost done...", tip: "You're doing great! Every step brings you closer to your dream university." },
]

export default function SchoolsPage() {
  const [schools, setSchools] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0])
  const [loadingTime, setLoadingTime] = useState(0)
  const [showForm, setShowForm] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const [expandedSections, setExpandedSections] = useState({
    profile: true,
    grades: false,
    tests: false,
    preferences: false
  })

  // Form state
  const [formData, setFormData] = useState({
    // Profile
    education_level: 'High School',
    country_origin: '',
    interests: '',

    // Grades
    gpa: '',
    gpa_scale: '4.0',
    bacalaureat: '',
    abitur: '',
    a_levels: '',
    ib_score: '',

    // English tests
    ielts: '',
    toefl: '',
    duolingo: '',

    // Standardized tests
    sat: '',
    act: '',

    // Preferences
    budget_min: 0,
    budget_max: 50000,
    preferred_countries: '',
    degree_type: 'Bachelor',
    scholarship_needed: false,
    language_of_instruction: 'English'
  })

  // Progress animation effect
  useEffect(() => {
    if (!loading) {
      setLoadingProgress(0)
      setLoadingTime(0)
      return
    }

    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 95) return prev
        const increment = Math.random() * 3 + 1
        return Math.min(prev + increment, 95)
      })
    }, 500)

    const timeInterval = setInterval(() => {
      setLoadingTime(prev => prev + 1)
    }, 1000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(timeInterval)
    }
  }, [loading])

  // Update loading message based on progress
  useEffect(() => {
    const message = [...loadingMessages].reverse().find(m => loadingProgress >= m.progress)
    if (message) setLoadingMessage(message)
  }, [loadingProgress])

  const cancelSearch = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setLoading(false)
    setShowForm(true)
    setError(null)
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSearch = async () => {
    setLoading(true)
    setShowForm(false)
    setError(null)
    setLoadingProgress(0)

    // Create abort controller for this request
    abortControllerRef.current = new AbortController()

    try {
      const user = JSON.parse(localStorage.getItem('trialUser') || '{}')

      const response = await fetch('https://anaav.app.n8n.cloud/webhook/find-universities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify({
          user_name: user.name || 'Student',
          education_level: formData.education_level,
          country_origin: formData.country_origin,
          interests: formData.interests || user.goal || '',

          gpa: formData.gpa,
          gpa_scale: formData.gpa_scale,
          bacalaureat: formData.bacalaureat,
          abitur: formData.abitur,
          a_levels: formData.a_levels,
          ib_score: formData.ib_score,

          ielts: formData.ielts,
          toefl: formData.toefl,
          duolingo: formData.duolingo,

          sat: formData.sat,
          act: formData.act,

          budget_min: formData.budget_min,
          budget_max: formData.budget_max,
          preferred_countries: formData.preferred_countries,
          degree_type: formData.degree_type,
          scholarship_needed: formData.scholarship_needed,
          language_of_instruction: formData.language_of_instruction
        })
      })

      const data = await response.json()
      setLoadingProgress(100)

      // Handle array response with result.universities
      if (Array.isArray(data) && data[0]?.result?.universities) {
        setSchools(data[0].result.universities)
      } else if (data.result?.universities) {
        setSchools(data.result.universities)
      } else if (data.universities) {
        setSchools(data.universities)
      } else {
        throw new Error('Failed to find universities')
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        // User cancelled - don't show error
        return
      }
      console.error('Error:', error)
      setError('Failed to find universities. Please try again.')
      setShowForm(true)
    } finally {
      setLoading(false)
      abortControllerRef.current = null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link href="/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Find Your Perfect University</h1>
              <p className="text-gray-600">AI-powered matching based on your profile</p>
            </div>
          </div>
        </div>

        {showForm ? (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            {/* Profile Section */}
            <div className="mb-4">
              <button
                onClick={() => toggleSection('profile')}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Your Profile</span>
                </div>
                {expandedSections.profile ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>

              {expandedSections.profile && (
                <div className="p-4 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Education Level</label>
                      <select
                        name="education_level"
                        value={formData.education_level}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option>High School</option>
                        <option>Bachelor&apos;s Degree</option>
                        <option>Master&apos;s Degree</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Country of Origin</label>
                      <input
                        type="text"
                        name="country_origin"
                        value={formData.country_origin}
                        onChange={handleInputChange}
                        placeholder="e.g. Romania, Germany"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Field of Interest</label>
                    <input
                      type="text"
                      name="interests"
                      value={formData.interests}
                      onChange={handleInputChange}
                      placeholder="e.g. Computer Science, Medicine, Business"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Grades Section */}
            <div className="mb-4">
              <button
                onClick={() => toggleSection('grades')}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold">Academic Scores</span>
                  <span className="text-xs text-gray-500">(Optional)</span>
                </div>
                {expandedSections.grades ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>

              {expandedSections.grades && (
                <div className="p-4 space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">GPA</label>
                      <input
                        type="text"
                        name="gpa"
                        value={formData.gpa}
                        onChange={handleInputChange}
                        placeholder="e.g. 3.8"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Bacalaureat</label>
                      <input
                        type="text"
                        name="bacalaureat"
                        value={formData.bacalaureat}
                        onChange={handleInputChange}
                        placeholder="e.g. 9.5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">IB Score</label>
                      <input
                        type="text"
                        name="ib_score"
                        value={formData.ib_score}
                        onChange={handleInputChange}
                        placeholder="e.g. 38"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">A-Levels</label>
                      <input
                        type="text"
                        name="a_levels"
                        value={formData.a_levels}
                        onChange={handleInputChange}
                        placeholder="e.g. AAA"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Abitur</label>
                      <input
                        type="text"
                        name="abitur"
                        value={formData.abitur}
                        onChange={handleInputChange}
                        placeholder="e.g. 1.3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tests Section */}
            <div className="mb-4">
              <button
                onClick={() => toggleSection('tests')}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">Test Scores</span>
                  <span className="text-xs text-gray-500">(Optional)</span>
                </div>
                {expandedSections.tests ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>

              {expandedSections.tests && (
                <div className="p-4 space-y-4">
                  <p className="text-sm text-gray-600 mb-2">English Proficiency</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">IELTS</label>
                      <input
                        type="text"
                        name="ielts"
                        value={formData.ielts}
                        onChange={handleInputChange}
                        placeholder="e.g. 7.5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">TOEFL</label>
                      <input
                        type="text"
                        name="toefl"
                        value={formData.toefl}
                        onChange={handleInputChange}
                        placeholder="e.g. 100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Duolingo</label>
                      <input
                        type="text"
                        name="duolingo"
                        value={formData.duolingo}
                        onChange={handleInputChange}
                        placeholder="e.g. 120"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 mt-4">Standardized Tests</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">SAT</label>
                      <input
                        type="text"
                        name="sat"
                        value={formData.sat}
                        onChange={handleInputChange}
                        placeholder="e.g. 1450"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">ACT</label>
                      <input
                        type="text"
                        name="act"
                        value={formData.act}
                        onChange={handleInputChange}
                        placeholder="e.g. 32"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Preferences Section */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection('preferences')}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold">Preferences</span>
                </div>
                {expandedSections.preferences ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>

              {expandedSections.preferences && (
                <div className="p-4 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Preferred Countries</label>
                      <input
                        type="text"
                        name="preferred_countries"
                        value={formData.preferred_countries}
                        onChange={handleInputChange}
                        placeholder="e.g. UK, Netherlands, Germany"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Degree Type</label>
                      <select
                        name="degree_type"
                        value={formData.degree_type}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option>Bachelor</option>
                        <option>Master</option>
                        <option>PhD</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Budget Range: ${formData.budget_min.toLocaleString()} - ${formData.budget_max.toLocaleString()}/year
                    </label>
                    <input
                      type="range"
                      name="budget_max"
                      min="0"
                      max="100000"
                      step="5000"
                      value={formData.budget_max}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="scholarship_needed"
                      checked={formData.scholarship_needed}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <label className="text-sm">I need scholarship/financial aid</label>
                  </div>
                </div>
              )}
            </div>

            <Button
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Find My Universities
            </Button>
          </div>
        ) : (
          <>
            <Button
              onClick={() => setShowForm(true)}
              variant="outline"
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Modify Search
            </Button>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md w-full text-center">
                  {/* Animated Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                      <Search className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Loading Message */}
                  <h3 className="text-lg font-semibold text-[#374151] mb-2">
                    {loadingMessage.text}
                  </h3>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                      style={{ width: `${loadingProgress}%` }}
                    />
                  </div>

                  {/* Progress Percentage */}
                  <p className="text-sm text-gray-500 mb-4">{Math.round(loadingProgress)}% complete</p>

                  {/* Time Estimate */}
                  <p className="text-xs text-gray-400 mb-4">
                    {loadingTime < 60
                      ? 'This usually takes 1-2 minutes'
                      : loadingTime < 180
                        ? `Searching for ${Math.floor(loadingTime / 60)}:${(loadingTime % 60).toString().padStart(2, '0')}...`
                        : 'Taking longer than expected. Please wait...'
                    }
                  </p>

                  {/* Fun Tip */}
                  <div className="bg-[#fffbf5] rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-600 italic">{loadingMessage.tip}</p>
                  </div>

                  {/* Cancel Button */}
                  <Button
                    onClick={cancelSearch}
                    variant="outline"
                    className="text-sm"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel Search
                  </Button>
                </div>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md w-full text-center">
                  <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <X className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#374151] mb-2">Search Failed</h3>
                  <p className="text-sm text-gray-500 mb-4">{error}</p>
                  <Button
                    onClick={() => {
                      setError(null)
                      setShowForm(true)
                    }}
                    className="bg-[#3b82f6] hover:bg-[#2563eb] text-white"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            ) : schools.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {schools.map((school, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="h-3 bg-gradient-to-r from-blue-500 to-purple-600" />
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold">{school.name}</h3>
                          {school.rank && (
                            <span className="text-xs text-gray-500">#{school.rank} Match</span>
                          )}
                        </div>
                        {school.match_percentage && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            {school.match_percentage}%
                          </span>
                        )}
                      </div>

                      {/* Match Type & Admission Chance */}
                      <div className="flex gap-2 mb-3">
                        {school.match_type && (
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            school.match_type === 'Safety' ? 'bg-green-100 text-green-700' :
                            school.match_type === 'Target' ? 'bg-blue-100 text-blue-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {school.match_type}
                          </span>
                        )}
                        {school.admission_chance && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                            {school.admission_chance} Chance
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 mb-4">
                        {school.location && (
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            {school.location}
                          </div>
                        )}
                        {school.tuition_usd && (
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <DollarSign className="w-4 h-4 flex-shrink-0" />
                            ${school.tuition_usd.toLocaleString()}/year
                          </div>
                        )}
                        {school.application_deadline && (
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <span className="w-4 h-4 flex-shrink-0 text-center">📅</span>
                            Deadline: {school.application_deadline}
                          </div>
                        )}
                        {school.english_requirement && (
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <Globe className="w-4 h-4 flex-shrink-0" />
                            {school.english_requirement}
                          </div>
                        )}
                      </div>

                      {/* Scholarship */}
                      {school.scholarship_available && (
                        <div className="mb-3 p-2 bg-yellow-50 rounded-lg">
                          <p className="text-xs font-medium text-yellow-800">💰 {school.scholarship_details || 'Scholarships available'}</p>
                        </div>
                      )}

                      {/* Why Good Fit */}
                      {school.why_good_fit && school.why_good_fit.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Why it&apos;s a good fit:</p>
                          <ul className="space-y-1">
                            {school.why_good_fit.slice(0, 2).map((reason: string, i: number) => (
                              <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                                <span className="text-green-500">✓</span> {reason}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Concerns */}
                      {school.potential_concerns && school.potential_concerns.length > 0 && (
                        <div className="mb-3">
                          {school.potential_concerns.map((concern: string, i: number) => (
                            <p key={i} className="text-xs text-orange-600 flex items-start gap-1">
                              <span>⚠</span> {concern}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Application Tip */}
                      {school.application_tip && (
                        <div className="p-2 bg-blue-50 rounded-lg mb-3">
                          <p className="text-xs text-blue-700">💡 {school.application_tip}</p>
                        </div>
                      )}

                      {school.website ? (
                        <a href={school.website} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            Learn More <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </a>
                      ) : (
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          Learn More <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No universities found. Try adjusting your search criteria.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
