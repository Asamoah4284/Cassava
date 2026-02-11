import express from 'express'
import { requireUserAuth } from '../middleware/userAuth.js'
import Order from '../models/Order.js'
import User from '../models/User.js'

const router = express.Router()

/**
 * GET /api/me — current user profile (requires Bearer token).
 */
router.get('/', requireUserAuth, (req, res) => {
  res.json(req.user)
})

/**
 * PATCH /api/me — update current user profile. Body: { name?, email?, phone? }.
 */
router.patch('/', requireUserAuth, async (req, res) => {
  try {
    const { name, email, phone } = req.body
    const update = {}
    if (name != null) update.name = name.trim()
    if (email != null) {
      const newEmail = email.trim().toLowerCase()
      if (newEmail !== req.user.email) {
        const existing = await User.findOne({ email: newEmail })
        if (existing) {
          return res.status(400).json({ error: 'An account with this email already exists' })
        }
        update.email = newEmail
      }
    }
    if (phone != null) update.phone = phone.trim()
    const user = await User.findByIdAndUpdate(
      req.user.id,
      update,
      { new: true }
    )
      .select('name email phone')
      .lean()
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone || '',
    })
  } catch (err) {
    console.error('PATCH /api/me error:', err)
    res.status(500).json({ error: 'Failed to update profile' })
  }
})

/**
 * GET /api/me/orders — orders for the current user.
 */
router.get('/orders', requireUserAuth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .lean()
    res.json(orders)
  } catch (err) {
    console.error('GET /api/me/orders error:', err)
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

/**
 * GET /api/me/orders/pending-count — count of orders with status 'new' (for nav badge).
 */
router.get('/orders/pending-count', requireUserAuth, async (req, res) => {
  try {
    const count = await Order.countDocuments({ userId: req.user.id, status: 'new' })
    res.json({ count })
  } catch (err) {
    console.error('GET /api/me/orders/pending-count error:', err)
    res.status(500).json({ error: 'Failed to fetch count' })
  }
})

export default router
