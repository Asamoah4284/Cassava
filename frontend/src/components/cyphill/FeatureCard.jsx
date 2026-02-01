import { memo } from 'react'

/**
 * Highlights a platform capability or benefit.
 * @param {object} props
 * @param {string} props.title - Card title.
 * @param {string} props.description - Supporting description.
 */
const FeatureCard = memo(function FeatureCard({ title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-green-200/70">
      <h3 className="text-lg font-semibold text-slate-900">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {description}
      </p>
    </div>
  )
})

export default FeatureCard
