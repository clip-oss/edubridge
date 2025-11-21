'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import {
  User, GraduationCap, FileText, Target, Loader2, CheckCircle,
  ChevronDown, ChevronUp, Plus, X, Upload, Camera, FolderOpen
} from 'lucide-react'

const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria', 'Bangladesh',
  'Belgium', 'Brazil', 'Bulgaria', 'Canada', 'Chile', 'China', 'Colombia', 'Croatia',
  'Czech Republic', 'Denmark', 'Egypt', 'Estonia', 'Finland', 'France', 'Germany', 'Greece',
  'Hungary', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Japan',
  'Jordan', 'Kazakhstan', 'Kenya', 'South Korea', 'Latvia', 'Lebanon', 'Lithuania',
  'Malaysia', 'Mexico', 'Moldova', 'Morocco', 'Netherlands', 'New Zealand', 'Nigeria',
  'Norway', 'Pakistan', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Romania', 'Russia',
  'Saudi Arabia', 'Serbia', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'Spain',
  'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'Turkey', 'Ukraine', 'United Arab Emirates',
  'United Kingdom', 'United States', 'Vietnam'
]

const gradingSystems = [
  { id: 'moldova', name: 'Moldova/Romania (1-10)', min: 1, max: 10, type: 'number' },
  { id: 'us', name: 'US GPA (0-4.0)', min: 0, max: 4, step: 0.1, type: 'number' },
  { id: 'uk', name: 'UK Classification', type: 'select', options: ['First Class', 'Upper Second (2:1)', 'Lower Second (2:2)', 'Third Class', 'Pass'] },
  { id: 'germany', name: 'Germany (1.0-5.0)', min: 1, max: 5, step: 0.1, type: 'number' },
  { id: 'france', name: 'France (0-20)', min: 0, max: 20, type: 'number' },
  { id: 'ib', name: 'IB (1-7)', min: 1, max: 7, type: 'number' },
  { id: 'percentage', name: 'Percentage (0-100%)', min: 0, max: 100, type: 'number' }
]

