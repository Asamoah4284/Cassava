import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { adminLogout } from '../api/admin'

const nav = [
  { to: '/admin/varieties', label: 'Varieties' },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/research', label: 'Research' },
  { to: '/admin/consultations', label: 'Consultations' },
]

const AdminLayout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    adminLogout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="flex w-52 flex-col border-r border-slate-200 bg-white">
        <Link
          to="/admin"
          className="border-b border-slate-200 px-4 py-4 text-sm font-semibold text-slate-900"
        >
          Cassava Admin
        </Link>
        <nav className="flex flex-1 flex-col gap-0.5 p-3">
          {nav.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-green-50 text-green-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-3">
          <Link
            to="/"
            className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            View site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            Log out
          </button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-4 py-8 md:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
