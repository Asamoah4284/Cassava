import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getVarieties } from '../../api/client'

/**
 * Cassava varieties commonly grown in Ghana and the wider region.
 * Each variety has two types: stick (planting material, pricePerAcre) and food (consumption, pricePerKg).
 */
export const VARIETY_TYPES = { STICK: 'stick', FOOD: 'food' }

/**
 * Public page showcasing cassava varieties from the backend API with link to purchase variety list.
 */
const Varieties = () => {
  const [varieties, setVarieties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    getVarieties()
      .then((data) => {
        if (!cancelled) setVarieties(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  if (loading) {
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
          {[1, 2, 3, 4].map((i) => (
            <article
              key={i}
              className="flex flex-col gap-0 py-12 first:pt-0 last:pb-0 md:py-16"
              aria-hidden
            >
              <div className="grid gap-8 md:grid-cols-2 md:gap-12 md:items-center">
                <div
                  className={`aspect-[16/10] overflow-hidden rounded bg-slate-200 animate-pulse md:aspect-[2/1] ${
                    i % 2 === 0 ? 'md:order-1' : 'md:order-2'
                  }`}
                />
                <div
                  className={`flex flex-col justify-center md:py-4 ${
                    i % 2 === 0 ? 'md:order-2' : 'md:order-1'
                  }`}
                >
                  <div className="h-3 w-24 rounded bg-slate-200 animate-pulse" />
                  <div className="mt-2 h-8 w-3/4 rounded bg-slate-200 animate-pulse md:h-9" />
                  <div className="mt-4 h-4 w-full rounded bg-slate-200 animate-pulse" />
                  <div className="mt-2 h-4 w-full rounded bg-slate-200 animate-pulse" />
                  <div className="mt-2 h-4 w-2/3 rounded bg-slate-200 animate-pulse" />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[1, 2, 3, 4].map((j) => (
                      <span
                        key={j}
                        className="inline-block h-6 w-20 rounded border border-slate-200 bg-slate-100"
                      />
                    ))}
                  </div>
                  <div className="mt-6 h-5 w-44 rounded bg-slate-200 animate-pulse" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col gap-16">
        <p className="text-red-600">Failed to load varieties: {error}</p>
      </div>
    )
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
              key={variety._id}
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

                  <Link
                    to={`/varieties/${variety._id}/purchase`}
                    className="mt-6 inline-flex w-fit items-center gap-2 border-b-2 border-green-500 pb-1 text-sm font-semibold text-slate-900 transition hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                  >
                    Purchase this variety list
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
                  </Link>
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
