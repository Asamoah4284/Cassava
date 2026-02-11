import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const secret = process.env.JWT_SECRET
if (!secret) {
  console.warn('JWT_SECRET not set — user auth will fail')
}

/**
 * Optional user auth: if valid Bearer token, set req.user (id, name, email, phone).
 * Does not 401 if missing/invalid.
 */
export async function optionalUserAuth(req, res, next) {
  const auth = req.headers.authorization
  if (!secret || !auth || !auth.startsWith('Bearer ')) {
    return next()
  }
  const token = auth.slice(7)
  try {
    const payload = jwt.verify(token, secret)
    const user = await User.findById(payload.userId).select('name email phone').lean()
    if (user) {
      req.user = { id: user._id.toString(), name: user.name, email: user.email, phone: user.phone }
    }
  } catch {
    // ignore invalid token
  }
  next()
}

/**
 * Require user auth: 401 if no valid token.
 */
export async function requireUserAuth(req, res, next) {
  const auth = req.headers.authorization
  if (!secret) {
    return res.status(503).json({ error: 'Auth not configured' })
  }
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const token = auth.slice(7)
  try {
    const payload = jwt.verify(token, secret)
    const user = await User.findById(payload.userId).select('name email phone').lean()
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    req.user = { id: user._id.toString(), name: user.name, email: user.email, phone: user.phone }
    next()
  } catch {
    res.status(401).json({ error: 'Unauthorized' })
  }
}

export function signToken(userId) {
  if (!secret) throw new Error('JWT_SECRET not set')
  return jwt.sign({ userId }, secret, { expiresIn: '7d' })
}
