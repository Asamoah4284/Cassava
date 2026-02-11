import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import { signToken } from '../middleware/userAuth.js'

const router = express.Router()

function toUserPayload(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone || '',
  }
}

/**
 * POST /api/login — user login. Body: { email, password }. Returns { token, user }.
 */
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }
    const user = await User.findOne({ email: email.trim().toLowerCase() }).lean()
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    const match = await bcrypt.compare(password, user.passwordHash)
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    const token = signToken(user._id)
    res.json({ token, user: toUserPayload(user) })
  } catch (err) {
    console.error('POST /api/login error:', err)
    res.status(500).json({ error: 'Login failed' })
  }
})

export default router
