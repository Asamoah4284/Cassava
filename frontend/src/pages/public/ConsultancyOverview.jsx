import { useState } from 'react'
import FeatureCard from '../../components/cyphill/FeatureCard'
import SectionHeader from '../../components/cyphill/SectionHeader'

const services = [
  {
    title: 'Consultation requests',
    description:
      'Farmers submit questions and receive expert responses with clear documentation.',
  },
  {
    title: 'Live chat & video',
    description:
      'Schedule live sessions to resolve urgent farm and processing challenges.',
  },
  {
    title: 'Advisory knowledge base',
    description:
      'Reuse previous consultations to build a trusted advisory archive.',
  },
]

const consultationTypes = [
  'General Farming Advice',
  'Pest & Disease Management',
  'Soil Health & Fertility',
  'Crop Variety Selection',
  'Processing & Storage',
  'Market & Pricing',
  'Organic Farming',
  'Other',
]

/**
 * Public overview of the consultancy module with booking form.
 */
const ConsultancyOverview = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultationType: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Create email content
      const subject = encodeURIComponent(
        `Consultation Request: ${formData.consultationType || 'General Inquiry'}`
      )
      const body = encodeURIComponent(`
Consultation Booking Request

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

Consultation Type: ${formData.consultationType || 'Not specified'}
Preferred Date: ${formData.preferredDate || 'Not specified'}
Preferred Time: ${formData.preferredTime || 'Not specified'}

Message:
${formData.message}

---
This request was submitted from the Cassava Digital Consultancy page.
      `)

      // Use mailto link to open email client
      const mailtoLink = `mailto:info@cassavadigital.com?subject=${subject}&body=${body}`
      window.location.href = mailtoLink

      // Simulate successful submission
      setTimeout(() => {
        setSubmitStatus('success')
        setIsSubmitting(false)
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          consultationType: '',
          preferredDate: '',
          preferredTime: '',
          message: '',
        })
      }, 1000)
    } catch (error) {
      console.error('Error submitting consultation request:', error)
      setSubmitStatus('error')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold text-black md:text-4xl">
          Consultancy & support
        </h2>
        <p className="max-w-2xl text-base text-black">
          Direct access to agronomists and consultants, with workflows for paid and free advisory services.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((item) => (
          <FeatureCard
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>

      {/* Consultation Booking Form */}
      <div className="mt-8 bg-slate-50 p-3 md:p-6">
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-bold text-slate-900">
            Book a Consultation
          </h2>
          <p className="text-sm text-slate-600">
            Fill out the form below to request a consultation with our expert
            agronomists and consultants. We'll get back to you within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Phone and Consultation Type */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20"
                placeholder="+233 XX XXX XXXX"
              />
            </div>
            <div>
              <label
                htmlFor="consultationType"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Consultation Type *
              </label>
              <select
                id="consultationType"
                name="consultationType"
                value={formData.consultationType}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20"
              >
                <option value="">Select consultation type</option>
                {consultationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Preferred Date and Time */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="preferredDate"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Preferred Date
              </label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20"
              />
            </div>
            <div>
              <label
                htmlFor="preferredTime"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Preferred Time
              </label>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20"
              >
                <option value="">Select time</option>
                <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                <option value="Evening (4:00 PM - 6:00 PM)">Evening (4:00 PM - 6:00 PM)</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Message / Description *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20"
              placeholder="Please describe your farming challenge or what you'd like to discuss..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-green-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Consultation Request'}
            </button>
            {submitStatus === 'success' && (
              <p className="text-sm font-medium text-green-600">
                Request submitted! Check your email client to send the message.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-sm font-medium text-red-600">
                Error submitting request. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ConsultancyOverview
