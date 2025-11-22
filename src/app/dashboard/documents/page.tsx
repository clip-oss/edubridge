'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import {
  Upload, FileText, Download, Trash2, CheckCircle2, Circle,
  File, Award, GraduationCap, Languages, CreditCard, Mail, FolderOpen, ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

const documentCategories = [
  { value: 'cv', label: 'CV/Resume', icon: FileText },
  { value: 'transcript', label: 'Transcripts', icon: GraduationCap },
  { value: 'certificate', label: 'Certificates', icon: Award },
  { value: 'recommendation', label: 'Letters of Recommendation', icon: Mail },
  { value: 'id', label: 'ID/Passport', icon: CreditCard },
  { value: 'other', label: 'Other', icon: File },
]

const requiredDocuments = [
  { id: 'cv', label: 'CV/Resume', category: 'cv' },
  { id: 'transcript', label: 'Academic Transcripts', category: 'transcript' },
  { id: 'diploma', label: 'Diploma/Certificates', category: 'certificate' },
  { id: 'english', label: 'English Proficiency (IELTS/TOEFL)', category: 'certificate' },
  { id: 'passport', label: 'Passport Copy', category: 'id' },
  { id: 'motivation', label: 'Motivation Letter', category: 'other' },
  { id: 'recommendation', label: 'Letters of Recommendation', category: 'recommendation' },
]

interface Document {
  id: string
  name: string
  category: string
  url: string
  size: number
  created_at: string
}

export default function DocumentsPage() {
  const [user, setUser] = useState<any>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('cv')
  const supabase = createClient()

  useEffect(() => {
    loadUserAndDocuments()
  }, [])

  const loadUserAndDocuments = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setUser(user)
      await loadDocuments(user.id)
    }
    setLoading(false)
  }

  const loadDocuments = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('documents')
      .eq('id', userId)
      .single()

    if (data?.documents) {
      setDocuments(data.documents)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || !user) return

    setUploading(true)

    try {
      const newDocs: Document[] = []

      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${user.id}/${Date.now()}-${file.name}`

        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(fileName, file)

        if (uploadError) {
          console.error('Upload error:', uploadError)
          alert(`Failed to upload ${file.name}: ${uploadError.message}`)
          continue
        }

        const { data: urlData } = supabase.storage
          .from('documents')
          .getPublicUrl(fileName)

        newDocs.push({
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          category: selectedCategory,
          url: urlData.publicUrl,
          size: file.size,
          created_at: new Date().toISOString()
        })
      }

      const updatedDocs = [...documents, ...newDocs]
      setDocuments(updatedDocs)

      // Save to profile
      await supabase
        .from('profiles')
        .update({ documents: updatedDocs })
        .eq('id', user.id)

      alert('Documents uploaded successfully!')
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload documents')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleDelete = async (docId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return

    const updatedDocs = documents.filter(d => d.id !== docId)
    setDocuments(updatedDocs)

    await supabase
      .from('profiles')
      .update({ documents: updatedDocs })
      .eq('id', user.id)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getCategoryIcon = (category: string) => {
    const cat = documentCategories.find(c => c.value === category)
    return cat ? cat.icon : File
  }

  const getCategoryLabel = (category: string) => {
    const cat = documentCategories.find(c => c.value === category)
    return cat ? cat.label : 'Other'
  }

  const isDocumentUploaded = (requiredDoc: typeof requiredDocuments[0]) => {
    return documents.some(d => d.category === requiredDoc.category)
  }

  const completionPercentage = Math.round(
    (requiredDocuments.filter(isDocumentUploaded).length / requiredDocuments.length) * 100
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#3b82f6] mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#374151]">Documents</h1>
        <p className="text-gray-500">Upload and manage your application documents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Upload Documents</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {documentCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleUpload}
                  className="hidden"
                  disabled={uploading}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-10 h-10 text-gray-400 mb-3" />
                  <span className="text-sm font-medium text-gray-700">
                    {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    PDF, DOC, DOCX (max 10MB each)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Document List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Your Documents</h2>

            {documents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FolderOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No documents uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => {
                  const Icon = getCategoryIcon(doc.category)
                  return (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 truncate">{doc.name}</p>
                          <p className="text-sm text-gray-500">
                            {getCategoryLabel(doc.category)} • {formatFileSize(doc.size)} • {formatDate(doc.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Checklist Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Document Checklist</h2>
              <span className="text-sm font-medium text-blue-600">{completionPercentage}%</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>

            <div className="space-y-3">
              {requiredDocuments.map((doc) => {
                const isUploaded = isDocumentUploaded(doc)
                return (
                  <div
                    key={doc.id}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      isUploaded ? 'bg-green-50' : 'bg-gray-50'
                    }`}
                  >
                    {isUploaded ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${isUploaded ? 'text-green-700' : 'text-gray-600'}`}>
                      {doc.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="font-medium text-blue-900 mb-2">Pro Tip</h3>
            <p className="text-sm text-blue-700">
              Keep your documents updated and organized. Universities may request additional
              documents during the application process.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
