const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const USER_TOKEN_KEY = 'cassava_user_token'
const USER_KEY = 'cassava_user'

export function getToken() {
  return localStorage.getItem(USER_TOKEN_KEY)
}

export function setToken(token) {
  if (token) localStorage.setItem(USER_TOKEN_KEY, token)
  else localStorage.removeItem(USER_TOKEN_KEY)
}

export function getUser() {
  try {
    const s = localStorage.getItem(USER_KEY)
    return s ? JSON.parse(s) : null
  } catch {
    return null
  }
}

export function setUser(user) {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
  else localStorage.removeItem(USER_KEY)
}

export function clearAuth() {
  localStorage.removeItem(USER_TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

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
 * Create a user account. Returns { token, user }. Body: { name, email, phone?, password }.
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

/**
 * User login. Returns { token, user }. Body: { email, password }.
 */
export async function loginUser(data) {
  const res = await fetch(`${API_BASE}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Login failed')
  }
  return res.json()
}

/**
 * Get current user profile. Requires token.
 */
export async function getMe(token) {
  const t = token || getToken()
  if (!t) throw new Error('Not authenticated')
  const res = await fetch(`${API_BASE}/api/me`, {
    headers: { Authorization: `Bearer ${t}` },
  })
  if (!res.ok) throw new Error('Not authenticated')
  return res.json()
}

/**
 * Get current user's orders. Requires token.
 */
export async function getMyOrders() {
  const t = getToken()
  if (!t) throw new Error('Not authenticated')
  const res = await fetch(`${API_BASE}/api/me/orders`, {
    headers: { Authorization: `Bearer ${t}` },
  })
  if (!res.ok) throw new Error('Failed to fetch orders')
  return res.json()
}

/**
 * Get count of pending orders (status 'new') for the current user. For nav badge.
 */
export async function getPendingOrdersCount() {
  const t = getToken()
  if (!t) return 0
  const res = await fetch(`${API_BASE}/api/me/orders/pending-count`, {
    headers: { Authorization: `Bearer ${t}` },
  })
  if (!res.ok) return 0
  const data = await res.json()
  return data.count ?? 0
}

/**
 * Update current user profile. Body: { name?, email?, phone? }. Returns updated user.
 */
export async function updateProfile(data) {
  const t = getToken()
  if (!t) throw new Error('Not authenticated')
  const res = await fetch(`${API_BASE}/api/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${t}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to update profile')
  }
  return res.json()
}

/**
 * Fetch all research posts (public).
 */
export async function getResearch() {
  const res = await fetch(`${API_BASE}/api/research`)
  if (!res.ok) throw new Error('Failed to fetch research')
  return res.json()
}

/**
 * Fetch a single research post by id.
 */
export async function getResearchPost(id) {
  const res = await fetch(`${API_BASE}/api/research/${id}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to fetch research post')
  return res.json()
}

/**
 * Submit a consultation request (public). Body: fullName, email, phone?, consultationType, preferredDate?, preferredTime?, message.
 */
export async function submitConsultation(data) {
  const res = await fetch(`${API_BASE}/api/consultations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to submit consultation request')
  }
  return res.json()
}
