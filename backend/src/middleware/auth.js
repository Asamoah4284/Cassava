/**
 * Require valid admin token in Authorization: Bearer <token>.
 * Use after admin login (token = ADMIN_TOKEN from env).
 */
export function requireAdmin(req, res, next) {
  const auth = req.headers.authorization
  const token = process.env.ADMIN_TOKEN
  if (!token) {
    return res.status(503).json({ error: 'Admin not configured' })
  }
  if (!auth || auth !== `Bearer ${token}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}
