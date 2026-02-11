import { useState } from 'react'
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
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    adminLogout()
    navigate('/admin/login', { replace: true })
  }

  const closeSidebar = () => setSidebarOpen(false)

  const SidebarContent = () => (
    <>
      <Link
        to="/admin"
        onClick={closeSidebar}
        className="border-b border-slate-200 px-4 py-4 text-sm font-semibold text-slate-900"
      >
        Cassava Admin
      </Link>
      <nav className="flex flex-1 flex-col gap-0.5 p-3">
        {nav.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={closeSidebar}
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
          onClick={closeSidebar}
          className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        >
          View site
        </Link>
        <button
          type="button"
          onClick={() => {
            handleLogout()
            closeSidebar()
          }}
          className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        >
          Log out
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile menu button */}
      <header className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Open menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-slate-900">Cassava Admin</span>
        <div className="w-10" />
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={closeSidebar}
          aria-hidden
        />
      )}

      {/* Sidebar: overlay on mobile, static on desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 md:relative md:inset-auto md:flex md:w-52 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b border-slate-200 px-4 md:hidden">
          <span className="font-semibold text-slate-900">Menu</span>
          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <SidebarContent />
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1 px-4 pb-8 pt-20 md:px-8 md:pt-8">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
