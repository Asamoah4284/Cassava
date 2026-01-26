import { memo } from 'react'

/**
 * Displays a key metric for the platform vision.
 * @param {object} props
 * @param {string} props.label - Metric label.
 * @param {string} props.value - Metric value.
 */
const StatCard = memo(function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-2xl font-semibold text-slate-900 dark:text-white">
        {value}
      </p>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        {label}
      </p>
    </div>
  )
})

export default StatCard