const testCategories = {
  'English Proficiency': [
    { id: 'ielts', name: 'IELTS', min: 0, max: 9, step: 0.5, type: 'number' },
    { id: 'toefl', name: 'TOEFL iBT', min: 0, max: 120, type: 'number' },
    { id: 'cambridge', name: 'Cambridge', type: 'select', options: ['A', 'B', 'C'] },
    { id: 'duolingo', name: 'Duolingo', min: 10, max: 160, type: 'number' },
    { id: 'pte', name: 'PTE', min: 10, max: 90, type: 'number' }
  ],
  'National Exams': [
    { id: 'moldovan_bac', name: 'Moldovan Bacalaureat', min: 1, max: 10, type: 'number' },
    { id: 'romanian_bac', name: 'Romanian Bacalaureat', min: 1, max: 10, type: 'number' },
    { id: 'abitur', name: 'German Abitur', min: 1, max: 6, step: 0.1, type: 'number' },
    { id: 'french_bac', name: 'French Baccalauréat', min: 0, max: 20, type: 'number' },
    { id: 'a_levels', name: 'UK A-Levels', type: 'text', placeholder: 'e.g. A*A*A' },
    { id: 'ib_diploma', name: 'IB Diploma', min: 24, max: 45, type: 'number' },
    { id: 'european_bac', name: 'European Baccalaureate', min: 0, max: 100, type: 'number' }
  ],
  'Standardized Tests': [
    { id: 'sat', name: 'SAT', min: 400, max: 1600, type: 'number' },
    { id: 'act', name: 'ACT', min: 1, max: 36, type: 'number' },
    { id: 'gre', name: 'GRE', min: 260, max: 340, type: 'number' },
    { id: 'gmat', name: 'GMAT', min: 200, max: 800, type: 'number' },
    { id: 'ap_exams', name: 'AP Exams', type: 'text', placeholder: 'e.g. Calc BC: 5, Physics: 4' }
  ]
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [uploadingCV, setUploadingCV] = useState(false)
  const supabase = createClient()
  const photoInputRef = useRef<HTMLInputElement>(null)
  const cvInputRef = useRef<HTMLInputElement>(null)

  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    education: true,
    tests: false,
    goals: false,
    documents: false
  })

  const [showTestDropdown, setShowTestDropdown] = useState(false)
  const [testSearch, setTestSearch] = useState('')

  const [profile, setProfile] = useState({
    full_name: '',
    phone: '',
    country_origin: '',
    date_of_birth: '',
    avatar_url: '',
    education_level: 'High School',
    school_name: '',
    grading_system: 'us',
    grade_value: '',
    graduation_year: '',
    test_scores: [] as { id: string; name: string; value: string }[],
    degree_type: 'Bachelor',
    fields_of_interest: '',
    preferred_countries: '',
    budget_min: 0,
    budget_max: 50000,
    need_scholarship: false,
    target_start_year: new Date().getFullYear() + 1,
    cv_url: '',
    cv_filename: ''
  })

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        setProfile(prev => ({
          ...prev,
          full_name: user.user_metadata?.full_name || ''
        }))

        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (data) {
          setProfile(prev => ({
            ...prev,
            ...data,
            test_scores: data.test_scores || []
          }))
        }
      }
      setLoading(false)
    }
    loadProfile()
  }, [supabase])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return

    setUploadingPhoto(true)
    const fileExt = file.name.split('.').pop()
    const filePath = `${user.id}/avatar.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true })

    if (!uploadError) {
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
      setProfile(prev => ({ ...prev, avatar_url: data.publicUrl }))
    }
    setUploadingPhoto(false)
  }

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    setUploadingCV(true)
    const fileExt = file.name.split('.').pop()
    const filePath = `${user.id}/cv.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file, { upsert: true })

    if (!uploadError) {
      const { data } = supabase.storage.from('documents').getPublicUrl(filePath)
      setProfile(prev => ({
        ...prev,
        cv_url: data.publicUrl,
        cv_filename: file.name
      }))
    }
    setUploadingCV(false)
  }

  const addTestScore = (test: any) => {
    if (profile.test_scores.find(t => t.id === test.id)) return
    setProfile(prev => ({
      ...prev,
      test_scores: [...prev.test_scores, { id: test.id, name: test.name, value: '' }]
    }))
    setShowTestDropdown(false)
    setTestSearch('')
  }

  const updateTestScore = (id: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      test_scores: prev.test_scores.map(t => t.id === id ? { ...t, value } : t)
    }))
  }

  const removeTestScore = (id: string) => {
    setProfile(prev => ({
      ...prev,
      test_scores: prev.test_scores.filter(t => t.id !== id)
    }))
  }

  const handleSave = async () => {
    if (!user) return
    setSaving(true)

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        ...profile,
        updated_at: new Date().toISOString()
      })

    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setSaving(false)
  }

  const calculateCompletion = () => {
    const fields = [
      profile.full_name, profile.country_origin, profile.education_level,
      profile.fields_of_interest, profile.preferred_countries, profile.grade_value
    ]
    const filled = fields.filter(f => f).length
    return Math.round((filled / fields.length) * 100)
  }

  const getGradingSystem = () => gradingSystems.find(g => g.id === profile.grading_system)

  const filteredTests = Object.entries(testCategories).reduce((acc, [category, tests]) => {
    const filtered = tests.filter(t =>
      t.name.toLowerCase().includes(testSearch.toLowerCase()) &&
      !profile.test_scores.find(s => s.id === t.id)
    )
    if (filtered.length > 0) acc[category] = filtered
    return acc
  }, {} as Record<string, any[]>)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-gray-600">Complete your profile to get personalized recommendations</p>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">Profile Completion</span>
          <span className="text-blue-600 font-bold">{calculateCompletion()}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
            style={{ width: `${calculateCompletion()}%` }}
          />
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
        <button
          onClick={() => toggleSection('personal')}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold">Personal Information</h2>
          </div>
          {expandedSections.personal ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {expandedSections.personal && (
          <div className="px-6 pb-6">
            {/* Profile Photo */}
            <div className="flex items-center gap-6 mb-6 pb-6 border-b">
              <div className="relative">
                <div
                  onClick={() => photoInputRef.current?.click()}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
                >
                  {profile.avatar_url ? (
                    <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : uploadingPhoto ? (
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  ) : (
                    <Camera className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
              <div>
                <p className="text-sm text-gray-600">Profile Photo</p>
                <button
                  onClick={() => photoInputRef.current?.click()}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  {profile.avatar_url ? 'Change photo' : 'Upload photo'}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={profile.full_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country of Origin</label>
                <select
                  name="country_origin"
                  value={profile.country_origin}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select country</option>
                  {countries.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={profile.date_of_birth}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Education */}
      <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
        <button
          onClick={() => toggleSection('education')}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold">Education</h2>
          </div>
          {expandedSections.education ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {expandedSections.education && (
          <div className="px-6 pb-6 grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Education Level</label>
              <select
                name="education_level"
                value={profile.education_level}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>High School</option>
                <option>Bachelor&apos;s Degree</option>
                <option>Master&apos;s Degree</option>
                <option>PhD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">School/University Name</label>
              <input
                type="text"
                name="school_name"
                value={profile.school_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Grading System</label>
              <select
                name="grading_system"
                value={profile.grading_system}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {gradingSystems.map(g => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Grade/Average</label>
              {getGradingSystem()?.type === 'select' ? (
                <select
                  name="grade_value"
                  value={profile.grade_value}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select classification</option>
                  {getGradingSystem()?.options?.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  name="grade_value"
                  value={profile.grade_value}
                  onChange={handleChange}
                  min={getGradingSystem()?.min}
                  max={getGradingSystem()?.max}
                  step={getGradingSystem()?.step || 1}
                  placeholder={
                    profile.grading_system === 'moldova' ? 'Enter grade 1-10' :
                    profile.grading_system === 'us' ? 'Enter GPA 0-4.0' :
                    profile.grading_system === 'germany' ? 'Enter grade 1.0-5.0 (1.0 best)' :
                    profile.grading_system === 'france' ? 'Enter grade 0-20' :
                    profile.grading_system === 'ib' ? 'Enter grade 1-7' :
                    profile.grading_system === 'percentage' ? 'Enter percentage 0-100' :
                    `${getGradingSystem()?.min}-${getGradingSystem()?.max}`
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Expected Graduation Year</label>
              <input
                type="number"
                name="graduation_year"
                value={profile.graduation_year}
                onChange={handleChange}
                placeholder="2025"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Test Scores */}
      <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
        <button
          onClick={() => toggleSection('tests')}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold">Test Scores</h2>
            <span className="text-xs text-gray-500">(Optional)</span>
          </div>
          {expandedSections.tests ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {expandedSections.tests && (
          <div className="px-6 pb-6">
            {/* Added test scores as chips */}
            {profile.test_scores.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.test_scores.map(test => {
                  const testDef = Object.values(testCategories).flat().find(t => t.id === test.id)
                  return (
                    <div key={test.id} className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                      <span className="text-sm font-medium">{test.name}</span>
                      {testDef?.type === 'select' ? (
                        <select
                          value={test.value}
                          onChange={(e) => updateTestScore(test.id, e.target.value)}
                          className="text-sm bg-white border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="">Select</option>
                          {testDef.options?.map((opt: string) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={testDef?.type === 'text' ? 'text' : 'number'}
                          value={test.value}
                          onChange={(e) => updateTestScore(test.id, e.target.value)}
                          placeholder={testDef?.placeholder || `${testDef?.min || 0}-${testDef?.max || 100}`}
                          min={testDef?.min}
                          max={testDef?.max}
                          step={testDef?.step}
                          className="w-20 text-sm bg-white border border-gray-300 rounded px-2 py-1"
                        />
                      )}
                      <button
                        onClick={() => removeTestScore(test.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Add test button and dropdown */}
            <div className="relative">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowTestDropdown(!showTestDropdown)}
                className="w-full justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Test Score
              </Button>

              {showTestDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
                  <div className="p-2 border-b">
                    <input
                      type="text"
                      value={testSearch}
                      onChange={(e) => setTestSearch(e.target.value)}
                      placeholder="Search tests..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      autoFocus
                    />
                  </div>
                  {Object.entries(filteredTests).map(([category, tests]) => (
                    <div key={category}>
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                        {category}
                      </div>
                      {tests.map((test: any) => (
                        <button
                          key={test.id}
                          onClick={() => addTestScore(test)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 hover:text-blue-600"
                        >
                          {test.name}
                        </button>
                      ))}
                    </div>
                  ))}
                  {Object.keys(filteredTests).length === 0 && (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No tests found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Study Goals */}
      <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
        <button
          onClick={() => toggleSection('goals')}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <Target className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-lg font-semibold">Study Abroad Goals</h2>
          </div>
          {expandedSections.goals ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {expandedSections.goals && (
          <div className="px-6 pb-6 grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Degree Type Seeking</label>
              <select
                name="degree_type"
                value={profile.degree_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Bachelor</option>
                <option>Master</option>
                <option>PhD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Target Start Year</label>
              <input
                type="number"
                name="target_start_year"
                value={profile.target_start_year}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Fields of Interest</label>
              <input
                type="text"
                name="fields_of_interest"
                value={profile.fields_of_interest}
                onChange={handleChange}
                placeholder="e.g. Computer Science, Business, Medicine"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Preferred Countries</label>
              <input
                type="text"
                name="preferred_countries"
                value={profile.preferred_countries}
                onChange={handleChange}
                placeholder="e.g. UK, Germany, Netherlands"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Budget: ${profile.budget_min.toLocaleString()} - ${profile.budget_max.toLocaleString()}/year
              </label>
              <input
                type="range"
                name="budget_max"
                min="0"
                max="100000"
                step="5000"
                value={profile.budget_max}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="need_scholarship"
                  checked={profile.need_scholarship}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm">I need scholarship/financial aid</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Documents */}
      <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
        <button
          onClick={() => toggleSection('documents')}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-lg font-semibold">Documents</h2>
          </div>
          {expandedSections.documents ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {expandedSections.documents && (
          <div className="px-6 pb-6">
            <div>
              <label className="block text-sm font-medium mb-2">CV/Resume (Optional)</label>
              {profile.cv_url ? (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{profile.cv_filename || 'CV uploaded'}</span>
                  </div>
                  <button
                    onClick={() => setProfile(prev => ({ ...prev, cv_url: '', cv_filename: '' }))}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => cvInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                >
                  {uploadingCV ? (
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />
                  ) : (
                    <>
                      <Upload className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Click to upload PDF, DOC, or DOCX</p>
                      <p className="text-xs text-gray-400 mt-1">Max 5MB</p>
                    </>
                  )}
                </div>
              )}
              <input
                ref={cvInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleCVUpload}
                className="hidden"
              />
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : saved ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Saved!
            </>
          ) : (
            'Save Profile'
          )}
        </Button>
      </div>
    </div>
  )
}
