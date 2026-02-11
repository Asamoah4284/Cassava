import express from 'express'
import Consultation from '../models/Consultation.js'
import { requireAdmin } from '../middleware/auth.js'

const router = express.Router()

/**
 * POST /api/consultations — create consultation request (public).
 */
router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, consultationType, preferredDate, preferredTime, message } = req.body
    if (!fullName?.trim() || !email?.trim() || !consultationType?.trim() || !message?.trim()) {
      return res.status(400).json({
        error: 'Full name, email, consultation type, and message are required',
      })
    }
    const consultation = await Consultation.create({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone?.trim() || '',
      consultationType: consultationType.trim(),
      preferredDate: preferredDate?.trim() || '',
      preferredTime: preferredTime?.trim() || '',
      message: message.trim(),
    })
    res.status(201).json(consultation)
  } catch (err) {
    console.error('POST /api/consultations error:', err)
    res.status(500).json({ error: 'Failed to submit consultation request' })
  }
})

/**
 * GET /api/consultations — list all consultations (admin only).
 */
router.get('/', requireAdmin, async (req, res) => {
  try {
    const list = await Consultation.find().sort({ createdAt: -1 }).lean()
    res.json(list)
  } catch (err) {
    console.error('GET /api/consultations error:', err)
    res.status(500).json({ error: 'Failed to fetch consultations' })
  }
})

/**
 * PATCH /api/consultations/:id — update status (admin only).
 */
router.patch('/:id', requireAdmin, async (req, res) => {
  try {
    const { status } = req.body
    if (!['new', 'contacted', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }
    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).lean()
    if (!consultation) return res.status(404).json({ error: 'Not found' })
    res.json(consultation)
  } catch (err) {
    console.error('PATCH /api/consultations/:id error:', err)
    res.status(500).json({ error: 'Failed to update consultation' })
  }
})

export default router
