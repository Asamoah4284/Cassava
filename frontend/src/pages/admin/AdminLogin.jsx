import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminLogin } from '../../api/admin'

const AdminLogin = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await adminLogin(password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">Admin login</h1>
        <p className="mt-1 text-sm text-slate-600">Enter your password to continue.</p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-green-500 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <Link
          to="/"
          className="mt-4 block text-center text-sm text-slate-500 hover:text-slate-700"
        >
          ← Back to site
        </Link>
      </div>
    </div>
  )
}

export default AdminLogin
