const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const ADMIN_TOKEN_KEY = 'cassava_admin_token'

export function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY)
}

export function setAdminToken(token) {
  if (token) localStorage.setItem(ADMIN_TOKEN_KEY, token)
  else localStorage.removeItem(ADMIN_TOKEN_KEY)
}

function authHeaders() {
  const token = getAdminToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export async function adminLogin(password) {
  const res = await fetch(`${API_BASE}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || 'Login failed')
  }
  const { token } = await res.json()
  setAdminToken(token)
  return token
}

export async function adminLogout() {
  setAdminToken(null)
}

export async function adminCheck() {
  const res = await fetch(`${API_BASE}/api/admin/me`, { headers: authHeaders() })
  return res.ok
}

export async function getOrders() {
  const res = await fetch(`${API_BASE}/api/orders`, { headers: authHeaders() })
  if (!res.ok) throw new Error('Failed to fetch orders')
  return res.json()
}

export async function updateOrderStatus(orderId, status) {
  const res = await fetch(`${API_BASE}/api/orders/${orderId}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error('Failed to update order')
  return res.json()
}

export async function createVariety(body) {
  const res = await fetch(`${API_BASE}/api/varieties`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Failed to create variety')
  return res.json()
}

export async function updateVariety(id, body) {
  const res = await fetch(`${API_BASE}/api/varieties/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Failed to update variety')
  return res.json()
}

export async function deleteVariety(id) {
  const res = await fetch(`${API_BASE}/api/varieties/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error('Failed to delete variety')
}

/**
 * Upload an image file. Returns { url }.
 */
export async function uploadImage(file) {
  const token = getAdminToken()
  if (!token) throw new Error('Not authenticated')
  const formData = new FormData()
  formData.append('image', file)
  const res = await fetch(`${API_BASE}/api/admin/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || 'Upload failed')
  }
  const data = await res.json()
  return data.url
}
