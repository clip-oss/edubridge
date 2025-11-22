import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-[#374151]">
              EduBridge
            </Link>
            <Link href="/" className="text-gray-500 hover:text-[#374151] flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-[#374151] mb-8">Privacy Policy</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-4">
              EduBridge ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">2. Information We Collect</h2>
            <h3 className="text-lg font-medium text-[#374151] mb-2">Personal Information</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>Name, email address, and phone number</li>
              <li>Date of birth and country of origin</li>
              <li>Educational background and academic records</li>
              <li>Test scores (IELTS, TOEFL, SAT, etc.)</li>
              <li>Study preferences and goals</li>
              <li>Documents you upload (CV, transcripts, etc.)</li>
            </ul>
            <h3 className="text-lg font-medium text-[#374151] mb-2">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>Device and browser information</li>
              <li>IP address and location data</li>
              <li>Usage patterns and preferences</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>To provide personalized university recommendations</li>
              <li>To offer AI-powered essay feedback</li>
              <li>To track your application progress</li>
              <li>To communicate with you about our services</li>
              <li>To improve our platform and user experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">4. Data Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell your personal information. We may share your data with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>Service providers who assist in operating our platform</li>
              <li>Universities (only with your explicit consent)</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">5. Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">6. Your Rights (GDPR)</h2>
            <p className="text-gray-600 mb-4">
              As a user in the EU, you have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">7. Cookies</h2>
            <p className="text-gray-600 mb-4">
              We use cookies to enhance your experience. You can control cookie settings through your browser. Essential cookies are required for the platform to function properly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">8. Data Retention</h2>
            <p className="text-gray-600 mb-4">
              We retain your data for as long as your account is active or as needed to provide services. You can request deletion at any time by contacting us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">9. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              For privacy-related questions or to exercise your rights, contact us at:
            </p>
            <p className="text-gray-600">
              Email: privacy@edubridge.com<br />
              Address: Chisinau, Moldova
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-600 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} EduBridge. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
