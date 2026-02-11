import express from 'express'
import { requireAdmin } from '../middleware/auth.js'

const router = express.Router()

/**
 * POST /api/admin/login — authenticate admin.
 * Body: { password } or { username, password }.
 * Returns { token } if password matches ADMIN_PASSWORD. Frontend stores token and sends Authorization: Bearer <token>.
 */
router.post('/login', (req, res) => {
  const password = req.body.password
  const adminPassword = process.env.ADMIN_PASSWORD
  const adminToken = process.env.ADMIN_TOKEN
  if (!adminPassword || !adminToken) {
    return res.status(503).json({ error: 'Admin login not configured' })
  }
  if (password !== adminPassword) {
    return res.status(401).json({ error: 'Invalid password' })
  }
  res.json({ token: adminToken })
})

/**
 * GET /api/admin/me — check if token is valid (optional, for frontend to verify session).
 */
router.get('/me', requireAdmin, (req, res) => {
  res.json({ ok: true, role: 'admin' })
})

export default router
