import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsOfService() {
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
        <h1 className="text-4xl font-bold text-[#374151] mb-8">Terms of Service</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing or using EduBridge, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">2. Description of Service</h2>
            <p className="text-gray-600 mb-4">
              EduBridge provides an AI-powered platform to help students find universities, improve their application essays, and track their application progress. Our services include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>University matching based on your profile</li>
              <li>AI-powered essay feedback and suggestions</li>
              <li>Application tracking and deadline reminders</li>
              <li>Document storage and management</li>
              <li>Visa guidance and resources</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">3. User Accounts</h2>
            <p className="text-gray-600 mb-4">
              To use certain features, you must create an account. You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>Maintaining the confidentiality of your account</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete information</li>
              <li>Notifying us of any unauthorized use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">4. Pricing and Payments</h2>
            <h3 className="text-lg font-medium text-[#374151] mb-2">Free Plan</h3>
            <p className="text-gray-600 mb-4">
              Our free plan provides limited access to features and is available indefinitely at no cost.
            </p>
            <h3 className="text-lg font-medium text-[#374151] mb-2">Premium Plans</h3>
            <p className="text-gray-600 mb-4">
              Premium and Concierge plans are one-time payments that provide lifetime access to purchased features. Prices are displayed in Euros (€).
            </p>
            <h3 className="text-lg font-medium text-[#374151] mb-2">30-Day Money-Back Guarantee</h3>
            <p className="text-gray-600 mb-4">
              If you are not satisfied with your Premium or Concierge purchase, you may request a full refund within 30 days of purchase. To request a refund, contact us at support@edubridge.com.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">5. Acceptable Use</h2>
            <p className="text-gray-600 mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>Use the service for any illegal purpose</li>
              <li>Submit false or misleading information</li>
              <li>Attempt to gain unauthorized access to any part of the service</li>
              <li>Interfere with or disrupt the service</li>
              <li>Copy, modify, or distribute our content without permission</li>
              <li>Use automated systems to access the service</li>
              <li>Share your account with others</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">6. Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              All content, features, and functionality of EduBridge are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-gray-600 mb-4">
              You retain ownership of any content you submit (essays, documents, etc.), but grant us a license to use it to provide our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-gray-600 mb-4">
              EduBridge is provided "as is" without any warranties. We do not guarantee:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>Acceptance to any university</li>
              <li>Accuracy of AI-generated suggestions</li>
              <li>Uninterrupted or error-free service</li>
              <li>That the service will meet your specific requirements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              To the maximum extent permitted by law, EduBridge shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">9. Account Termination</h2>
            <p className="text-gray-600 mb-4">
              We may terminate or suspend your account at any time for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>Violation of these Terms of Service</li>
              <li>Fraudulent or illegal activity</li>
              <li>Extended periods of inactivity</li>
              <li>At our sole discretion with reasonable notice</li>
            </ul>
            <p className="text-gray-600 mb-4">
              You may delete your account at any time through your account settings. Upon termination, your data will be deleted according to our Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">10. Governing Law</h2>
            <p className="text-gray-600 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Moldova, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">11. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify these terms at any time. We will provide notice of significant changes by email or through the service. Continued use after changes constitutes acceptance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#374151] mb-4">12. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              For questions about these Terms of Service, contact us at:
            </p>
            <p className="text-gray-600">
              Email: support@edubridge.com<br />
              Address: Chisinau, Moldova
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
