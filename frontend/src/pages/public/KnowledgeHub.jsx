import FeatureCard from '../../components/cyphill/FeatureCard'
import SectionHeader from '../../components/cyphill/SectionHeader'

const categories = [
  {
    title: 'Varieties & cultivation',
    description: 'Best practices for planting, spacing, and variety selection.',
  },
  {
    title: 'Pest & disease control',
    description: 'Early detection, reporting, and response guidance.',
  },
  {
    title: 'Processing & storage',
    description: 'Post-harvest handling, processing methods, and storage tips.',
  },
  {
    title: 'Marketing & pricing',
    description: 'Market insights, buyer requirements, and pricing trends.',
  },
]

const featuredModules = [
  {
    title: 'Cassava Knowledge Hub',
    description: 'Articles, videos, PDFs, best practices',
    icon: (
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
    ),
  },
  {
    title: 'Expert Consultancy',
    description: 'Chat, video, documented advice',
    icon: (
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
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M13 8H7M17 12H7M17 16H7" />
      </svg>
    ),
  },
  {
    title: 'Cassava Marketplace',
    description: 'Produce + inputs with verified sellers',
    icon: (
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
    ),
  },
  {
    title: 'Research & Innovation Hub',
    description: 'Peer-reviewed, tagged, searchable',
    icon: (
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
    ),
  },
  {
    title: 'Alerts & Recommendations',
    description: 'Pest alerts, price trends (future AI)',
    icon: (
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
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        <path d="M12 2v4M6 6l2 2M16 6l-2 2" />
      </svg>
    ),
  },
]

/**
 * Public preview of the knowledge hub module.
 */
const KnowledgeHub = () => {
  return (
    <div className="flex flex-col gap-16">
      <SectionHeader
        title="Cassava Knowledge Hub"
        subtitle="Structured learning resources, research summaries, and advisory content tailored for cassava production and value addition."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {categories.map((item) => (
          <FeatureCard
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>

      {/* Featured Modules Section */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Featured Modules
          </h2>
          <p className="text-base text-slate-600">
            Explore the depth and breadth of our platform capabilities
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredModules.map((module) => (
            <div
              key={module.title}
              className="group flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                {module.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-slate-900">
                  {module.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {module.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default KnowledgeHub
