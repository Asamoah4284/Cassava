import { Link } from 'react-router-dom'

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
      <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] -mt-12">
        <div
          className="relative flex min-h-[400px] items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/1200x/50/b3/72/50b372699e5de05a37837674c9fd74f4.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center">
            <h1 className="mb-4 font-serif text-5xl font-bold text-white md:text-6xl lg:text-7xl">
              About Us
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-green-400">
              <Link to="/" className="hover:text-green-300">
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
                      "url('https://i.pinimg.com/1200x/10/a2/9c/10a29c1102c3a8640056d4d98aa6a50e.jpg')",
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
              <span className="mb-4 text-sm font-semibold uppercase tracking-wider text-green-500">
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
                  <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                  <span className="font-serif text-sm text-slate-700">
                    Fresh organic food
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                  <span className="font-serif text-sm text-slate-700">
                    Live healthy
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                  <span className="font-serif text-sm text-slate-700">
                    Expert guidance
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
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
              "url('https://i.pinimg.com/736x/24/00/c7/2400c79e665ecb95eb0531447dad3365.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="flex gap-2">
              <div className="h-1 w-12 bg-green-400" />
              <div className="h-1 w-8 bg-green-400" />
              <div className="h-1 w-12 bg-green-400" />
            </div>
            <h2 className="text-center font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Get Always Fresh Organic Food
            </h2>
            <button
              type="button"
              className="mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500 transition hover:bg-green-600"
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

      {/* Testimonials Section */}
      <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-12 text-center">
            <span className="mb-4 block text-sm font-semibold uppercase tracking-wider text-green-500">
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
                    <h4 className="font-serif font-semibold text-green-600">
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
