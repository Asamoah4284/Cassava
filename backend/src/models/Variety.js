import mongoose from 'mongoose'

const varietySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    traits: [{ type: String }],
    pricePerAcre: { type: Number, default: 500 },
    pricePerKg: { type: Number, default: 4 },
  },
  { timestamps: true }
)

/** Mongoose model for cassava varieties (stick/food). */
const Variety = mongoose.model('Variety', varietySchema)
export default Variety
