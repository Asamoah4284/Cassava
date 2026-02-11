import 'dotenv/config'
import path from 'path'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import varietiesRouter from './routes/varieties.js'
import ordersRouter from './routes/orders.js'
import adminRouter from './routes/admin.js'
import uploadRouter from './routes/upload.js'
import registerRouter from './routes/register.js'
import loginRouter from './routes/login.js'
import meRouter from './routes/me.js'
import researchRouter from './routes/research.js'
import consultationsRouter from './routes/consultations.js'

await connectDB()

const app = express()
const port = process.env.PORT || 3001
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173'

app.use(cors({ origin: corsOrigin }))
app.use(express.json())

const uploadsDir = path.join(process.cwd(), 'uploads')
app.use('/uploads', express.static(uploadsDir))

app.use('/api/varieties', varietiesRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/admin', adminRouter)
app.use('/api/admin/upload', uploadRouter)
app.use('/api/register', registerRouter)
app.use('/api/login', loginRouter)
app.use('/api/me', meRouter)
app.use('/api/research', researchRouter)
app.use('/api/consultations', consultationsRouter)

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Cassava API' })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
