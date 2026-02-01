import { useState } from 'react'

/**
 * Cassava varieties commonly grown in Ghana and the wider region.
 */
const varieties = [
  {
    id: 1,
    name: 'TME 419',
    tagline: 'High-yield, disease-resistant',
    description:
      'Widely adopted variety with high dry matter (about 25%), strong resistance to cassava mosaic disease, and yields often above 25 t/ha. Well suited for pounding and starch use.',
    image: 'https://i.pinimg.com/1200x/10/a2/9c/10a29c1102c3a8640056d4d98aa6a50e.jpg',
    traits: ['High yielding', 'CMD resistant', 'Good for fufu', 'High starch'],
  },
  {
    id: 2,
    name: 'Afisiafi',
    tagline: 'Early maturing, poundable',
    description:
      'Farmer-preferred variety that matures early and is easy to pound. Valued for food use and local processing across Ghana.',
    image: 'https://i.pinimg.com/1200x/10/a2/9c/10a29c1102c3a8640056d4d98aa6a50e.jpg',
    traits: ['Early maturity', 'Poundable', 'Food quality', 'Farmer preferred'],
  },
  {
    id: 3,
    name: 'Bankye Hemaa',
    tagline: 'Starch and gari',
    description:
      'Suited for gari and starch production. Good dry matter and processing quality for both household and small-scale industry.',
    image: 'https://i.pinimg.com/1200x/10/a2/9c/10a29c1102c3a8640056d4d98aa6a50e.jpg',
    traits: ['High starch', 'Gari quality', 'Processing', 'Dry matter'],
  },
  {
    id: 4,
    name: 'Tek Bankye',
    tagline: 'Drought tolerant, reliable',
    description:
      'Performs well under low rainfall and marginal soils. Valued for food security and as a reliable option in drier areas.',
    image: 'https://i.pinimg.com/1200x/10/a2/9c/10a29c1102c3a8640056d4d98aa6a50e.jpg',
    traits: ['Drought tolerant', 'Stable yield', 'Stress tolerant', 'Food security'],
  },
]

/**
 * Public page showcasing four cassava varieties with join-list signup.
 */
const Varieties = () => {
  const [expandedId, setExpandedId] = useState(null)
  const [formData, setFormData] = useState({})
  const [submittedId, setSubmittedId] = useState(null)

  const handleJoinClick = (id) => {
    setExpandedId(expandedId === id ? null : id)
    setFormData((prev) => ({ ...prev, [id]: { name: '', email: '' } }))
    setSubmittedId(submittedId === id ? null : submittedId)
  }

  const handleChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [field]: value },
    }))
  }

  const handleSubmit = (e, variety) => {
    e.preventDefault()
    const data = formData[variety.id] || {}
    const subject = encodeURIComponent(
      `Join variety list: ${variety.name}`
    )
    const body = encodeURIComponent(
      `I would like to join the variety list for ${variety.name}.\n\nName: ${data.name || '—'}\nEmail: ${data.email || '—'}\n\nSubmitted from Cassava Digital Varieties page.`
    )
    window.location.href = `mailto:info@cassavadigital.com?subject=${subject}&body=${body}`
    setSubmittedId(variety.id)
    setExpandedId(null)
  }

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold text-black md:text-4xl">
          Cassava Varieties
        </h2>
        <p className="max-w-2xl text-base text-slate-600">
          Explore four widely used cassava varieties in Ghana—each with distinct
          traits for yield, disease resistance, processing, and resilience.
          Join a variety list to get updates and growing tips.
        </p>
      </div>

      <div className="flex flex-col divide-y divide-slate-200">
        {varieties.map((variety, index) => {
          const isImageLeft = index % 2 === 0
          return (
            <article
              key={variety.id}
              className="flex flex-col gap-0 py-12 first:pt-0 last:pb-0 md:py-16"
            >
              <div className="grid gap-8 md:grid-cols-2 md:gap-12 md:items-center">
                <div
                  className={`aspect-[16/10] overflow-hidden bg-slate-100 md:aspect-[2/1] ${
                    isImageLeft ? 'md:order-1' : 'md:order-2'
                  }`}
                >
                  <img
                    src={variety.image}
                    alt={variety.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div
                  className={`flex flex-col justify-center md:py-4 ${
                    isImageLeft ? 'md:order-2' : 'md:order-1'
                  }`}
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-green-600">
                    {variety.tagline}
                  </span>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                    {variety.name}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    {variety.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {variety.traits.map((trait) => (
                      <span
                        key={trait}
                        className="inline-block border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>

                  {submittedId === variety.id ? (
                    <p className="mt-6 text-sm font-medium text-green-600">
                      Thanks! Check your email client to send your signup.
                      We&apos;ll add you to the {variety.name} list.
                    </p>
                  ) : expandedId === variety.id ? (
                    <form
                      onSubmit={(e) => handleSubmit(e, variety)}
                      className="mt-6 space-y-3"
                    >
                      <input
                        type="text"
                        placeholder="Your name"
                        value={formData[variety.id]?.name ?? ''}
                        onChange={(e) =>
                          handleChange(variety.id, 'name', e.target.value)
                        }
                        className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                      <input
                        type="email"
                        placeholder="Email address *"
                        required
                        value={formData[variety.id]?.email ?? ''}
                        onChange={(e) =>
                          handleChange(variety.id, 'email', e.target.value)
                        }
                        className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="rounded bg-green-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                          Join {variety.name} list
                        </button>
                        <button
                          type="button"
                          onClick={() => setExpandedId(null)}
                          className="rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleJoinClick(variety.id)}
                      className="mt-6 inline-flex w-fit items-center gap-2 border-b-2 border-green-500 pb-1 text-sm font-semibold text-slate-900 transition hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                    >
                      Join variety list
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default Varieties
