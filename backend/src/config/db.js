import mongoose from 'mongoose'

/**
 * Connect to MongoDB using MONGODB_URI from environment.
 * @returns {Promise<void>}
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cassava'
  try {
    await mongoose.connect(uri)
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection error:', err.message)
    process.exit(1)
  }
}
