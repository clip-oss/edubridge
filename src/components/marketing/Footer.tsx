import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-slate-900">EduBridge</span>
          </Link>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-8 text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} EduBridge. Made for students from Moldova & Romania.
        </div>
      </div>
    </footer>
  )
}
