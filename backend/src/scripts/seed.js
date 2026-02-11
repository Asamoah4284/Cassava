import 'dotenv/config'
import mongoose from 'mongoose'
import Variety from '../models/Variety.js'

const seedVarieties = [
  {
    name: 'TME 419',
    tagline: 'High-yield, disease-resistant',
    description:
      'Widely adopted variety with high dry matter (about 25%), strong resistance to cassava mosaic disease, and yields often above 25 t/ha. Well suited for pounding and starch use.',
    image: 'https://i.pinimg.com/1200x/10/a2/9c/10a29c1102c3a8640056d4d98aa6a50e.jpg',
    traits: ['High yielding', 'CMD resistant', 'Good for fufu', 'High starch'],
    pricePerAcre: 500,
    pricePerKg: 4,
  },
  {
    name: 'Afisiafi',
    tagline: 'Early maturing, poundable',
    description:
      'Farmer-preferred variety that matures early and is easy to pound. Valued for food use and local processing across Ghana.',
    image: 'https://i.pinimg.com/1200x/10/a2/9c/10a29c1102c3a8640056d4d98aa6a50e.jpg',
    traits: ['Early maturity', 'Poundable', 'Food quality', 'Farmer preferred'],
    pricePerAcre: 500,
    pricePerKg: 4,
  },
  {
    name: 'Bankye Hemaa',
    tagline: 'Starch and gari',
    description:
      'Suited for gari and starch production. Good dry matter and processing quality for both household and small-scale industry.',
    image: 'https://i.pinimg.com/1200x/10/a2/9c/10a29c1102c3a8640056d4d98aa6a50e.jpg',
    traits: ['High starch', 'Gari quality', 'Processing', 'Dry matter'],
    pricePerAcre: 500,
    pricePerKg: 4,
  },
  {
    name: 'Tek Bankye',
    tagline: 'Drought tolerant, reliable',
    description:
      'Performs well under low rainfall and marginal soils. Valued for food security and as a reliable option in drier areas.',
    image: 'https://i.pinimg.com/1200x/10/a2/9c/10a29c1102c3a8640056d4d98aa6a50e.jpg',
    traits: ['Drought tolerant', 'Stable yield', 'Stress tolerant', 'Food security'],
    pricePerAcre: 500,
    pricePerKg: 4,
  },
]

async function seed() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cassava'
  await mongoose.connect(uri)
  await Variety.deleteMany({})
  await Variety.insertMany(seedVarieties)
  console.log('Seeded', seedVarieties.length, 'varieties')
  await mongoose.disconnect()
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
