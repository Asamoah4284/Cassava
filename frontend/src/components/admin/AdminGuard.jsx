import { Navigate, useLocation } from 'react-router-dom'
import { getAdminToken } from '../../api/admin'

/**
 * Redirect to /admin/login if not authenticated.
 */
const AdminGuard = ({ children }) => {
  const location = useLocation()
  const token = getAdminToken()
  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }
  return children
}

export default AdminGuard
