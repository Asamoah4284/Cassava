import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    varietyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Variety', required: true },
    varietyName: { type: String, required: true },
    type: { type: String, enum: ['stick', 'food'], required: true },
    quantity: { type: Number, required: true },
    totalCedis: { type: Number, required: true },
    customerEmail: { type: String, default: '' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    status: { type: String, enum: ['new', 'approved', 'contacted', 'completed', 'cancelled'], default: 'new' },
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)
export default Order
