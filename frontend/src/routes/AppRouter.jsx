import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'
import AdminGuard from '../components/admin/AdminGuard'
import PublicLayout from '../layouts/PublicLayout'
import AdminLayout from '../layouts/AdminLayout'
import About from '../pages/public/About'
import ConsultancyOverview from '../pages/public/ConsultancyOverview'
import Home from '../pages/public/Home'
import KnowledgeHub from '../pages/public/KnowledgeHub'
import MarketplacePreview from '../pages/public/MarketplacePreview'
import ResearchHighlights from '../pages/public/ResearchHighlights'
import Varieties from '../pages/public/Varieties'
import VarietyPurchase from '../pages/public/VarietyPurchase'
import Register from '../pages/public/Register'
import Profile from '../pages/public/Profile'
import AdminLogin from '../pages/admin/AdminLogin'
import AdminVarieties from '../pages/admin/AdminVarieties'
import AdminOrders from '../pages/admin/AdminOrders'
import AdminResearch from '../pages/admin/AdminResearch'
import AdminConsultations from '../pages/admin/AdminConsultations'

/**
 * App routing configuration for public and admin pages.
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
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }
        >
          <Route index element={<Navigate to="/admin/varieties" replace />} />
          <Route path="varieties" element={<AdminVarieties />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="research" element={<AdminResearch />} />
          <Route path="consultations" element={<AdminConsultations />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
