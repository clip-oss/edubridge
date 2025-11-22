'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  BookOpen, Target, FileText, Calendar, ArrowRight, Sparkles,
  GraduationCap, Clock, CheckCircle2, FolderOpen
} from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    profileCompletion: 15,
    savedUniversities: 0,
    uploadedDocuments: 0,
    essaysWritten: 0,
    nextDeadline: null as string | null,
    daysUntilDeadline: 0
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      // Check trial access
      const trialUser = localStorage.getItem('trialUser')
      const trialActive = localStorage.getItem('trialActive')

      if (!trialUser || trialActive !== 'true') {
        router.push('/trial')
        return
      }

      setUser(JSON.parse(trialUser))
      setLoading(false)
      return
    }

    setUser(user)

    // Load profile completion
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    // Load saved universities
    const { data: universities } = await supabase
      .from('saved_universities')
      .select('*')
      .eq('user_id', user.id)

    // Load documents count
    const { data: documents } = await supabase
      .from('documents')
      .select('id')
      .eq('user_id', user.id)

    // Calculate stats
    let profileCompletion = 15
    if (profile) {
      const fields = [
        profile.full_name, profile.country_origin, profile.education_level,
        profile.fields_of_interest, profile.preferred_countries, profile.grade_value
      ]
      profileCompletion = Math.round((fields.filter(f => f).length / fields.length) * 100)
    }

    // Find next deadline
    let nextDeadline = null
    let daysUntilDeadline = 0
    if (universities && universities.length > 0) {
      const upcoming = universities
        .filter(u => new Date(u.deadline) > new Date())
        .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())

      if (upcoming.length > 0) {
        nextDeadline = upcoming[0].name
        daysUntilDeadline = Math.ceil(
          (new Date(upcoming[0].deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        )
      }
    }

    setStats({
      profileCompletion,
      savedUniversities: universities?.length || 0,
      uploadedDocuments: documents?.length || 0,
      essaysWritten: 0,
      nextDeadline,
      daysUntilDeadline
    })

    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3b82f6]"></div>
      </div>
    )
  }

  if (!user) return null

  const userName = user.user_metadata?.full_name || user.name || user.email?.split('@')[0] || 'Student'

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#374151] mb-2">Welcome back, {userName}!</h1>
        <p className="text-gray-500">Here's your application overview</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-[#3b82f6]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#374151]">{stats.profileCompletion}%</p>
          <p className="text-sm text-gray-500">Profile Complete</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#a78bfa]/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-[#a78bfa]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#374151]">{stats.savedUniversities}</p>
          <p className="text-sm text-gray-500">Universities Saved</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#34d399]/10 flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-[#34d399]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#374151]">{stats.uploadedDocuments}</p>
          <p className="text-sm text-gray-500">Documents</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#ff8a65]/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#ff8a65]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#374151]">
            {stats.daysUntilDeadline > 0 ? stats.daysUntilDeadline : '—'}
          </p>
          <p className="text-sm text-gray-500">Days to Deadline</p>
        </div>
      </div>

      {/* Main Actions Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* My Universities */}
        <Link
          href="/dashboard/my-universities"
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#a78bfa] flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#3b82f6] transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-[#374151] mb-1">My Universities</h3>
          <p className="text-sm text-gray-500 mb-3">Track applications and deadlines</p>
          {stats.savedUniversities > 0 ? (
            <p className="text-sm font-medium text-[#a78bfa]">
              {stats.savedUniversities} universities saved
            </p>
          ) : (
            <p className="text-sm text-gray-400">No universities saved yet</p>
          )}
        </Link>

        {/* Next Deadline */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#ff8a65] flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-[#374151] mb-1">Upcoming Deadline</h3>
          {stats.nextDeadline ? (
            <>
              <p className="text-sm text-gray-500 mb-3">{stats.nextDeadline}</p>
              <p className={`text-sm font-medium ${stats.daysUntilDeadline <= 14 ? 'text-red-500' : 'text-[#ff8a65]'}`}>
                {stats.daysUntilDeadline} days remaining
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-400">No upcoming deadlines</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-bold text-[#374151] mb-4">Quick Actions</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Link
          href="/dashboard/schools"
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#3b82f6] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-semibold text-[#374151] mb-1">Find Universities</h3>
          <p className="text-sm text-gray-500">Discover programs that match your profile</p>
        </Link>

        <Link
          href="/dashboard/essay"
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#a78bfa] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-semibold text-[#374151] mb-1">Write Essay</h3>
          <p className="text-sm text-gray-500">Get AI feedback on your essays</p>
        </Link>

        <Link
          href="/dashboard/documents"
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#34d399] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-semibold text-[#374151] mb-1">Upload Documents</h3>
          <p className="text-sm text-gray-500">Manage your application files</p>
        </Link>
      </div>

      {/* Profile Completion */}
      {stats.profileCompletion < 100 && (
        <div className="bg-gradient-to-r from-[#3b82f6] to-[#a78bfa] rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Complete Your Profile</h3>
            <span className="text-white/80">{stats.profileCompletion}%</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full mb-4">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${stats.profileCompletion}%` }}
            />
          </div>
          <p className="text-sm text-white/80 mb-4">
            Complete your profile to get better university matches
          </p>
          <Link href="/dashboard/profile">
            <Button className="bg-white text-[#3b82f6] hover:bg-white/90 rounded-xl">
              Complete Profile
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
