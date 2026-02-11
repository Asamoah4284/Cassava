import express from 'express'
import Research from '../models/Research.js'
import { requireAdmin } from '../middleware/auth.js'

const router = express.Router()

/**
 * GET /api/research — list all research posts (public).
 */
router.get('/', async (req, res) => {
  try {
    const posts = await Research.find().sort({ createdAt: -1 }).lean()
    res.json(posts)
  } catch (err) {
    console.error('GET /api/research error:', err)
    res.status(500).json({ error: 'Failed to fetch research' })
  }
})

/**
 * GET /api/research/:id — single research post (public).
 */
router.get('/:id', async (req, res) => {
  try {
    const post = await Research.findById(req.params.id).lean()
    if (!post) return res.status(404).json({ error: 'Not found' })
    res.json(post)
  } catch (err) {
    console.error('GET /api/research/:id error:', err)
    res.status(500).json({ error: 'Failed to fetch research' })
  }
})

/**
 * POST /api/research — create research post (admin/lecturer).
 */
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { title, summary, body, author, image, document } = req.body
    if (!title || !summary) {
      return res.status(400).json({ error: 'Title and summary are required' })
    }
    const post = await Research.create({
      title,
      summary,
      body: body || '',
      author: author || '',
      image: image || '',
      document: document || '',
    })
    res.status(201).json(post)
  } catch (err) {
    console.error('POST /api/research error:', err)
    res.status(500).json({ error: 'Failed to create research' })
  }
})

/**
 * PUT /api/research/:id — update research post (admin/lecturer).
 */
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { title, summary, body, author, image, document } = req.body
    const update = {}
    if (title != null) update.title = title
    if (summary != null) update.summary = summary
    if (body != null) update.body = body
    if (author != null) update.author = author
    if (image != null) update.image = image
    if (document != null) update.document = document
    const post = await Research.findByIdAndUpdate(req.params.id, update, { new: true }).lean()
    if (!post) return res.status(404).json({ error: 'Not found' })
    res.json(post)
  } catch (err) {
    console.error('PUT /api/research/:id error:', err)
    res.status(500).json({ error: 'Failed to update research' })
  }
})

/**
 * DELETE /api/research/:id — delete research post (admin/lecturer).
 */
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const post = await Research.findByIdAndDelete(req.params.id)
    if (!post) return res.status(404).json({ error: 'Not found' })
    res.status(204).send()
  } catch (err) {
    console.error('DELETE /api/research/:id error:', err)
    res.status(500).json({ error: 'Failed to delete research' })
  }
})

export default router
