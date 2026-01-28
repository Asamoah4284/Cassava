import { Outlet, useLocation } from 'react-router-dom'
import SiteFooter from '../components/cyphill/SiteFooter'
import SiteHeader from '../components/cyphill/SiteHeader'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Cassava News', to: '/knowledge' },
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
  const isKnowledgeHub = location.pathname === '/knowledge'

  // KnowledgeHub has its own custom header and footer
  if (isKnowledgeHub) {
    return (
      <div className="min-h-screen">
        <Outlet />
      </div>
    )
  }

  const isMarketplace = location.pathname === '/marketplace'
  const isConsultancy = location.pathname === '/consultancy'
  const shouldHaveWhiteBg = isMarketplace || isConsultancy

  return (
    <div className={`min-h-screen ${shouldHaveWhiteBg ? 'bg-slate-50' : ''}`}>
      <SiteHeader links={navLinks} variant={isHome ? 'overlay' : 'solid'} />
      <main
        className={`mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 md:px-6 ${
          isHome ? 'py-0' : 'py-12'
        }`}
      >
        <Outlet />
      </main>
      <SiteFooter links={footerLinks} />
    </div>
  )
}

export default PublicLayout
