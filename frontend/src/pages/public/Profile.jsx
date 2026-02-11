import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getMyOrders, updateProfile } from '../../api/client'

const formatDate = (d) => {
  if (!d) return '—'
  return new Date(d).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const PARTIAL_PAYMENT_PERCENT = 0.4

const orderStatusLabel = (status) => {
  switch (status) {
    case 'new':
      return { label: 'Pending order request', sub: 'Waiting for admin approval' }
    case 'approved':
      return { label: 'Approved', sub: 'Your order has been approved' }
    case 'contacted':
      return { label: 'In progress', sub: 'We have been in touch' }
    case 'completed':
      return { label: 'Completed', sub: null }
    case 'cancelled':
      return { label: 'Cancelled', sub: null }
    default:
      return { label: status || '—', sub: null }
  }
}

const TABS = { profile: 'Profile', orders: 'Orders' }

const Profile = () => {
  const { user, loading, updateUser } = useAuth()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(location.state?.tab === 'orders' ? 'orders' : 'profile')
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [saveError, setSaveError] = useState('')
  const [saving, setSaving] = useState(false)
  const [showPaymentSoonModal, setShowPaymentSoonModal] = useState(false)
  const [paymentModalMounted, setPaymentModalMounted] = useState(false)

  useEffect(() => {
    if (!showPaymentSoonModal) {
      setPaymentModalMounted(false)
      return
    }
    const t = requestAnimationFrame(() => setPaymentModalMounted(true))
    return () => cancelAnimationFrame(t)
  }, [showPaymentSoonModal])

  useEffect(() => {
    if (location.state?.tab === 'orders') setActiveTab('orders')
  }, [location.state?.tab])

  useEffect(() => {
    if (!user) return
    getMyOrders()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setOrdersLoading(false))
  }, [user])

  const startEditing = () => {
    setEditName(user.name || '')
    setEditEmail(user.email || '')
    setEditPhone(user.phone || '')
    setSaveError('')
    setEditing(true)
  }

  const cancelEditing = () => {
    setEditing(false)
    setSaveError('')
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setSaveError('')
    setSaving(true)
    try {
      const updated = await updateProfile({
        name: editName.trim(),
        email: editEmail.trim(),
        phone: editPhone.trim(),
      })
      updateUser(updated)
      setEditing(false)
    } catch (err) {
      setSaveError(err.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-white">
        <p className="text-slate-500">Loading…</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  const pendingOrdersCount = orders.filter((o) => o.status === 'new').length

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-12 md:px-6">
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>

        <div className="mt-8 border-b border-slate-200">
          <nav className="-mb-px flex gap-6" aria-label="Tabs">
            {Object.entries(TABS).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`inline-flex items-center gap-2 border-b-2 py-3 text-sm font-medium transition ${
                  activeTab === key
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                }`}
              >
                {label}
                {key === 'orders' && pendingOrdersCount > 0 && (
                  <span
                    className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1.5 text-xs font-semibold text-white"
                    aria-label={`${pendingOrdersCount} pending`}
                  >
                    {pendingOrdersCount > 99 ? '99+' : pendingOrdersCount}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'profile' && (
          <section className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-medium uppercase tracking-wider text-slate-400">Details</h2>
              {!editing ? (
                <button
                  type="button"
                  onClick={startEditing}
                  className="text-sm font-medium text-green-600 hover:text-green-700"
                >
                  Edit profile
                </button>
              ) : null}
            </div>
            {editing ? (
              <form onSubmit={handleSaveProfile} className="mt-4 flex flex-col gap-4">
                {saveError && (
                  <p className="bg-red-50 p-2 text-sm text-red-700">{saveError}</p>
                )}
                <div>
                  <label htmlFor="profile-name" className="block text-sm font-medium text-slate-700">Name</label>
                  <input
                    id="profile-name"
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="mt-1 w-full border border-slate-300 px-3 py-2 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="profile-email" className="block text-sm font-medium text-slate-700">Email</label>
                  <input
                    id="profile-email"
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="mt-1 w-full border border-slate-300 px-3 py-2 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="profile-phone" className="block text-sm font-medium text-slate-700">Phone</label>
                  <input
                    id="profile-phone"
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="mt-1 w-full border border-slate-300 px-3 py-2 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-green-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-green-400 disabled:opacity-60"
                  >
                    {saving ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </form>
            ) : (
              <dl className="mt-4 flex flex-col gap-3">
                <div>
                  <dt className="text-sm text-slate-500">Name</dt>
                  <dd className="mt-0.5 text-slate-900">{user.name || '—'}</dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-500">Email</dt>
                  <dd className="mt-0.5 text-slate-900">{user.email || '—'}</dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-500">Phone</dt>
                  <dd className="mt-0.5 text-slate-900">{user.phone || '—'}</dd>
                </div>
              </dl>
            )}
          </section>
        )}

        {activeTab === 'orders' && (
          <section className="mt-8">
            <h2 className="text-xs font-medium uppercase tracking-wider text-slate-400">Your orders</h2>
            {ordersLoading ? (
              <p className="mt-4 text-sm text-slate-500">Loading orders…</p>
            ) : orders.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">No orders yet.</p>
            ) : (
              <ul className="mt-4 divide-y divide-slate-100">
                {orders.map((order) => {
                  const statusInfo = orderStatusLabel(order.status)
                  const partialAmount = Math.round((order.totalCedis || 0) * PARTIAL_PAYMENT_PERCENT)
                  return (
                    <li key={order._id} className="py-4 first:pt-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="font-medium text-slate-900">{order.varietyName}</span>
                        <span className="text-sm text-slate-500">{formatDate(order.createdAt)}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">
                        {order.quantity} {order.type === 'stick' ? 'acre(s)' : 'kg'} · GHS {order.totalCedis}
                      </p>
                      <div className="mt-2">
                        <p className={`text-sm font-medium ${order.status === 'new' ? 'text-amber-600' : 'text-slate-700'}`}>
                          {statusInfo.label}
                        </p>
                        {statusInfo.sub && (
                          <p className="mt-0.5 text-xs text-slate-500">{statusInfo.sub}</p>
                        )}
                        {order.status === 'approved' && (
                          <button
                            type="button"
                            onClick={() => setShowPaymentSoonModal(true)}
                            className="mt-3 inline-flex items-center gap-1.5 border-b-2 border-green-500 pb-0.5 text-sm font-semibold text-green-600 hover:border-green-400 hover:text-green-700"
                          >
                            Pay partial payment (40% — GHS {partialAmount})
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>
        )}
      </div>

      {showPaymentSoonModal && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ease-out ${
            paymentModalMounted ? 'bg-black/50 opacity-100' : 'bg-black/0 opacity-0'
          }`}
          onClick={() => setShowPaymentSoonModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-soon-title"
        >
          <div
            className={`w-full max-w-sm border border-slate-200 bg-white p-6 shadow-lg transition-all duration-200 ease-out ${
              paymentModalMounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="payment-soon-title" className="text-lg font-semibold text-slate-900">Payment</h2>
            <p className="mt-2 text-slate-600">Payment coming soon.</p>
            <button
              type="button"
              onClick={() => setShowPaymentSoonModal(false)}
              className="mt-4 w-full bg-green-500 py-2 text-sm font-semibold text-slate-900 hover:bg-green-400"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
