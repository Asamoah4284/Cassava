import { useState, useEffect } from 'react'
import PrimaryButton from '../../components/cyphill/PrimaryButton'

const heroBackgrounds = [
  'https://i.pinimg.com/1200x/8b/71/03/8b7103b8032f00d63a3bb276e2cb0ec7.jpg',
  'https://i.pinimg.com/1200x/d7/ef/6a/d7ef6a65807ba895995b37db92c16812.jpg',
  'https://i.pinimg.com/1200x/10/a2/9c/10a29c1102c3a8640056d4d98aa6a50e.jpg',
  'https://i.pinimg.com/1200x/50/b3/72/50b372699e5de05a37837674c9fd74f4.jpg',
]

const Home = () => {
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [nextBackgroundIndex, setNextBackgroundIndex] = useState(0)

  const nextBackground = () => {
    if (isTransitioning) return
    const next = (currentBackgroundIndex + 1) % heroBackgrounds.length
    setNextBackgroundIndex(next)
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentBackgroundIndex(next)
      setIsTransitioning(false)
    }, 600)
  }

  const previousBackground = () => {
    if (isTransitioning) return
    const prev =
      (currentBackgroundIndex - 1 + heroBackgrounds.length) %
      heroBackgrounds.length
    setNextBackgroundIndex(prev)
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentBackgroundIndex(prev)
      setIsTransitioning(false)
    }, 600)
  }

  return (
    <div className="flex flex-col gap-20 pb-24">
      <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw]">
        <div className="relative min-h-screen overflow-hidden">
          {/* Base background layer */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out ${
              isTransitioning ? 'scale-110 opacity-0 blur-sm' : 'scale-100 opacity-100 blur-0'
            }`}
            style={{
              backgroundImage: `url('${heroBackgrounds[currentBackgroundIndex]}')`,
            }}
          />
          {/* Transitioning background layer with dramatic crossfade, scale, and blur */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out ${
              isTransitioning
                ? 'opacity-100 scale-100 blur-0'
                : 'opacity-0 scale-110 blur-sm'
            }`}
            style={{
              backgroundImage: `url('${heroBackgrounds[nextBackgroundIndex]}')`,
            }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70" />
          <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pb-24 pt-36 text-center text-white">
            <div className="flex flex-col items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/40 bg-black/30">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4 text-amber-300"
                  fill="currentColor"
                >
                  <path d="M12.6 2.4c2.1.7 3.7 2.7 4.1 5.3 2.1.5 3.7 2 4.3 4.1-2.3-.7-4.6-.3-6.2 1.1-1.2 1-2 2.5-2.2 4.1-1.7-1.3-2.8-3.4-2.8-5.7 0-.5 0-1 .1-1.5-1.9 1.3-3 3.6-2.8 6-2-1.6-3.2-4.3-2.6-7 .6-2.8 2.9-4.8 5.7-5.1.4-1.2 1.3-2.2 2.4-2.7z" />
                </svg>
              </span>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
                <span className="h-px w-8 bg-amber-200/60" />
                We are a dedicated cassava farming company
                <span className="h-px w-8 bg-amber-200/60" />
              </p>
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              Sustainable Cassava Farming For A Better Tomorrow
            </h1>
            <p className="mt-5 max-w-2xl text-base text-white/80 md:text-lg">
              High-quality cassava cultivation using modern, climate-smart, and
              eco-friendly practices across the value chain.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton
                to="/about"
                className="bg-amber-400 px-6 py-3 text-slate-900 hover:bg-amber-300 focus-visible:outline-amber-400"
              >
                Explore Our Farm
              </PrimaryButton>
              <PrimaryButton
                to="/contact"
                className="border border-amber-300/70 bg-transparent px-6 py-3 text-amber-100 hover:border-amber-200 hover:text-white focus-visible:outline-amber-300"
                variant="secondary"
              >
                Contact Us
              </PrimaryButton>
            </div>
            {/* Mobile chevrons below buttons */}
            <div className="mt-8 flex items-center justify-center gap-4 md:hidden">
              <button
                type="button"
                onClick={previousBackground}
                aria-label="Previous slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white/80 transition hover:border-white/60 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={nextBackground}
                aria-label="Next slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white/80 transition hover:border-white/60 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
          {/* Desktop chevrons on sides */}
          <button
            type="button"
            onClick={previousBackground}
            aria-label="Previous slide"
            className="absolute left-6 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white/80 transition hover:border-white/60 hover:text-white md:flex"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={nextBackground}
            aria-label="Next slide"
            className="absolute right-6 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white/80 transition hover:border-white/60 hover:text-white md:flex"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </section>

      <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] bg-white -mt-20 pt-32 pb-24 lg:-mt-24 lg:pt-40 lg:pb-32 shadow-lg">
        <div className="mx-auto max-w-6xl px-6 grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="relative h-[500px] sm:h-[600px] lg:h-[500px]">
            <div className="absolute left-0 top-0 h-[280px] w-[75%] overflow-hidden rounded-[40px] shadow-lg sm:h-[320px] lg:h-[300px]">
              <img
                src="https://i.pinimg.com/1200x/d1/8a/b6/d18ab645f7fc4578a3b8fccdad1e2499.jpg"
                alt="Cassava crops"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute right-0 bottom-0 h-[280px] w-[75%] overflow-hidden rounded-[20px] shadow-lg sm:h-[320px] lg:h-[300px] lg:border-[12px] lg:border-white">
              <img
                src="https://i.pinimg.com/1200x/b9/a1/bf/b9a1bfe8109e92f772acc8adc0135748.jpg"
                alt="Harvest basket"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-amber-300" />
              <span className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                About Us
              </span>
              <span className="h-px w-8 bg-amber-300" />
            </div>
            <h2 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
              Agriculture & Organic
              <br />
              Product Platform
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Cassava Digital connects growers, researchers, consultants, and
              buyers through a trusted, data-driven ecosystem for learning,
              advisory support, and market access.
            </p>
            <p className="text-sm leading-relaxed text-slate-600">
              We help farmers adopt better practices, share proven research, and
              access reliable inputs through verified suppliers.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-amber-600">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 7h16" />
                    <path d="M6 7v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" />
                    <path d="M9 7V5a3 3 0 0 1 6 0v2" />
                    <path d="M8 12h8" />
                    <path d="M12 9v6" />
                  </svg>
                </span>
                <p className="text-sm font-semibold text-slate-900">
                  Professional Farmers
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-amber-600">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3c2 2 2 5 0 7s-5 2-7 0" />
                    <path d="M12 3c-2 2-2 5 0 7s5 2 7 0" />
                    <path d="M12 10v9" />
                    <path d="M8 21h8" />
                  </svg>
                </span>
                <p className="text-sm font-semibold text-slate-900">
                  Organic & Eco Solutions
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
              <span className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-100 text-amber-600 text-[10px]">
                  ✓
                </span>
                100% organic
              </span>
              <span className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-100 text-amber-600 text-[10px]">
                  ✓
                </span>
                Chemical-free farming
              </span>
              <span className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-100 text-amber-600 text-[10px]">
                  ✓
                </span>
                Quality control
              </span>
              <span className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-100 text-amber-600 text-[10px]">
                  ✓
                </span>
                Fresh from farm
              </span>
            </div>

            <div className="pt-2">
              <PrimaryButton
                to="/knowledge"
                className="bg-amber-500 text-slate-900 hover:bg-amber-600 focus-visible:outline-amber-500"
              >
                Explore More
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] bg-slate-950 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col gap-8 md:gap-12">
            <div className="flex flex-col gap-3">
              <h2 className="text-4xl font-semibold tracking-tight text-slate-100 md:text-5xl">
                Why the Cassava Value Chain Needs This Platform
              </h2>
              <p className="text-base text-slate-400">
                The challenges are real, and they compound each other.
              </p>
            </div>

            <div className="flex flex-col gap-6 md:gap-8">
              <div className="flex flex-col gap-2 border-b border-slate-800 pb-6">
                <p className="text-lg font-semibold text-slate-100">
                  Knowledge is scattered
                </p>
                <p className="text-sm leading-relaxed text-slate-400">
                  Best practices, research, and farmer wisdom exist in silos—if they exist at all.
                </p>
              </div>

              <div className="flex flex-col gap-2 border-b border-slate-800 pb-6">
                <p className="text-lg font-semibold text-slate-100">
                  Expert support is out of reach
                </p>
                <p className="text-sm leading-relaxed text-slate-400">
                  Farmers need timely advice, but consultants and agronomists are hard to find and expensive to access.
                </p>
              </div>

              <div className="flex flex-col gap-2 border-b border-slate-800 pb-6">
                <p className="text-lg font-semibold text-slate-100">
                  Research stays in labs
                </p>
                <p className="text-sm leading-relaxed text-slate-400">
                  Breakthroughs in cassava science rarely make it from academic papers to actual fields.
                </p>
              </div>

              <div className="flex flex-col gap-2 border-b border-slate-800 pb-6">
                <p className="text-lg font-semibold text-slate-100">
                  Markets are fragmented
                </p>
                <p className="text-sm leading-relaxed text-slate-400">
                  Buyers struggle to find quality produce. Farmers struggle to find fair prices. Both lose.
                </p>
              </div>

              <div className="flex flex-col gap-2 border-b border-slate-800 pb-6">
                <p className="text-lg font-semibold text-slate-100">
                  Inputs are unverified
                </p>
                <p className="text-sm leading-relaxed text-slate-400">
                  Tools, fertilizers, and pesticides come with no guarantee of quality or authenticity.
                </p>
              </div>

              <div className="flex flex-col gap-2 pb-2">
                <p className="text-lg font-semibold text-slate-100">
                  Data goes to waste
                </p>
                <p className="text-sm leading-relaxed text-slate-400">
                  Farm records, market trends, and research insights remain disconnected and underused.
                </p>
              </div>
            </div>

            <div className="pt-4 md:pt-6">
              <p className="text-lg font-medium leading-relaxed text-slate-200">
                We fixed this by bringing everything into one intelligent digital system.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] bg-white pt-16 pb-24 md:pt-32 md:pb-32 -mt-px mb-px">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-12">
            {/* Header */}
            <div className="flex flex-col gap-3 text-center">
              <h2 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                Built for Everyone in the
                <br />
                Cassava Ecosystem
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600">
                Find your role and discover how Cassava Digital empowers your journey
                in sustainable agriculture
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Farmers Card */}
              <div className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 13h12M6 6h12M6 20h12" />
                    <path d="M3 3h18v18H3z" />
                    <path d="M9 9h6v6H9z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-slate-900">Farmers</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Learn best practices, get expert help, sell cassava directly,
                    and receive timely alerts
                  </p>
                </div>
                <div className="pt-1">
                  <PrimaryButton
                    to="/register?role=farmer"
                    className="w-full justify-center bg-amber-400 px-6 py-3 text-slate-900 hover:bg-amber-500 focus-visible:outline-amber-400"
                  >
                    Join as Farmer
                  </PrimaryButton>
                </div>
              </div>

              {/* Consultants / Agronomists Card */}
              <div className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-slate-900">
                    Consultants / Agronomists
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Offer advisory services, earn income, and share your expertise
                    with farmers
                  </p>
                </div>
                <div className="pt-1">
                  <PrimaryButton
                    to="/register?role=consultant"
                    className="w-full justify-center bg-amber-400 px-6 py-3 text-slate-900 hover:bg-amber-500 focus-visible:outline-amber-400"
                  >
                    Become a Consultant
                  </PrimaryButton>
                </div>
              </div>

              {/* Researchers Card */}
              <div className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    <path d="M8 7h8M8 12h8M8 17h4" />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-slate-900">Researchers</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Publish cassava research, track real-world impact, and connect
                    with practitioners
                  </p>
                </div>
                <div className="pt-1">
                  <PrimaryButton
                    to="/register?role=researcher"
                    className="w-full justify-center bg-amber-400 px-6 py-3 text-slate-900 hover:bg-amber-500 focus-visible:outline-amber-400"
                  >
                    Publish Research
                  </PrimaryButton>
                </div>
              </div>

              {/* Buyers & Processors Card */}
              <div className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-slate-900">
                    Buyers & Processors
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Source high-quality cassava directly from verified farmers with
                    transparent pricing
                  </p>
                </div>
                <div className="pt-1">
                  <PrimaryButton
                    to="/marketplace"
                    className="w-full justify-center bg-amber-400 px-6 py-3 text-slate-900 hover:bg-amber-500 focus-visible:outline-amber-400"
                  >
                    Browse Marketplace
                  </PrimaryButton>
                </div>
              </div>

              {/* Partners Card */}
              <div className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md md:col-span-2 lg:col-span-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-slate-900">
                    Partners (Govt / NGOs)
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Access comprehensive data, launch programs, and gain actionable
                    insights
                  </p>
                </div>
                <div className="pt-1">
                  <PrimaryButton
                    to="/contact?type=partner"
                    className="w-full justify-center bg-amber-400 px-6 py-3 text-slate-900 hover:bg-amber-500 focus-visible:outline-amber-400"
                  >
                    Partner with Us
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] min-h-[600px] bg-slate-100 pt-16 pb-32 overflow-hidden">
        <div
          className="absolute inset-0 z-0 hidden bg-cover bg-center bg-no-repeat md:block"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/1200x/d7/ef/6a/d7ef6a65807ba895995b37db92c16812.jpg')",
            backgroundPosition: 'center center',
            minHeight: '100%',
            width: '100%',
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-12">
            {/* Header */}
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-yellow-300" />
                <span className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-yellow-700 shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  Work Process
                </span>
                <span className="h-px w-12 bg-yellow-300" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                The{' '}
                <span className="bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                  Agricultural
                </span>{' '}
                Process
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600">
                Get started in four simple steps and transform your cassava farming journey
              </p>
            </div>

            {/* Steps Cards */}
            <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Step 1 */}
              <div className="relative rounded-xl bg-white p-6 shadow-md">
                <div className="relative mb-6 flex items-start">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-yellow-500 bg-transparent">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-10 w-10 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span className="absolute -bottom-1 -left-1 flex h-7 w-7 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-white">
                      01
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-left">
                  <h3 className="text-lg font-bold text-slate-900">
                    Create an account
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Choose your role and get started with your journey in the
                    cassava ecosystem
                  </p>
                </div>
              </div>

              {/* Step 2 - Active/Highlighted */}
              <div className="relative mt-16 rounded-xl bg-yellow-500 p-6 shadow-md lg:mt-20">
                <div className="relative mb-6 flex items-start">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-white bg-transparent">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-10 w-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                      <path d="M8 7h8M8 12h8M8 17h4" />
                    </svg>
                    <span className="absolute -bottom-1 -left-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-yellow-500">
                      02
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-left">
                  <h3 className="text-lg font-bold text-white">
                    Access knowledge or services
                  </h3>
                  <p className="text-sm leading-relaxed text-white/90">
                    Explore articles, videos, PDFs, and connect with expert
                    consultants
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative rounded-xl bg-white p-6 shadow-md">
                <div className="relative mb-6 flex items-start">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-yellow-500 bg-transparent">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-10 w-10 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      <path d="M8 10h.01M12 10h.01M16 10h.01" />
                    </svg>
                    <span className="absolute -bottom-1 -left-1 flex h-7 w-7 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-white">
                      03
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-left">
                  <h3 className="text-lg font-bold text-slate-900">Interact</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Consult with experts, trade in the marketplace, publish
                    research, and learn
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative mt-16 rounded-xl bg-white p-6 shadow-md lg:mt-20">
                <div className="relative mb-6 flex items-start">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-yellow-500 bg-transparent">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-10 w-10 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <span className="absolute -bottom-1 -left-1 flex h-7 w-7 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-white">
                      04
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-left">
                  <h3 className="text-lg font-bold text-slate-900">
                    Grow productivity, income & impact
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Achieve sustainable growth and make a positive impact in the
                    cassava value chain
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
