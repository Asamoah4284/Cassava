import express from 'express'
import Order from '../models/Order.js'
import { requireAdmin } from '../middleware/auth.js'

const router = express.Router()

/**
 * POST /api/orders — create order (public, e.g. from purchase page).
 */
router.post('/', async (req, res) => {
  try {
    const { varietyId, varietyName, type, quantity, totalCedis, customerEmail, userId } = req.body
    if (!varietyId || !varietyName || !type || quantity == null || totalCedis == null) {
      return res.status(400).json({ error: 'Missing required fields: varietyId, varietyName, type, quantity, totalCedis' })
    }
    if (!['stick', 'food'].includes(type)) {
      return res.status(400).json({ error: 'type must be stick or food' })
    }
    const order = await Order.create({
      varietyId,
      varietyName,
      type,
      quantity: Number(quantity),
      totalCedis: Number(totalCedis),
      customerEmail: customerEmail || '',
      userId: userId || null,
    })
    res.status(201).json(order)
  } catch (err) {
    console.error('POST /api/orders error:', err)
    res.status(500).json({ error: 'Failed to create order' })
  }
})

/**
 * GET /api/orders — list all orders (admin only).
 */
router.get('/', requireAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .lean()
    res.json(orders)
  } catch (err) {
    console.error('GET /api/orders error:', err)
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

/**
 * PATCH /api/orders/:id — update order status (admin only).
 */
router.patch('/:id', requireAdmin, async (req, res) => {
  try {
    const { status } = req.body
    if (!['new', 'approved', 'contacted', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).lean()
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch (err) {
    console.error('PATCH /api/orders/:id error:', err)
    res.status(500).json({ error: 'Failed to update order' })
  }
})

export default router
