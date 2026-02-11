import express from 'express'
import Variety from '../models/Variety.js'
import { requireAdmin } from '../middleware/auth.js'

const router = express.Router()

/**
 * GET /api/varieties — list all varieties (for Varieties page).
 */
router.get('/', async (req, res) => {
  try {
    const varieties = await Variety.find().sort({ createdAt: 1 }).lean()
    res.json(varieties)
  } catch (err) {
    console.error('GET /api/varieties error:', err)
    res.status(500).json({ error: 'Failed to fetch varieties' })
  }
})

/**
 * GET /api/varieties/:id — single variety by _id (for VarietyPurchase page).
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const variety = await Variety.findById(id).lean()
    if (!variety) {
      return res.status(404).json({ error: 'Variety not found' })
    }
    res.json(variety)
  } catch (err) {
    console.error('GET /api/varieties/:id error:', err)
    res.status(500).json({ error: 'Failed to fetch variety' })
  }
})

/**
 * POST /api/varieties — create variety (admin only).
 */
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { name, tagline, description, image, traits, pricePerAcre, pricePerKg } = req.body
    if (!name || !tagline || !description || !image) {
      return res.status(400).json({ error: 'Missing required fields: name, tagline, description, image' })
    }
    const variety = await Variety.create({
      name,
      tagline,
      description,
      image,
      traits: Array.isArray(traits) ? traits : [],
      pricePerAcre: pricePerAcre != null ? Number(pricePerAcre) : 500,
      pricePerKg: pricePerKg != null ? Number(pricePerKg) : 4,
    })
    res.status(201).json(variety)
  } catch (err) {
    console.error('POST /api/varieties error:', err)
    res.status(500).json({ error: 'Failed to create variety' })
  }
})

/**
 * PUT /api/varieties/:id — update variety (admin only).
 */
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { name, tagline, description, image, traits, pricePerAcre, pricePerKg } = req.body
    const update = {}
    if (name != null) update.name = name
    if (tagline != null) update.tagline = tagline
    if (description != null) update.description = description
    if (image != null) update.image = image
    if (traits != null) update.traits = Array.isArray(traits) ? traits : []
    if (pricePerAcre != null) update.pricePerAcre = Number(pricePerAcre)
    if (pricePerKg != null) update.pricePerKg = Number(pricePerKg)
    const variety = await Variety.findByIdAndUpdate(req.params.id, update, { new: true }).lean()
    if (!variety) return res.status(404).json({ error: 'Variety not found' })
    res.json(variety)
  } catch (err) {
    console.error('PUT /api/varieties/:id error:', err)
    res.status(500).json({ error: 'Failed to update variety' })
  }
})

/**
 * DELETE /api/varieties/:id — delete variety (admin only).
 */
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const variety = await Variety.findByIdAndDelete(req.params.id)
    if (!variety) return res.status(404).json({ error: 'Variety not found' })
    res.status(204).send()
  } catch (err) {
    console.error('DELETE /api/varieties/:id error:', err)
    res.status(500).json({ error: 'Failed to delete variety' })
  }
})

export default router
