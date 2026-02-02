import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'
import PublicLayout from '../layouts/PublicLayout'
import About from '../pages/public/About'
import ConsultancyOverview from '../pages/public/ConsultancyOverview'
import ContactSupport from '../pages/public/ContactSupport'
import Home from '../pages/public/Home'
import KnowledgeHub from '../pages/public/KnowledgeHub'
import MarketplacePreview from '../pages/public/MarketplacePreview'
import ResearchHighlights from '../pages/public/ResearchHighlights'
import Varieties from '../pages/public/Varieties'
import VarietyPurchase from '../pages/public/VarietyPurchase'

/**
 * App routing configuration for public pages.
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/knowledge" element={<KnowledgeHub />} />
          <Route path="/varieties" element={<Varieties />} />
          <Route path="/varieties/:id/purchase" element={<VarietyPurchase />} />
          <Route path="/research" element={<ResearchHighlights />} />
          <Route path="/marketplace" element={<MarketplacePreview />} />
          <Route path="/consultancy" element={<ConsultancyOverview />} />
          <Route path="/contact" element={<ContactSupport />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
