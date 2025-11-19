'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduBridge
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
            <Link href="/trial">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Start Free Trial</Button>
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <a href="#features" className="block text-gray-600 hover:text-gray-900 py-2" onClick={() => setIsOpen(false)}>Features</a>
            <a href="#how-it-works" className="block text-gray-600 hover:text-gray-900 py-2" onClick={() => setIsOpen(false)}>How It Works</a>
            <a href="#pricing" className="block text-gray-600 hover:text-gray-900 py-2" onClick={() => setIsOpen(false)}>Pricing</a>
            <Link href="/trial" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Start Free Trial</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
