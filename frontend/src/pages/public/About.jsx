import { Link } from 'react-router-dom'

const teamMembers = [
  {
    name: 'Dr. Kwame Asante',
    role: 'Lead Agronomist',
    image: 'https://ui-avatars.com/api/?name=Kwame+Asante&background=random',
    social: {
      twitter: '#',
      facebook: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Ama Mensah',
    role: 'Research Director',
    image: 'https://ui-avatars.com/api/?name=Ama+Mensah&background=random',
    social: {
      twitter: '#',
      facebook: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Kofi Osei',
    role: 'Market Specialist',
    image: 'https://ui-avatars.com/api/?name=Kofi+Osei&background=random',
    social: {
      twitter: '#',
      facebook: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Akosua Adjei',
    role: 'Community Manager',
    image: 'https://ui-avatars.com/api/?name=Akosua+Adjei&background=random',
    social: {
      twitter: '#',
      facebook: '#',
      linkedin: '#',
    },
  },
]

const testimonials = [
  {
    name: 'Yaw Boateng',
    role: 'Cassava Farmer',
    image: 'https://ui-avatars.com/api/?name=Yaw+Boateng&background=random',
    text: 'Cassava Digital has transformed how I manage my farm. The knowledge hub and expert consultations have helped me increase my yield by 40%.',
  },
  {
    name: 'Efua Kwarteng',
    role: 'Processor',
    image: 'https://ui-avatars.com/api/?name=Efua+Kwarteng&background=random',
    text: 'The marketplace connects me directly with quality farmers. I can now source the best cassava products and build lasting partnerships.',
  },
  {
    name: 'Dr. Mensah',
    role: 'Researcher',
    image: 'https://ui-avatars.com/api/?name=Dr+Mensah&background=random',
    text: 'This platform bridges the gap between research and practice. My findings reach farmers faster and have real-world impact.',
  },
]


/**
 * About page showcasing mission, team, and testimonials.
 */
const About = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section - About Us Banner */}
      <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw]">
        <div
          className="relative flex min-h-[400px] items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center">
            <h1 className="mb-4 font-serif text-5xl font-bold text-white md:text-6xl lg:text-7xl">
              About Us
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-yellow-400">
              <Link to="/" className="hover:text-yellow-300">
                Home
              </Link>
              <span>/</span>
              <span className="text-white">About</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - We're Selling Quality Products */}
      <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Images */}
            <div className="flex flex-col gap-6">
              <div className="relative h-64 overflow-hidden rounded-lg md:h-80">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://i.pinimg.com/1200x/8b/71/03/8b7103b8032f00d63a3bb276e2cb0ec7.jpg')",
                  }}
                />
              </div>
              <div className="relative h-64 overflow-hidden rounded-lg md:h-80">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://i.pinimg.com/1200x/23/26/6b/23266b77f30631a8f97e5cbac2ab34c6.jpg')",
                  }}
                />
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="flex flex-col justify-center">
              <span className="mb-4 text-sm font-semibold uppercase tracking-wider text-yellow-500">
                OUR MISSION
              </span>
              <h2 className="mb-6 font-serif text-4xl font-bold text-slate-900 md:text-5xl">
                We're Selling Quality Products
              </h2>
              <p className="mb-4 font-serif text-base leading-relaxed text-slate-700">
                At Cassava Digital, we are committed to transforming the cassava
                value chain in Ghana through innovative digital solutions. Our
                platform connects farmers, processors, researchers, and
                agronomists in a unified ecosystem that promotes sustainable
                agriculture and economic growth.
              </p>
              <p className="mb-8 font-serif text-base leading-relaxed text-slate-700">
                We believe in empowering every stakeholder in the cassava industry
                with access to knowledge, markets, and expert guidance. Through
                our integrated platform, we're building a future where cassava
                farming is more profitable, sustainable, and accessible to all.
              </p>

              {/* Bullet Points */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-yellow-500" />
                  <span className="font-serif text-sm text-slate-700">
                    Fresh organic food
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-yellow-500" />
                  <span className="font-serif text-sm text-slate-700">
                    Live healthy
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-yellow-500" />
                  <span className="font-serif text-sm text-slate-700">
                    Expert guidance
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-yellow-500" />
                  <span className="font-serif text-sm text-slate-700">
                    Market access
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section - Get Always Fresh Organic Food */}
      <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw]">
        <div
          className="relative flex min-h-[500px] items-center justify-center bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="flex gap-2">
              <div className="h-1 w-12 bg-yellow-400" />
              <div className="h-1 w-8 bg-yellow-400" />
              <div className="h-1 w-12 bg-yellow-400" />
            </div>
            <h2 className="text-center font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Get Always Fresh Organic Food
            </h2>
            <button
              type="button"
              className="mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500 transition hover:bg-yellow-600"
              aria-label="Play video"
            >
              <svg
                className="ml-1 h-8 w-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-16 text-center">
            <div className="mb-3 flex justify-center">
              <svg
                className="h-6 w-6 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <p className="mb-2 text-sm font-normal text-slate-500">
              Professional People
            </p>
            <h2 className="text-3xl font-medium text-slate-900 md:text-4xl">
              Meet the Team
            </h2>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-5 aspect-square w-full max-w-[200px] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-2 text-lg font-medium text-slate-900">
                  {member.name}
                </h3>
                <div className="mt-2 flex gap-3">
                  <a
                    href={member.social.twitter}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
                    aria-label="Twitter"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                  <a
                    href={member.social.facebook}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
                    aria-label="Facebook"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                  <a
                    href={member.social.linkedin}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-12 text-center">
            <span className="mb-4 block text-sm font-semibold uppercase tracking-wider text-yellow-500">
              OUR TESTIMONIALS
            </span>
            <h2 className="font-serif text-4xl font-bold text-slate-900 md:text-5xl">
              What People Say?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-8 shadow-sm"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-yellow-600">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="font-serif text-base leading-relaxed text-slate-700">
                  {testimonial.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
