import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

/**
 * Blog post page layout matching the Agrezen design.
 * Features a full blog article with sidebar widgets.
 */
const KnowledgeHub = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [comment, setComment] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [saveInfo, setSaveInfo] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Navigation links matching home screen
  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Cassava News', to: '/knowledge' },
    { label: 'Research', to: '/research' },
    { label: 'Marketplace', to: '/marketplace' },
    { label: 'Consultancy', to: '/consultancy' },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log('Search:', searchQuery)
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement comment submission
    console.log('Comment submitted:', { comment, name, email, website })
    setComment('')
    setName('')
    setEmail('')
    setWebsite('')
  }

const categories = [
    'Varieties & Cultivation',
    'Pest & Disease Control',
    'Processing & Storage',
    'Marketing & Pricing',
    'Organic Farming',
    'Research & Innovation',
  ]

  const popularTags = [
    'Cassava',
    'Farming',
    'Organic',
    'Soil Health',
    'Pest Control',
    'Processing',
  ]

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
    <div className="min-h-screen bg-white">
      {/* Header Navigation - Dark theme with yellow accents */}
      <header className="sticky top-0 z-30 bg-[#0A0B10] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Brand/Logo Section */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-400">
              CASSAVA DIGITAL
            </span>
            <span className="text-xs text-gray-400">
              Knowledge, consultancy, and market platform
            </span>
          </div>

          {/* Navigation Links - Center */}
          <nav className="hidden items-center gap-5 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `transition ${
                    isActive
                      ? 'text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-400'
                  }`
                }
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Call-to-Action Buttons - Right */}
          <div className="hidden items-center gap-3 md:flex">
            <div className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs text-white/80">
              +233 000 000 000
            </div>
            <Link
              className="rounded-full bg-yellow-400 px-5 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-yellow-300"
              to="/contact"
            >
              Get In Touch
            </Link>
          </div>

          {/* Hamburger Menu Button - Mobile Only */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            className="transition-transform duration-300 md:hidden text-white"
          >
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6 transition-opacity duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 transition-opacity duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-screen opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          } border-t border-white/15 bg-black/60 backdrop-blur`}
        >
          <div className="mx-auto max-w-7xl px-6 py-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-yellow-400'
                        : 'text-gray-300 hover:text-yellow-400'
                    } ${
                      isMobileMenuOpen
                        ? 'translate-x-0 opacity-100'
                        : '-translate-x-4 opacity-0'
                    }`
                  }
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                  }}
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              ))}
              <div
                className={`mt-4 flex flex-col gap-3 transition-all duration-300 ${
                  isMobileMenuOpen
                    ? 'translate-y-0 opacity-100 delay-200'
                    : 'translate-y-4 opacity-0'
                }`}
              >
                <div className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-center text-xs text-white/80">
                  +233 000 000 000
                </div>
                <Link
                  className="rounded-full bg-yellow-400 px-5 py-2 text-center text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-yellow-300"
                  to="/contact"
                  onClick={closeMobileMenu}
                >
                  Get In Touch
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative bg-slate-800 py-12 sm:py-16 md:py-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-slate-800/80" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl px-4">
              Innovations in Cassava Crop Management
            </h1>
            <nav
              className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs sm:text-sm text-white/80 px-4"
              aria-label="Breadcrumb"
            >
              <Link
                to="/"
                className="hover:text-white transition-colors whitespace-nowrap"
              >
                Home
              </Link>
              <span className="text-white/60" aria-hidden="true">
                /
              </span>
              <Link
                to="/knowledge"
                className="hover:text-white transition-colors whitespace-nowrap"
              >
                Cassava News
              </Link>
              <span className="text-white/60" aria-hidden="true">
                /
              </span>
              <span
                className="max-w-[200px] sm:max-w-[300px] md:max-w-none truncate"
                title="Innovations in Cassava Crop Management"
              >
                <span className="hidden sm:inline">
                  Innovations in Cassava Crop Management
                </span>
                <span className="sm:hidden">Crop Management</span>
              </span>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          {/* Left Column - Article Content */}
          <article className="flex flex-col gap-8">
            {/* Featured Image */}
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
              <img
                src="https://i.pinimg.com/1200x/d7/ef/6a/d7ef6a65807ba895995b37db92c16812.jpg"
                alt="Cassava farmers examining cassava plants in field"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Article Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>October 24, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Admin</span>
              </div>
              <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 24 24"
                  className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
                <span>Cassava</span>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700">
                Cassava (Manihot esculenta) is one of the world's most important
                staple crops, providing food security for over 800 million people
                globally. This drought-resistant root crop thrives in tropical and
                subtropical regions, making it a critical food source in Africa,
                Asia, and Latin America. As climate change continues to challenge
                agricultural systems, cassava's resilience and adaptability make
                it an increasingly valuable crop for sustainable food production.
              </p>
              <p className="text-gray-700">
                Modern cassava cultivation has evolved significantly with the
                introduction of improved varieties, better pest and disease
                management practices, and innovative processing techniques. These
                advancements have not only increased yields but also improved the
                nutritional quality and market value of cassava products. From
                traditional farming methods to precision agriculture, farmers are
                adopting new technologies to optimize their cassava production.
              </p>

              {/* Blockquote */}
              <blockquote className="my-8 border-l-4 border-yellow-400 bg-yellow-50 p-6 pl-8">
                <div className="mb-2 text-4xl text-yellow-400">"</div>
                <p className="text-lg italic text-gray-800">
                  Cassava is not just a crop; it's a lifeline for millions of
                  farmers and a cornerstone of food security in developing
                  nations.
                </p>
                <cite className="mt-4 block text-sm font-semibold text-yellow-600">
                  - Agricultural Research Institute
                </cite>
              </blockquote>

              <p className="text-gray-700">
                The cassava value chain extends far beyond the field, encompassing
                processing into various products such as garri, fufu, tapioca,
                and industrial starch. This versatility makes cassava an
                economically important crop that supports rural livelihoods and
                contributes to national food security. With proper management and
                access to modern agricultural knowledge, cassava farmers can
                significantly improve their productivity and income.
              </p>

              {/* The Roots of Our Success Section */}
              <div className="my-8">
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                  Key Practices for Successful Cassava Farming
                </h2>
                <p className="mb-4 text-gray-600">
                  Essential techniques and innovations that drive high-yield
                  cassava production.
                </p>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="flex-1">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
      <svg
        viewBox="0 0 24 24"
                          className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
                          <polyline points="20 6 9 17 4 12" />
      </svg>
                        <span className="text-gray-700">
                          Improved Varieties: Selecting high-yielding, disease-resistant
                          cassava varieties adapted to local conditions
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
      <svg
        viewBox="0 0 24 24"
                          className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
                          <polyline points="20 6 9 17 4 12" />
      </svg>
                        <span className="text-gray-700">
                          Integrated Pest Management: Combining biological, cultural,
                          and chemical methods to control cassava pests and diseases
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
      <svg
        viewBox="0 0 24 24"
                          className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
                          <polyline points="20 6 9 17 4 12" />
      </svg>
                        <span className="text-gray-700">
                          Soil Health: Maintaining soil fertility through organic
                          matter management and proper nutrient application
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-[200px] w-full overflow-hidden rounded-lg md:w-[300px]">
                    <img
                      src="https://i.pinimg.com/1200x/bd/8e/ff/bd8effb460a5abe8a3ec62b79efe8910.jpg"
                      alt="Drone spraying cassava field"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <p className="text-gray-700">
                As we look toward the future, cassava farming continues to evolve
                with climate-smart agricultural practices, digital tools for farm
                management, and improved market linkages. The Cassava Digital
                platform connects farmers with the knowledge, expertise, and
                resources they need to succeed in modern cassava cultivation.
                Through collaborative learning and evidence-based practices, we're
                building a sustainable future for cassava farming communities
                worldwide.
              </p>
            </div>

            {/* Related Article Callout */}
            <div className="flex items-center gap-4 rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500 text-white">
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
              </div>
              <div>
                <Link
                  to="/knowledge"
                  className="text-lg font-semibold text-yellow-600 transition hover:text-yellow-700"
                >
                  How Technology is Transforming Cassava Production
                </Link>
              </div>
            </div>

            {/* Comment Section */}
            <div className="mt-8">
              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                Leave a Reply
              </h3>
              <p className="mb-6 text-sm text-gray-600">
                Your email address will not be published. Required fields are
                marked *
              </p>
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="comment"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Comment *
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="6"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#3F503C] focus:outline-none focus:ring-2 focus:ring-[#3F503C]/20"
                    required
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="website"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#3F503C] focus:outline-none focus:ring-2 focus:ring-[#3F503C]/20"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="save-info"
                    checked={saveInfo}
                    onChange={(e) => setSaveInfo(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#3F503C] focus:ring-[#3F503C]"
                  />
                  <label
                    htmlFor="save-info"
                    className="text-sm text-gray-700"
                  >
                    Save my name, email, and website in this browser for the
                    next time I comment.
                  </label>
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-slate-900 transition hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                >
                  POST COMMENT
                </button>
              </form>
            </div>
          </article>

          {/* Right Column - Sidebar */}
          <aside className="flex flex-col gap-8">
            {/* Search Widget */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-yellow-400" />
                <h3 className="text-lg font-bold text-gray-900">Search</h3>
              </div>
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Here"
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-slate-900 transition hover:bg-yellow-500"
                >
                  Search
                </button>
              </form>
      </div>

            {/* Categories Widget */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-yellow-400" />
                <h3 className="text-lg font-bold text-gray-900">Categories</h3>
              </div>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <Link
                      to={`/knowledge?category=${category.toLowerCase()}`}
                      className="flex items-center gap-2 text-gray-700 transition hover:text-yellow-500"
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
                      <span>{category}</span>
                    </Link>
                  </li>
                ))}
              </ul>
        </div>

            {/* Popular Tags Widget */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-yellow-400" />
                <h3 className="text-lg font-bold text-gray-900">Popular Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/knowledge?tag=${tag.toLowerCase()}`}
                    className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition hover:bg-yellow-400 hover:text-slate-900"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Promotional Banner */}
            <div className="relative overflow-hidden rounded-lg bg-slate-800 p-8 text-center text-white">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="relative z-10">
                <div className="mb-4 flex justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-16 w-16 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">
                  Nature's Way of Feeding
                </h3>
                <Link
                  to="/contact"
                  className="inline-block rounded-lg bg-yellow-400 px-6 py-2.5 font-semibold text-slate-900 transition hover:bg-yellow-500"
                >
                  Contact Us &gt;
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
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
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  // TODO: Implement newsletter subscription
                  console.log('Newsletter subscription:', newsletterEmail)
                  setNewsletterEmail('')
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
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
    </div>
  )
}

export default KnowledgeHub
