import { memo, useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Footer for public pages with company info, services, newsletter, and social links.
 * @param {object} props
 * @param {{ label: string, to: string }[]} props.links - Footer links.
 */
const SiteFooter = memo(function SiteFooter({ links }) {
  const [email, setEmail] = useState('')

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  // Scalloped circle icon wrapper - using rounded-full with decorative border effect
  const ScallopedIcon = ({ children, className = '' }) => (
    <div
      className={`relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 ${className}`}
    >
      <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30" />
      <div className="relative z-10">{children}</div>
    </div>
  )

  const services = [
    { label: 'Digital Farm Support', to: '/knowledge' },
    { label: 'Nature-Based Farming', to: '/knowledge' },
    { label: 'Agri-Tech Innovations', to: '/research' },
    { label: 'Eco-Friendly Farming', to: '/knowledge' },
    { label: 'Organic Farm Solutions', to: '/marketplace' },
  ]

  return (
    <footer className="relative text-white" style={{ backgroundColor: '#121A2C' }}>
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Left Section: Company Info */}
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
                <div className="absolute inset-0 rounded-full border border-emerald-400/40" />
              </div>
              <span className="text-xl font-bold text-white">Cassava Digital</span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <ScallopedIcon>
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </ScallopedIcon>
              <span className="text-base font-medium text-white">
                +1 (528) 456-7592
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <ScallopedIcon>
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </ScallopedIcon>
              <span className="text-base font-medium text-white">
                info@cassavadigital.com
              </span>
            </div>
          </div>

          {/* Middle-Left Section: Our Services */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
              <h3 className="text-lg font-bold text-white">Our Services</h3>
            </div>
            <ul className="flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.to}>
                  <Link
                    to={service.to}
                    className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-emerald-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-emerald-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle-Right Section: Newsletter */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Sign up to our newsletter
              </h3>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-white transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
            <p className="text-sm leading-relaxed text-gray-400">
              Rooted in nature's care, we grow with integrity, nurture every seed
              with love, and harvest pure, healthier world...
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-3">
              {[
                {
                  name: 'Facebook',
                  icon: (
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  ),
                },
                {
                  name: 'Twitter',
                  icon: (
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  ),
                },
                {
                  name: 'Instagram',
                  icon: (
                    <>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </>
                  ),
                },
                {
                  name: 'LinkedIn',
                  icon: (
                    <>
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </>
                  ),
                },
                {
                  name: 'YouTube',
                  icon: (
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  ),
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white transition hover:bg-emerald-600"
                  aria-label={social.name}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 border-t border-gray-700/50 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © Copyright 2026. All rights reserved.{' '}
            <Link
              to="/"
              className="text-emerald-400 transition hover:text-emerald-300"
            >
              Cassava Digital
            </Link>
            . Designed by{' '}
            <a
              href="#"
              className="text-emerald-400 transition hover:text-emerald-300"
            >
              Zozothemes
            </a>
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        aria-label="Scroll to top"
      >
        <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30" />
        <svg
          viewBox="0 0 24 24"
          className="relative z-10 h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </footer>
  )
})

export default SiteFooter
