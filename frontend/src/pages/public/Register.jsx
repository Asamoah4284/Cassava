import { Link } from 'react-router-dom'

/**
 * Create an account page. Placeholder for future registration flow.
 */
const Register = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
          Create an account
        </h1>
        <p className="mt-2 max-w-xl text-slate-600">
          Account registration is coming soon. For now, please use Contact &amp; Support to get in touch with us about your order.
        </p>
      </div>
      <Link
        to="/contact"
        className="inline-flex w-fit items-center gap-2 border-b-2 border-green-500 pb-1 text-sm font-semibold text-slate-900 transition hover:border-green-400"
      >
        Contact &amp; Support
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
      <Link to="/" className="text-sm text-slate-600 hover:text-slate-900">
        ← Back to home
      </Link>
    </div>
  )
}

export default Register
