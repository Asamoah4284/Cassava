import { useEffect, useState } from 'react'
import { getConsultations, updateConsultationStatus } from '../../api/admin'

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

const formatDate = (d) => {
  if (!d) return '—'
  const date = new Date(d)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const DetailModal = ({ consultation, onClose }) => {
  if (!consultation) return null
  const c = consultation
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-900">Consultation request</h3>
        <p className="mt-1 text-sm text-slate-500">{formatDate(c.createdAt)}</p>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="font-medium text-slate-500">Full name</dt>
            <dd className="mt-0.5 text-slate-900">{c.fullName}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Email</dt>
            <dd className="mt-0.5 text-slate-900">{c.email}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Phone</dt>
            <dd className="mt-0.5 text-slate-900">{c.phone || '—'}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Consultation type</dt>
            <dd className="mt-0.5 text-slate-900">{c.consultationType}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Preferred date</dt>
            <dd className="mt-0.5 text-slate-900">{c.preferredDate || '—'}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Preferred time</dt>
            <dd className="mt-0.5 text-slate-900">{c.preferredTime || '—'}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Message</dt>
            <dd className="mt-0.5 whitespace-pre-wrap text-slate-900">{c.message}</dd>
          </div>
        </dl>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

const AdminConsultations = () => {
  const [consultations, setConsultations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewing, setViewing] = useState(null)

  const load = () => {
    setLoading(true)
    getConsultations()
      .then(setConsultations)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const handleStatusChange = async (id, status) => {
    try {
      const updated = await updateConsultationStatus(id, status)
      setConsultations((prev) => prev.map((c) => (c._id === updated._id ? updated : c)))
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading && consultations.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-600">
        Loading consultations…
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-slate-900">Consultations</h1>
        <button
          type="button"
          onClick={() => load()}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-60"
          aria-label="Refresh consultations"
        >
          <svg
            className={`h-4 w-4 text-slate-600 ${loading ? 'animate-spin' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full table-fixed divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="w-36 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                Date
              </th>
              <th className="w-28 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                Name
              </th>
              <th className="w-[14%] px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                Email
              </th>
              <th className="w-24 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                Phone
              </th>
              <th className="w-[12%] px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                Type
              </th>
              <th className="w-28 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                Preferred
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                Message
              </th>
              <th className="w-28 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                Status
              </th>
              <th className="w-20 px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {consultations.map((c) => (
              <tr key={c._id}>
                <td className="w-36 whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                  {formatDate(c.createdAt)}
                </td>
                <td className="w-28 max-w-0 px-4 py-3">
                  <span className="block truncate font-medium text-slate-900" title={c.fullName}>
                    {c.fullName}
                  </span>
                </td>
                <td className="w-[14%] max-w-0 px-4 py-3">
                  <span className="block truncate text-sm text-slate-600" title={c.email}>
                    {c.email}
                  </span>
                </td>
                <td className="w-24 truncate px-4 py-3 text-sm text-slate-600" title={c.phone || ''}>
                  {c.phone || '—'}
                </td>
                <td className="w-[12%] max-w-0 px-4 py-3">
                  <span className="block truncate text-sm text-slate-600" title={c.consultationType}>
                    {c.consultationType}
                  </span>
                </td>
                <td className="w-28 max-w-0 px-4 py-3">
                  <span className="block truncate text-sm text-slate-600" title={`${c.preferredDate || ''} ${c.preferredTime || ''}`.trim() || '—'}>
                    {c.preferredDate || '—'} {c.preferredTime ? `· ${c.preferredTime}` : ''}
                  </span>
                </td>
                <td className="max-w-0 px-4 py-3">
                  <span className="block truncate text-sm text-slate-600" title={c.message}>
                    {c.message}
                  </span>
                </td>
                  <td className="px-4 py-3">
                    <select
                      value={c.status}
                      onChange={(e) => handleStatusChange(c._id, e.target.value)}
                      className="rounded border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setViewing(c)}
                      className="text-sm font-medium text-green-600 hover:text-green-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        {consultations.length === 0 && !loading && (
          <p className="p-6 text-center text-slate-500">No consultation requests yet.</p>
        )}
      </div>
      {viewing && (
        <DetailModal consultation={viewing} onClose={() => setViewing(null)} />
      )}
    </div>
  )
}

export default AdminConsultations
