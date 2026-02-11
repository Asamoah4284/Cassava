import { memo, useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getPendingOrdersCount } from '../../api/client'
import LoginModal from '../LoginModal'

/**
 * Primary navigation header for public pages.
 * @param {object} props
 * @param {{ label: string, to: string }[]} props.links - Navigation links.
 * @param {"solid" | "overlay"} [props.variant] - Visual variant for layout.
 */
const SiteHeader = memo(function SiteHeader({ links, variant = 'solid' }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0)
  const profileRef = useRef(null)
  const { user, loading, logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    if (!user) {
      setPendingOrdersCount(0)
      return
    }
    getPendingOrdersCount()
      .then(setPendingOrdersCount)
      .catch(() => setPendingOrdersCount(0))
  }, [user, location.pathname])
  const isOverlay = variant === 'overlay'

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Always use dark theme for navigation
  const headerClasses = isOverlay
    ? 'sticky left-0 top-0 z-20 w-full border-y border-white/15 bg-[#10111F] backdrop-blur'
    : 'sticky top-0 z-20 w-full bg-[#10111F]'

  const brandClasses = 'text-green-400'

  const subtitleClasses = 'text-gray-300'

  const navClasses = 'text-gray-300'

  const navActive = 'text-green-400'

  const navHover = 'hover:text-green-300'

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={headerClasses}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link to="/" className="flex flex-col transition hover:opacity-90">
          <span
            className={`text-sm font-semibold uppercase tracking-[0.2em] ${brandClasses}`}
          >
            Cassava Digital
          </span>
          <span className={`text-xs ${subtitleClasses}`}>
            Knowledge, consultancy, and market platform
          </span>
        </Link>
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
        <div className="hidden items-center gap-3 md:flex">
          {!loading && user ? (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((o) => !o)}
                className="relative flex items-center gap-2 rounded-lg bg-[#222434] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#2a2d42]"
                aria-expanded={profileOpen}
                aria-haspopup="true"
              >
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#00C26D] text-sm font-semibold text-white">
                  {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                  {pendingOrdersCount > 0 && (
                    <span
                      className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white"
                      aria-label={`${pendingOrdersCount} pending order${pendingOrdersCount !== 1 ? 's' : ''}`}
                    >
                      {pendingOrdersCount > 99 ? '99+' : pendingOrdersCount}
                    </span>
                  )}
                </span>
                <span className="max-w-[120px] truncate text-gray-300">{user.name || user.email}</span>
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full z-30 mt-1 min-w-[160px] rounded-lg border border-white/10 bg-[#10111F] py-1 shadow-lg">
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => { logout(); setProfileOpen(false) }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setLoginOpen(true)}
                className="rounded-lg bg-[#222434] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2a2d42]"
              >
                Sign in
              </button>
              <Link
                to="/marketplace"
                className="rounded-lg bg-[#00C26D] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#00b362]"
              >
                Explore Market
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu Button - Mobile Only */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          className={`transition-transform duration-300 md:hidden text-white ${
            isMobileMenuOpen ? 'rotate-90' : ''
          }`}
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
        } border-t border-white/10 bg-[#10111F]`}
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
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="rounded-lg bg-[#222434] px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-[#2a2d42]"
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => { logout(); closeMobileMenu() }}
                    className="rounded-lg bg-[#222434] px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-[#2a2d42]"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => { setLoginOpen(true); closeMobileMenu() }}
                    className="rounded-lg bg-[#222434] px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-[#2a2d42]"
                  >
                    Sign in
                  </button>
                  <Link
                    to="/marketplace"
                    onClick={closeMobileMenu}
                    className="rounded-lg bg-[#00C26D] px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-[#00b362]"
                  >
                    Explore Market
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>

      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </header>
  )
})

export default SiteHeader
