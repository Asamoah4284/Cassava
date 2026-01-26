import { memo } from 'react'

/**
 * Highlights a platform capability or benefit.
 * @param {object} props
 * @param {string} props.title - Card title.
 * @param {string} props.description - Supporting description.
 */
const FeatureCard = memo(function FeatureCard({ title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200/70 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/30">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {description}
      </p>
    </div>
  )
})

export default FeatureCard
