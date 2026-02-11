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
 * POST /api/register — create a new user account. Returns token + user (auto-login).
 * Body: { name, email, phone?, password }.
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' })
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }
    const existing = await User.findOne({ email: email.trim().toLowerCase() })
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists' })
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || '').trim(),
      passwordHash,
    })
    const token = signToken(user._id)
    res.status(201).json({ message: 'Account created', token, user: toUserPayload(user) })
  } catch (err) {
    console.error('POST /api/register error:', err)
    res.status(500).json({ error: 'Registration failed' })
  }
})

export default router
