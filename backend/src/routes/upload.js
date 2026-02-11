import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { requireAdmin } from '../middleware/auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadsDir = path.join(__dirname, '..', '..', 'uploads')

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg'
    const safe = (file.originalname || 'image').replace(/[^a-zA-Z0-9.-]/g, '_')
    cb(null, `${Date.now()}-${safe}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /^image\/(jpeg|jpg|png|gif|webp)$/i.test(file.mimetype)
    if (allowed) cb(null, true)
    else cb(new Error('Only images (JPEG, PNG, GIF, WebP) are allowed'))
  },
})

const router = express.Router()

/**
 * POST /api/admin/upload — upload an image (admin only). Multipart field: "image".
 * Returns { url } — full URL to the uploaded file.
 */
router.post('/', requireAdmin, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File too large (max 5MB)' })
      }
      return res.status(400).json({ error: err.message || 'Upload failed' })
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }
    const baseUrl = process.env.API_PUBLIC_URL || `${req.protocol}://${req.get('host')}`
    const url = `${baseUrl}/uploads/${req.file.filename}`
    res.json({ url })
  })
})

export default router
