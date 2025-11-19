'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MapPin, DollarSign, Users, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const mockSchools = [
  {
    id: 1,
    name: 'University of Edinburgh',
    location: 'Edinburgh, UK',
    tuition: '$28,000/year',
    acceptance: '43%',
    match: 94,
    programs: ['Computer Science', 'Data Science', 'AI'],
    image: 'https://images.unsplash.com/photo-1583531172067-5f7886a57c19?w=400'
  },
  {
    id: 2,
    name: 'University of Amsterdam',
    location: 'Amsterdam, Netherlands',
    tuition: '$15,000/year',
    acceptance: '38%',
    match: 89,
    programs: ['Computer Science', 'Information Systems'],
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400'
  },
  {
    id: 3,
    name: 'Technical University of Munich',
    location: 'Munich, Germany',
    tuition: '$500/year',
    acceptance: '25%',
    match: 85,
    programs: ['Informatics', 'Data Engineering'],
    image: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=400'
  },
  {
    id: 4,
    name: 'KTH Royal Institute',
    location: 'Stockholm, Sweden',
    tuition: '$18,000/year',
    acceptance: '35%',
    match: 82,
    programs: ['Computer Science', 'Machine Learning'],
    image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=400'
  }
]

export default function SchoolsPage() {
  const [schools] = useState(mockSchools)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link href="/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">School Matches</h1>
          <p className="text-gray-600">Universities that match your profile and goals</p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-40 bg-gray-200 rounded-xl mb-4" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {schools.map((school) => (
              <div key={school.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div
                  className="h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${school.image})` }}
                />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold">{school.name}</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {school.match}% Match
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4" />
                      {school.location}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <DollarSign className="w-4 h-4" />
                      {school.tuition}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Users className="w-4 h-4" />
                      {school.acceptance} acceptance rate
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {school.programs.map((program) => (
                      <span key={program} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
                        {program}
                      </span>
                    ))}
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    View Details <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
