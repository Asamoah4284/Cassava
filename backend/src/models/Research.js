import mongoose from 'mongoose'

const researchSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    body: { type: String, default: '' },
    author: { type: String, default: '' },
    image: { type: String, default: '' },
    document: { type: String, default: '' },
  },
  { timestamps: true }
)

const Research = mongoose.model('Research', researchSchema)
export default Research
