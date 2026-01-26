import { memo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import PrimaryButton from './PrimaryButton'

/**
 * Primary navigation header for public pages.
 * @param {object} props
 * @param {{ label: string, to: string }[]} props.links - Navigation links.
 * @param {"solid" | "overlay"} [props.variant] - Visual variant for layout.
 */
const SiteHeader = memo(function SiteHeader({ links, variant = 'solid' }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isOverlay = variant === 'overlay'

  const headerClasses = isOverlay
    ? 'sticky left-0 top-0 z-20 w-full border-y border-white/15 bg-black/40 backdrop-blur'
    : 'sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80'

  const brandClasses = isOverlay
    ? 'text-amber-300'
    : 'text-amber-600 dark:text-amber-400'

  const subtitleClasses = isOverlay
    ? 'text-white/70'
    : 'text-slate-500 dark:text-slate-400'

  const navClasses = isOverlay
    ? 'text-white/80'
    : 'text-slate-600 dark:text-slate-300'

  const navActive = isOverlay
    ? 'text-amber-300'
    : 'text-amber-600 dark:text-amber-400'

  const navHover = isOverlay
    ? 'hover:text-amber-200'
    : 'hover:text-amber-600 dark:hover:text-amber-400'

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={headerClasses}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <div className="flex flex-col">
          <span
            className={`text-sm font-semibold uppercase tracking-[0.2em] ${brandClasses}`}
          >
            Cassava Digital
          </span>
          <span className={`text-xs ${subtitleClasses}`}>
            Knowledge, consultancy, and market platform
          </span>
        </div>
        <nav
          className={`hidden items-center gap-5 text-sm font-medium md:flex ${navClasses}`}
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition ${navHover} ${isActive ? navActive : ''}`
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        {isOverlay ? (
          <div className="hidden items-center gap-3 md:flex">
            <div className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs text-white/80">
              +233 000 000 000
            </div>
            <Link
              className="rounded-full bg-amber-400 px-5 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-amber-300"
              to="/contact"
            >
              Get In Touch
            </Link>
          </div>
        ) : (
          <div className="hidden items-center gap-3 md:flex">
            <PrimaryButton to="/contact" variant="secondary">
              Contact
            </PrimaryButton>
            <PrimaryButton to="/marketplace">Explore Market</PrimaryButton>
          </div>
        )}

        {/* Hamburger Menu Button - Mobile Only */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          className={`transition-transform duration-300 md:hidden ${
            isOverlay ? 'text-white' : 'text-slate-900 dark:text-white'
          } ${isMobileMenuOpen ? 'rotate-90' : ''}`}
        >
          {isMobileMenuOpen ? (
            <svg
              className="h-6 w-6 transition-opacity duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6 transition-opacity duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'max-h-screen opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        } ${
          isOverlay
            ? 'border-t border-white/15 bg-black/60 backdrop-blur'
            : 'border-t border-slate-200/70 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95'
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 py-4">
          <nav className="flex flex-col gap-4">
            {links.map((link, index) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-200 ${navHover} ${
                    isActive ? navActive : navClasses
                  } ${
                    isMobileMenuOpen
                      ? 'translate-x-0 opacity-100'
                      : '-translate-x-4 opacity-0'
                  }`
                }
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                }}
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ))}
            <div
              className={`mt-4 flex flex-col gap-3 transition-all duration-300 ${
                isMobileMenuOpen
                  ? 'translate-y-0 opacity-100 delay-200'
                  : 'translate-y-4 opacity-0'
              }`}
            >
              {isOverlay ? (
                <>
                  <div className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-center text-xs text-white/80">
                    +233 000 000 000
                  </div>
                  <Link
                    className="rounded-full bg-amber-400 px-5 py-2 text-center text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-amber-300"
                    to="/contact"
                    onClick={closeMobileMenu}
                  >
                    Get In Touch
                  </Link>
                </>
              ) : (
                <>
                  <PrimaryButton
                    to="/contact"
                    variant="secondary"
                    onClick={closeMobileMenu}
                  >
                    Contact
                  </PrimaryButton>
                  <PrimaryButton to="/marketplace" onClick={closeMobileMenu}>
                    Explore Market
                  </PrimaryButton>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
})

export default SiteHeader
