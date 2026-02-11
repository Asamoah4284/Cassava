import { useState } from 'react'
import { registerUser } from '../api/client'

const CreateAccountModal = ({ onClose, onSuccess }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim() || !email.trim() || !password) {
      setError('Name, email and password are required.')
      return
    }
    setSubmitting(true)
    try {
      await registerUser({ name: name.trim(), email: email.trim(), phone: phone.trim(), password })
      onSuccess?.()
      onClose()
    } catch (err) {
      setError(err.message || 'Could not create account')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-account-title"
    >
      <div className="w-full max-w-md border border-slate-200 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 id="create-account-title" className="text-lg font-semibold text-slate-900">Create an account</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          {error && (
            <p className="bg-red-50 p-2 text-sm text-red-700">{error}</p>
          )}
          <div>
            <label htmlFor="create-name" className="block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              id="create-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-slate-300 px-3 py-2 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label htmlFor="create-email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="create-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-slate-300 px-3 py-2 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label htmlFor="create-phone" className="block text-sm font-medium text-slate-700">
              Phone
            </label>
            <input
              id="create-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full border border-slate-300 px-3 py-2 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="create-password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="create-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              className="mt-1 w-full border border-slate-300 px-3 py-2 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              required
            />
            <p className="mt-1 text-xs text-slate-500">At least 6 characters</p>
          </div>
          <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-green-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-green-400 disabled:opacity-60"
            >
              {submitting ? 'Creating…' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateAccountModal
