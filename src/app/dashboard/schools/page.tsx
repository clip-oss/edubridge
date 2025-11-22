'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MapPin, DollarSign, Users, ExternalLink, GraduationCap, Globe, ChevronDown, ChevronUp, Search, Sparkles, X, Loader2, Edit3, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

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
  const [showForm, setShowForm] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [profileLoading, setProfileLoading] = useState(true)
  const [profileComplete, setProfileComplete] = useState(false)
  const [missingFields, setMissingFields] = useState<string[]>([])
  const [loadedFromProfile, setLoadedFromProfile] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)
  const isSearchingRef = useRef(false)
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

  // Load profile data on mount
  useEffect(() => {
    console.log('=== COMPONENT MOUNTED ===')
    loadProfileData()
    return () => {
      console.log('=== COMPONENT UNMOUNTED - THIS IS THE PROBLEM! ===')
    }
  }, [])

  const loadProfileData = async () => {
    setProfileLoading(true)

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // Try trial user
        const trialUser = localStorage.getItem('trialUser')
        if (trialUser) {
          const parsed = JSON.parse(trialUser)
          setFormData(prev => ({
            ...prev,
            interests: parsed.goal || '',
            country_origin: parsed.country || ''
          }))
        }
        setProfileLoading(false)
        setShowSummary(true)
        return
      }

      // Load profile from Supabase
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profile) {
        console.log('Profile loaded:', profile)

        // Parse test_scores JSONB array
        const testScores = profile.test_scores || []
        console.log('Test scores:', testScores)

        // Extract scores from test_scores array
        const getTestScore = (testName: string) => {
          const test = testScores.find((t: any) =>
            t.test_name?.toLowerCase().includes(testName.toLowerCase()) ||
            t.name?.toLowerCase().includes(testName.toLowerCase())
          )
          return test?.score || test?.value || ''
        }

        // Auto-fill form from profile
        const newFormData = {
          country_origin: profile.country_origin || '',
          education_level: profile.education_level || 'High School',
          interests: profile.fields_of_interest || '',

          // Grades
          gpa: profile.grade_value?.toString() || '',
          gpa_scale: profile.grade_scale || '4.0',
          bacalaureat: getTestScore('bacalaureat') || getTestScore('bac'),
          ib_score: getTestScore('ib'),
          a_levels: getTestScore('a-level') || getTestScore('a level'),
          abitur: getTestScore('abitur'),

          // Test scores from JSONB array
          ielts: getTestScore('ielts'),
          toefl: getTestScore('toefl'),
          duolingo: getTestScore('duolingo'),
          sat: getTestScore('sat'),
          act: getTestScore('act'),

          // Preferences
          budget_min: profile.budget_min || 0,
          budget_max: profile.budget_max || 50000,
          preferred_countries: Array.isArray(profile.preferred_countries)
            ? profile.preferred_countries.join(', ')
            : profile.preferred_countries || '',
          degree_type: profile.degree_type || 'Bachelor',
          scholarship_needed: profile.scholarship_needed || false,
          language_of_instruction: 'English'
        }

        console.log('Form data after profile load:', newFormData)
        setFormData(prev => ({ ...prev, ...newFormData }))
        setLoadedFromProfile(true)

        // Check profile completeness
        const missing: string[] = []
        if (!profile.country_origin) missing.push('Country of origin')
        if (!profile.education_level) missing.push('Education level')

        // Check for grades - either GPA or any test score with grade info
        const hasGrade = profile.grade_value ||
          getTestScore('bacalaureat') ||
          getTestScore('bac') ||
          getTestScore('ib')
        if (!hasGrade) missing.push('Academic grades')

        setMissingFields(missing)
        setProfileComplete(missing.length === 0)

        console.log('Profile complete:', missing.length === 0, 'Missing:', missing)
      } else {
        setMissingFields(['Country of origin', 'Education level', 'Academic grades'])
        setProfileComplete(false)
      }

      setShowSummary(true)
    } catch (error) {
      console.error('Error loading profile:', error)
      setShowSummary(true)
    } finally {
      setProfileLoading(false)
    }
  }

  // Progress animation effect - calibrated for 2 minute search
  useEffect(() => {
    if (!loading) {
      setLoadingProgress(0)
      setLoadingTime(0)
      return
    }

    // Progress based on time - reaches 95% at 2 minutes (120 seconds)
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 95) return prev
        // Calculate progress based on elapsed time
        // 95% over 120 seconds = ~0.79% per second
        const targetProgress = (loadingTime / 120) * 95
        // Smooth approach to target
        const diff = targetProgress - prev
        return Math.min(prev + Math.max(diff * 0.1, 0.5), 95)
      })
    }, 1000)

    const timeInterval = setInterval(() => {
      setLoadingTime(prev => prev + 1)
    }, 1000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(timeInterval)
    }
  }, [loading, loadingTime])

  // Update loading message based on progress
  useEffect(() => {
    const message = [...loadingMessages].reverse().find(m => loadingProgress >= m.progress)
    if (message) setLoadingMessage(message)
  }, [loadingProgress])

  const cancelSearch = () => {
    console.log('=== USER CANCELLED SEARCH ===')
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setLoading(false)
    setShowSummary(true)
    setError(null)
    isSearchingRef.current = false
    abortControllerRef.current = null
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
    console.log('=== SEARCH FUNCTION CALLED ===', Date.now())

    // HARD LOCK - prevent ANY duplicate
    if (isSearchingRef.current) {
      console.log('SEARCH LOCKED - IGNORING DUPLICATE')
      return
    }

    // Set lock IMMEDIATELY
    isSearchingRef.current = true
    console.log('LOCK ACQUIRED')

    // Cancel any existing request
    if (abortControllerRef.current) {
      console.log('Aborting previous request')
      abortControllerRef.current.abort()
    }

    setLoading(true)
    setShowForm(false)
    setShowSummary(false)
    setError(null)
    setLoadingProgress(0)

    // Create new abort controller with 3 minute timeout
    abortControllerRef.current = new AbortController()
    const timeoutId = setTimeout(() => {
      console.log('Request timeout after 3 minutes')
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }, 180000)

    try {
      const user = JSON.parse(localStorage.getItem('trialUser') || '{}')

      console.log('1. STARTING FETCH:', new Date().toISOString())
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

      console.log('2. GOT RESPONSE:', response.status, new Date().toISOString())

      const text = await response.text()
      console.log('3. RAW RESPONSE TEXT:', text.substring(0, 500))

      const data = JSON.parse(text)
      console.log('4. PARSED DATA:', data)

      clearTimeout(timeoutId)
      setLoadingProgress(100)

      // Handle array response with result.universities
      let universities: any[] = []
      if (Array.isArray(data) && data[0]?.result?.universities) {
        universities = data[0].result.universities
      } else if (data.result?.universities) {
        universities = data.result.universities
      } else if (data.universities) {
        universities = data.universities
      } else {
        console.error('Unexpected response format:', data)
        throw new Error('Failed to find universities')
      }

      console.log('5. FOUND UNIVERSITIES:', universities.length)
      setSchools(universities)
      console.log('6. SET SCHOOLS DONE')

    } catch (error: any) {
      clearTimeout(timeoutId)
      console.error('FETCH ERROR:', error.name, error.message)
      console.error('FULL ERROR:', error)

      if (error.name === 'AbortError') {
        console.log('Request was aborted (user cancel or timeout)')
        // Don't set error here - cancelSearch handles user cancellation
        // If it was timeout, the user is still on the page waiting
        return
      }

      console.error('Search error:', error)
      console.log('SETTING ERROR STATE - going back to summary')
      setError('Failed to find universities. Please try again.')
      setShowSummary(true)

    } finally {
      // Only release lock if not already released by cancelSearch
      if (isSearchingRef.current) {
        console.log('=== RELEASING LOCK ===')
        setLoading(false)
        isSearchingRef.current = false
        abortControllerRef.current = null
      }
    }
  }

  console.log('COMPONENT RENDER - loading:', loading, 'schools:', schools.length, 'showSummary:', showSummary)

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

        {/* Profile Loading */}
        {profileLoading ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3b82f6] mx-auto mb-4"></div>
            <p className="text-gray-500">Loading your profile...</p>
          </div>
        ) : showSummary && !loading && schools.length === 0 ? (
          /* Summary View */
          <div className="space-y-6">
            {/* Profile Completeness Warning */}
            {!profileComplete && missingFields.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800">Complete your profile for better matches</p>
                    <p className="text-sm text-amber-600 mt-1">
                      Missing: {missingFields.join(', ')}
                    </p>
                    <Link href="/dashboard/profile" className="text-sm text-amber-700 underline mt-2 inline-block">
                      Complete Profile →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Search Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-[#374151]">Search Summary</h2>
                  {loadedFromProfile && (
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <CheckCircle className="w-3 h-3" />
                      Loaded from your profile
                    </p>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowSummary(false)
                    setShowForm(true)
                  }}
                  className="text-sm"
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  Edit Details
                </Button>
              </div>

              <div className="space-y-3 mb-6">
                {formData.country_origin && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Country of Origin</span>
                    <span className="font-medium">{formData.country_origin}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Education Level</span>
                  <span className="font-medium">{formData.education_level}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Degree Type</span>
                  <span className="font-medium">{formData.degree_type}</span>
                </div>
                {formData.interests && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Field of Interest</span>
                    <span className="font-medium">{formData.interests}</span>
                  </div>
                )}
                {formData.preferred_countries && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Preferred Countries</span>
                    <span className="font-medium">{formData.preferred_countries}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Budget</span>
                  <span className="font-medium">Up to ${(formData.budget_max || 50000).toLocaleString()}/year</span>
                </div>
                {(formData.gpa || formData.bacalaureat || formData.ib_score) && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Your Grades</span>
                    <span className="font-medium">
                      {formData.gpa && `GPA ${formData.gpa}`}
                      {formData.bacalaureat && `Bac ${formData.bacalaureat}`}
                      {formData.ib_score && `IB ${formData.ib_score}`}
                    </span>
                  </div>
                )}
                {(formData.ielts || formData.toefl) && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">English Tests</span>
                    <span className="font-medium">
                      {formData.ielts && `IELTS ${formData.ielts}`}
                      {formData.ielts && formData.toefl && ', '}
                      {formData.toefl && `TOEFL ${formData.toefl}`}
                    </span>
                  </div>
                )}
                {formData.scholarship_needed && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Scholarship</span>
                    <span className="font-medium text-green-600">Needed</span>
                  </div>
                )}
              </div>

              <Button
                onClick={handleSearch}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Find My Universities
              </Button>
              <p className="text-xs text-gray-400 text-center mt-3">
                This search usually takes 1-2 minutes
              </p>
            </div>
          </div>
        ) : showForm ? (
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
                      Budget Range: ${(formData.budget_min || 0).toLocaleString()} - ${(formData.budget_max || 50000).toLocaleString()}/year
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
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Find My Universities
            </Button>
          </div>
        ) : (
          <>
            <Button
              onClick={() => {
                setShowSummary(true)
                setSchools([])
              }}
              variant="outline"
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              New Search
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
                    {loadingTime < 30
                      ? 'This usually takes about 2 minutes'
                      : loadingTime < 120
                        ? `Searching for ${Math.floor(loadingTime / 60)}:${(loadingTime % 60).toString().padStart(2, '0')} / ~2:00`
                        : loadingTime < 180
                          ? `Almost done... ${Math.floor(loadingTime / 60)}:${(loadingTime % 60).toString().padStart(2, '0')}`
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
