'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { User, GraduationCap, FileText, Target, Loader2, CheckCircle } from 'lucide-react'

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

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  const [profile, setProfile] = useState({
    // Personal
    full_name: '',
    phone: '',
    country_origin: '',
    date_of_birth: '',
    avatar_url: '',

    // Education
    education_level: 'High School',
    school_name: '',
    gpa: '',
    gpa_scale: '4.0',
    graduation_year: '',

    // Test scores
    bacalaureat: '',
    ielts: '',
    toefl: '',
    sat: '',
    act: '',
    duolingo: '',
    cambridge: '',

    // Goals
    degree_type: 'Bachelor',
    fields_of_interest: '',
    preferred_countries: '',
    budget_min: 0,
    budget_max: 50000,
    need_scholarship: false,
    target_start_year: new Date().getFullYear() + 1
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

        // Load profile from database
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (data) {
          setProfile(prev => ({
            ...prev,
            ...data
          }))
        }
      }
      setLoading(false)
    }
    loadProfile()
  }, [supabase])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
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

  // Calculate profile completion
  const calculateCompletion = () => {
    const fields = [
      profile.full_name, profile.country_origin, profile.education_level,
      profile.fields_of_interest, profile.preferred_countries
    ]
    const filled = fields.filter(f => f).length
    return Math.round((filled / fields.length) * 100)
  }

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
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold">Personal Information</h2>
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
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
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

      {/* Education */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold">Education</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
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
            <label className="block text-sm font-medium mb-1">GPA</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="gpa"
                value={profile.gpa}
                onChange={handleChange}
                placeholder="3.8"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="gpa_scale"
                value={profile.gpa_scale}
                onChange={handleChange}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="4.0">/ 4.0</option>
                <option value="10">/ 10</option>
              </select>
            </div>
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
      </div>

      {/* Test Scores */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <FileText className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold">Test Scores</h2>
          <span className="text-sm text-gray-500">(Optional)</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Bacalaureat</label>
            <input
              type="text"
              name="bacalaureat"
              value={profile.bacalaureat}
              onChange={handleChange}
              placeholder="9.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">IELTS</label>
            <input
              type="text"
              name="ielts"
              value={profile.ielts}
              onChange={handleChange}
              placeholder="7.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">TOEFL</label>
            <input
              type="text"
              name="toefl"
              value={profile.toefl}
              onChange={handleChange}
              placeholder="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">SAT</label>
            <input
              type="text"
              name="sat"
              value={profile.sat}
              onChange={handleChange}
              placeholder="1450"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ACT</label>
            <input
              type="text"
              name="act"
              value={profile.act}
              onChange={handleChange}
              placeholder="32"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Duolingo</label>
            <input
              type="text"
              name="duolingo"
              value={profile.duolingo}
              onChange={handleChange}
              placeholder="120"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Study Abroad Goals */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
            <Target className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold">Study Abroad Goals</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
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
              Budget Range: ${profile.budget_min.toLocaleString()} - ${profile.budget_max.toLocaleString()}/year
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
