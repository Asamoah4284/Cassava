import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User.js'

const router = express.Router()

/**
 * POST /api/register — create a new user account.
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
    await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || '').trim(),
      passwordHash,
    })
    res.status(201).json({ message: 'Account created' })
  } catch (err) {
    console.error('POST /api/register error:', err)
    res.status(500).json({ error: 'Registration failed' })
  }
})

export default router
