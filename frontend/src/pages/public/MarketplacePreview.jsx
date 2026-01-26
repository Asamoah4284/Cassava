import { Link } from 'react-router-dom'
import SectionHeader from '../../components/cyphill/SectionHeader'

/**
 * Cassava products available in the marketplace
 */
const cassavaProducts = [
  {
    id: 1,
    name: 'Fresh Cassava Roots',
    category: 'Produce',
    price: '₵15.00',
    unit: 'per kg',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400',
    description: 'Freshly harvested cassava roots, high quality and ready for processing',
    farmer: 'Green Fields Farm',
    location: 'Kumasi, Ghana',
    rating: 4.8,
    stock: 'In Stock',
  },
  {
    id: 2,
    name: 'Cassava Starch',
    category: 'Processed',
    price: '₵45.00',
    unit: 'per 25kg bag',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400',
    description: 'Premium quality cassava starch, perfect for industrial and food processing',
    farmer: 'AgriTech Processors',
    location: 'Accra, Ghana',
    rating: 4.9,
    stock: 'In Stock',
  },
  {
    id: 3,
    name: 'Gari (Roasted Cassava)',
    category: 'Processed',
    price: '₵25.00',
    unit: 'per 5kg bag',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
    description: 'Traditional gari, sun-dried and roasted to perfection',
    farmer: 'Traditional Foods Co.',
    location: 'Tamale, Ghana',
    rating: 4.7,
    stock: 'In Stock',
  },
  {
    id: 4,
    name: 'Cassava Flour',
    category: 'Processed',
    price: '₵35.00',
    unit: 'per 10kg bag',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400',
    description: 'Fine cassava flour, gluten-free and ideal for baking',
    farmer: 'Healthy Grains Ltd',
    location: 'Cape Coast, Ghana',
    rating: 4.6,
    stock: 'Limited Stock',
  },
  {
    id: 5,
    name: 'Cassava Chips',
    category: 'Processed',
    price: '₵20.00',
    unit: 'per 2kg pack',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400',
    description: 'Crispy cassava chips, naturally dried and packaged',
    farmer: 'Snack Masters',
    location: 'Koforidua, Ghana',
    rating: 4.5,
    stock: 'In Stock',
  },
  {
    id: 6,
    name: 'Cassava Planting Stems',
    category: 'Inputs',
    price: '₵5.00',
    unit: 'per stem',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400',
    description: 'High-yield cassava planting stems, disease-free and certified',
    farmer: 'Seed Bank Ghana',
    location: 'Sunyani, Ghana',
    rating: 4.9,
    stock: 'In Stock',
  },
  {
    id: 7,
    name: 'Fufu Powder',
    category: 'Processed',
    price: '₵30.00',
    unit: 'per 5kg bag',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
    description: 'Instant fufu powder made from premium cassava',
    farmer: 'Quick Meals Inc.',
    location: 'Takoradi, Ghana',
    rating: 4.8,
    stock: 'In Stock',
  },
  {
    id: 8,
    name: 'Organic Cassava Roots',
    category: 'Produce',
    price: '₵18.00',
    unit: 'per kg',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400',
    description: 'Certified organic cassava roots, grown without chemicals',
    farmer: 'EcoFarm Organic',
    location: 'Ho, Ghana',
    rating: 5.0,
    stock: 'In Stock',
  },
]

/**
 * Product card component - Minimalist design
 */
const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/marketplace/product/${product.id}`}
      className="block transition-opacity hover:opacity-80"
    >
      {/* Product Image Placeholder */}
      <div className="aspect-square w-full bg-slate-100" />

      {/* Product Info */}
      <div className="mt-3">
        {/* Product Name */}
        <h3 className="mb-2.5 text-base font-semibold text-slate-900">
          {product.name}
        </h3>

        {/* Price and Rating */}
        <div className="flex items-center justify-between">
          {/* Price */}
          <span className="text-sm text-slate-700">{product.price}</span>

          {/* Star Rating */}
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 fill-green-500"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

/**
 * Public preview of the marketplace module with cassava products.
 */
const MarketplacePreview = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold text-black md:text-4xl">
          Cassava Marketplace
        </h2>
        <p className="max-w-2xl text-base text-black">
          Browse and purchase high-quality cassava products directly from
          verified farmers and processors across Ghana.
        </p>
      </div>

      {/* Results Count & Sort Bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Showing 1-{cassavaProducts.length} of {cassavaProducts.length} results
        </p>
        <div className="flex items-center gap-2">
          <select className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <option>Sort by popular</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating: Highest</option>
            <option>Newest First</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cassavaProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More / Pagination */}
      <div className="flex justify-center">
        <button className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
          Load More Products
        </button>
      </div>
    </div>
  )
}

export default MarketplacePreview
