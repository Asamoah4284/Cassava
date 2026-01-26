import { Outlet, useLocation } from 'react-router-dom'
import SiteFooter from '../components/cyphill/SiteFooter'
import SiteHeader from '../components/cyphill/SiteHeader'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Knowledge Hub', to: '/knowledge' },
  { label: 'Research', to: '/research' },
  { label: 'Marketplace', to: '/marketplace' },
  { label: 'Consultancy', to: '/consultancy' },
]

const footerLinks = [
  { label: 'Contact & Support', to: '/contact' },
  { label: 'Cassava Knowledge Hub', to: '/knowledge' },
  { label: 'Research Highlights', to: '/research' },
  { label: 'Marketplace Preview', to: '/marketplace' },
]

/**
 * Shared shell for all public marketing pages.
 */
const PublicLayout = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen">
      <SiteHeader links={navLinks} variant={isHome ? 'overlay' : 'solid'} />
      <main
        className={`mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 ${isHome ? 'py-0' : 'py-12'
          }`}
      >
        <Outlet />
      </main>
      <SiteFooter links={footerLinks} />
    </div>
  )
}

export default PublicLayout
