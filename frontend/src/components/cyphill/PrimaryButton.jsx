import { memo } from 'react'
import { Link } from 'react-router-dom'

const baseClasses =
  'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

const variants = {
  primary:
    'bg-emerald-600 text-white hover:bg-emerald-500 focus-visible:outline-emerald-600 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 dark:focus-visible:outline-emerald-400',
  secondary:
    'border border-slate-200 bg-white text-slate-900 hover:border-emerald-200 hover:text-emerald-700 focus-visible:outline-emerald-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-emerald-500/40 dark:hover:text-emerald-300 dark:focus-visible:outline-emerald-400',
}

/**
 * Renders a styled button or router link.
 * @param {object} props
 * @param {string} [props.to] - Optional route path for navigation.
 * @param {React.ReactNode} props.children - Button content.
 * @param {string} [props.variant] - Visual variant name.
 * @param {string} [props.className] - Optional class overrides.
 * @param {string} [props.type] - Button type when rendered as a button.
 * @param {Function} [props.onClick] - Click handler for button usage.
 */
const PrimaryButton = memo(function PrimaryButton({
  to,
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  onClick,
}) {
  const classes = `${baseClasses} ${variants[variant] ?? variants.primary} ${className}`

  if (to) {
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} type={type} onClick={onClick}>
      {children}
    </button>
  )
})

export default PrimaryButton
