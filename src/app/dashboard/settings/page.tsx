'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import {
  Lock, Mail, Trash2, Bell, Eye, Download, Crown,
  ChevronRight, AlertTriangle, Check
} from 'lucide-react'

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Password change
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMessage, setPasswordMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  // Preferences
  const [preferences, setPreferences] = useState({
    email_notifications: true,
    deadline_reminders: true,
    newsletter: false,
    profile_public: false
  })

  const supabase = createClient()

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setUser(user)
      // Load preferences from profile
      const { data } = await supabase
        .from('profiles')
        .select('preferences')
        .eq('id', user.id)
        .single()

      if (data?.preferences) {
        setPreferences(prev => ({ ...prev, ...data.preferences }))
      }
    }
    setLoading(false)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordMessage(null)

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match' })
      return
    }

    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters' })
      return
    }

    setSaving(true)

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) {
      setPasswordMessage({ type: 'error', text: error.message })
    } else {
      setPasswordMessage({ type: 'success', text: 'Password updated successfully!' })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }

    setSaving(false)
  }

  const handlePreferenceChange = async (key: keyof typeof preferences) => {
    const newPreferences = {
      ...preferences,
      [key]: !preferences[key]
    }
    setPreferences(newPreferences)

    // Save to database
    await supabase
      .from('profiles')
      .update({ preferences: newPreferences })
      .eq('id', user.id)
  }

  const handleExportData = async () => {
    // Fetch all user data
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    const exportData = {
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at
      },
      profile
    }

    // Download as JSON
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `edubridge-data-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    )

    if (!confirmed) return

    const doubleConfirmed = window.confirm(
      'This will permanently delete all your data including profile, documents, and preferences. Type "DELETE" to confirm.'
    )

    if (!doubleConfirmed) return

    // Delete profile data
    await supabase.from('profiles').delete().eq('id', user.id)

    // Sign out
    await supabase.auth.signOut()

    // Redirect to home
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and security</p>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Account Settings
        </h2>

        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center gap-2">
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
              />
              <span className="text-xs text-gray-500">Contact support to change</span>
            </div>
          </div>

          {/* Change Password */}
          <form onSubmit={handlePasswordChange} className="space-y-3 pt-4 border-t">
            <h3 className="font-medium text-gray-900">Change Password</h3>

            {passwordMessage && (
              <div className={`p-3 rounded-lg text-sm ${
                passwordMessage.type === 'success'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}>
                {passwordMessage.text}
              </div>
            )}

            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Button type="submit" disabled={saving || !newPassword || !confirmPassword}>
              {saving ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications
        </h2>

        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive updates about your applications</p>
            </div>
            <input
              type="checkbox"
              checked={preferences.email_notifications}
              onChange={() => handlePreferenceChange('email_notifications')}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-gray-900">Deadline Reminders</p>
              <p className="text-sm text-gray-500">Get notified before application deadlines</p>
            </div>
            <input
              type="checkbox"
              checked={preferences.deadline_reminders}
              onChange={() => handlePreferenceChange('deadline_reminders')}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-gray-900">Newsletter</p>
              <p className="text-sm text-gray-500">Tips and guides for international students</p>
            </div>
            <input
              type="checkbox"
              checked={preferences.newsletter}
              onChange={() => handlePreferenceChange('newsletter')}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Privacy
        </h2>

        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-gray-900">Public Profile</p>
              <p className="text-sm text-gray-500">Allow others to view your profile</p>
            </div>
            <input
              type="checkbox"
              checked={preferences.profile_public}
              onChange={() => handlePreferenceChange('profile_public')}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>

          <div className="pt-4 border-t">
            <button
              onClick={handleExportData}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Download className="w-4 h-4" />
              Export My Data
            </button>
            <p className="text-sm text-gray-500 mt-1">Download all your data in JSON format</p>
          </div>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Crown className="w-5 h-5" />
          Subscription
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Current Plan: <span className="text-blue-600">Free</span></p>
            <p className="text-sm text-gray-500">Limited features and AI credits</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            Upgrade to Premium
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-600">
          <AlertTriangle className="w-5 h-5" />
          Danger Zone
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Delete Account</p>
            <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
          </div>
          <Button
            variant="outline"
            onClick={handleDeleteAccount}
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
}
