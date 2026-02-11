import mongoose from 'mongoose'

const consultationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    consultationType: { type: String, required: true },
    preferredDate: { type: String, default: '' },
    preferredTime: { type: String, default: '' },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'completed', 'cancelled'],
      default: 'new',
    },
  },
  { timestamps: true }
)

const Consultation = mongoose.model('Consultation', consultationSchema)
export default Consultation
