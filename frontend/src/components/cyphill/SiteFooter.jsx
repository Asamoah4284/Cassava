import { memo, useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Footer for public pages with company info, services, newsletter, and social links.
 * @param {object} props
 * @param {{ label: string, to: string }[]} props.links - Footer links.
 */
const SiteFooter = memo(function SiteFooter({ links }) {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  const socialIcons = [
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
      name: 'Instagram',
      icon: (
        <>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </>
      ),
    },
  ]

  return (
    <footer
      className="relative bg-[#0A0B10] text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-[#0A0B10]/95" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Column 1 - Brand Info */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-yellow-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
              <span className="text-xl font-bold">Cassava Digital</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <span className="text-base font-medium">+1 (528) 456-7582</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <span className="text-base font-medium">
                info@cassavadigital.com
              </span>
            </div>
          </div>

          {/* Column 2 - Our Services */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-400" />
              <h3 className="text-lg font-bold">Our Services</h3>
            </div>
            <ul className="flex flex-col gap-3">
              {[
                'Digital Farm Support',
                'Nature Based Farming',
                'Agri-Tech Innovations',
                'Eco-Friendly Farming',
                'Organic Farm Solutions',
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/knowledge"
                    className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-yellow-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Newsletter */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-400" />
              <h3 className="text-lg font-bold">Sign Up to our newsletter</h3>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="flex-1 rounded-lg border border-gray-600 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                required
              />
              <button
                type="submit"
                className="rounded-lg bg-yellow-400 px-4 py-2.5 font-semibold text-slate-900 transition hover:bg-yellow-500"
              >
                Send
              </button>
            </form>
            <p className="text-sm leading-relaxed text-gray-300">
              Rooted in nature's care, we grow with integrity, nurture every
              seed with love, and harvest pure, healthier world...
            </p>
            <div className="flex gap-3">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-white transition hover:bg-yellow-600"
                  aria-label={social.name}
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
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-600/50 pt-8 text-center">
          <p className="text-sm text-gray-400">
            Copyright ©2026 All Right Reserved. Cassava Digital. Designed By
            CoderBot.
          </p>
        </div>
      </div>
    </footer>
  )
})

export default SiteFooter
