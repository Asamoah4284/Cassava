const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

/**
 * Fetch all varieties from the backend.
 * @returns {Promise<Array<{ _id: string, name: string, tagline: string, description: string, image: string, traits: string[], pricePerAcre: number, pricePerKg: number }>>}
 */
export async function getVarieties() {
  const res = await fetch(`${API_BASE}/api/varieties`)
  if (!res.ok) throw new Error('Failed to fetch varieties')
  return res.json()
}

/**
 * Fetch a single variety by id (MongoDB _id).
 * @param {string} id
 * @returns {Promise<{ _id: string, name: string, tagline: string, description: string, image: string, traits: string[], pricePerAcre: number, pricePerKg: number } | null>}
 */
export async function getVariety(id) {
  const res = await fetch(`${API_BASE}/api/varieties/${id}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to fetch variety')
  return res.json()
}

/**
 * Submit an order (from purchase page). Saves to backend so admin can receive orders.
 */
export async function createOrder(data) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to submit order')
  return res.json()
}

/**
 * Create a user account. Body: { name, email, phone?, password }.
 */
export async function registerUser(data) {
  const res = await fetch(`${API_BASE}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Registration failed')
  }
  return res.json()
}
