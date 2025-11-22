'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import {
  User, Search, FileText, FolderOpen, Settings, LogOut, Menu, X,
  GraduationCap, ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/dashboard/profile', label: 'Profile', icon: User },
  { href: '/dashboard/schools', label: 'University Finder', icon: Search },
  { href: '/dashboard/essay', label: 'Essay Checker', icon: FileText },
  { href: '/dashboard/documents', label: 'Documents', icon: FolderOpen },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'

  return (
    <div className="min-h-screen bg-[#fffbf5]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#fffbf5] border-r border-gray-100 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#374151]">EduBridge</span>
          </Link>
        </div>

        <nav className="px-4 space-y-1">
          {/* Dashboard Home */}
          <Link
            href="/dashboard"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              pathname === '/dashboard'
                ? 'bg-[#3b82f6]/10 text-[#3b82f6]'
                : 'text-[#374151] hover:bg-white hover:shadow-sm'
            }`}
          >
            <svg className={`w-5 h-5 ${pathname === '/dashboard' ? 'text-[#3b82f6]' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="font-medium">Dashboard</span>
          </Link>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[#3b82f6]/10 text-[#3b82f6]'
                    : 'text-[#374151] hover:bg-white hover:shadow-sm'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-[#3b82f6]' : 'text-gray-400'}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:text-[#374151] hover:bg-white rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-[#374151] hover:bg-gray-50 rounded-xl"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1" />

            {/* User dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#a78bfa] flex items-center justify-center text-white font-medium text-sm">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block text-sm font-medium text-[#374151]">{userName}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#374151] hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      Profile
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#374151] hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-gray-400" />
                      Settings
                    </Link>
                    <hr className="my-2 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 w-full transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
