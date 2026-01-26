import { memo } from 'react'

/**
 * Presents a section title with supporting text.
 * @param {object} props
 * @param {string} props.title - Primary heading.
 * @param {string} props.subtitle - Supporting copy.
 * @param {"left" | "center"} [props.align] - Text alignment.
 */
const SectionHeader = memo(function SectionHeader({
  title,
  subtitle,
  align = 'left',
}) {
  const alignment =
    align === 'center'
      ? 'items-center text-center'
      : 'items-start text-left'

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
        Cassava Digital
      </p>
      <h2 className="text-3xl font-semibold text-slate-900 dark:text-white md:text-4xl">
        {title}
      </h2>
      <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
        {subtitle}
      </p>
    </div>
  )
})

export default SectionHeader
