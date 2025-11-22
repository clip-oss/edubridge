'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import {
  ArrowLeft, MapPin, Calendar, ChevronDown, ExternalLink,
  Trash2, Clock, FileText, CheckCircle2, Circle, BookOpen
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const statusOptions = [
  { value: 'researching', label: 'Researching', color: 'bg-gray-100 text-gray-600' },
  { value: 'preparing', label: 'Preparing', color: 'bg-[#3b82f6]/10 text-[#3b82f6]' },
  { value: 'applied', label: 'Applied', color: 'bg-[#a78bfa]/10 text-[#a78bfa]' },
  { value: 'interview', label: 'Interview', color: 'bg-[#ff8a65]/10 text-[#ff8a65]' },
  { value: 'accepted', label: 'Accepted', color: 'bg-[#34d399]/10 text-[#34d399]' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-600' },
]

interface SavedUniversity {
  id: string
  name: string
  location: string
  program: string
  deadline: string
  status: string
  logo?: string
  requirements?: {
    gpa?: string
    ielts?: string
    toefl?: string
    documents?: string[]
  }
  notes?: string
}

export default function MyUniversitiesPage() {
  const [universities, setUniversities] = useState<SavedUniversity[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUni, setSelectedUni] = useState<SavedUniversity | null>(null)
  const supabase = createClient()

  useEffect(() => {
    loadUniversities()
  }, [])

  const loadUniversities = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from('saved_universities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (data) {
        setUniversities(data)
      }
    }
    setLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('saved_universities')
      .update({ status })
      .eq('id', id)

    if (!error) {
      setUniversities(prev =>
        prev.map(u => u.id === id ? { ...u, status } : u)
      )
    }
  }

  const removeUniversity = async (id: string) => {
    const { error } = await supabase
      .from('saved_universities')
      .delete()
      .eq('id', id)

    if (!error) {
      setUniversities(prev => prev.filter(u => u.id !== id))
      if (selectedUni?.id === id) setSelectedUni(null)
    }
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return days
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3b82f6]"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#3b82f6] mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Dashboard
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#374151]">My Universities</h1>
          <p className="text-gray-500">Track your applications and deadlines</p>
        </div>
        <Link href="/dashboard/schools">
          <Button className="bg-[#ff8a65] hover:bg-[#f57c5b] text-white rounded-xl">
            Find Universities
          </Button>
        </Link>
      </div>

      {universities.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#374151] mb-2">No universities saved yet</h3>
          <p className="text-gray-500 mb-6">Start by finding universities that match your profile</p>
          <Link href="/dashboard/schools">
            <Button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-xl">
              Find Universities
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* University List */}
          <div className="lg:col-span-2 space-y-4">
            {universities.map((uni) => {
              const days = getDaysUntilDeadline(uni.deadline)
              const statusOption = statusOptions.find(s => s.value === uni.status)

              return (
                <div
                  key={uni.id}
                  onClick={() => setSelectedUni(uni)}
                  className={`bg-white rounded-2xl shadow-sm border p-6 cursor-pointer transition-all hover:shadow-md ${
                    selectedUni?.id === uni.id ? 'border-[#3b82f6]' : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#374151]">{uni.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {uni.location}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeUniversity(uni.id)
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm text-[#374151] mb-4">{uni.program}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className={days <= 14 ? 'text-red-500 font-medium' : 'text-gray-500'}>
                        {days > 0 ? `${days} days left` : 'Deadline passed'}
                      </span>
                    </div>

                    <select
                      value={uni.status}
                      onChange={(e) => {
                        e.stopPropagation()
                        updateStatus(uni.id, e.target.value)
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className={`text-xs font-medium px-3 py-1 rounded-full border-0 cursor-pointer ${statusOption?.color}`}
                    >
                      {statusOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-1">
            {selectedUni ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-[#374151] mb-4">{selectedUni.name}</h3>

                {/* Requirements */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-[#374151] mb-3">Requirements</h4>
                  <div className="space-y-2 text-sm">
                    {selectedUni.requirements?.gpa && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Min GPA</span>
                        <span className="text-[#374151]">{selectedUni.requirements.gpa}</span>
                      </div>
                    )}
                    {selectedUni.requirements?.ielts && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">IELTS</span>
                        <span className="text-[#374151]">{selectedUni.requirements.ielts}</span>
                      </div>
                    )}
                    {selectedUni.requirements?.toefl && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">TOEFL</span>
                        <span className="text-[#374151]">{selectedUni.requirements.toefl}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Document Checklist */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-[#374151] mb-3">Documents</h4>
                  <div className="space-y-2">
                    {(selectedUni.requirements?.documents || ['CV/Resume', 'Transcripts', 'Motivation Letter', 'Recommendation Letters']).map((doc, i) => (
                      <label key={i} className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                        <input type="checkbox" className="rounded text-[#3b82f6]" />
                        {doc}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Deadline */}
                <div className="mb-6 p-3 bg-[#fffbf5] rounded-xl">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-[#ff8a65]" />
                    <span className="font-medium text-[#374151]">
                      Deadline: {new Date(selectedUni.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Link href="/dashboard/documents" className="block">
                    <Button variant="outline" className="w-full rounded-xl">
                      <FileText className="w-4 h-4 mr-2" />
                      Upload Documents
                    </Button>
                  </Link>
                  <Link href="/dashboard/essay" className="block">
                    <Button variant="outline" className="w-full rounded-xl">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Write Essay
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                <p className="text-gray-500 text-sm">Select a university to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
