import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { getVariety, createOrder } from '../../api/client'
import { VARIETY_TYPES } from './Varieties'
import CreateAccountModal from '../../components/CreateAccountModal'

/**
 * Purchase page for a single variety: choose type (Stick or Food), quantity, total, and place order.
 */
const VarietyPurchase = () => {
  const { id } = useParams()
  const [variety, setVariety] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [varietyType, setVarietyType] = useState(VARIETY_TYPES.STICK)
  const [quantity, setQuantity] = useState(1)
  const [showOrderConfirm, setShowOrderConfirm] = useState(false)
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false)

  useEffect(() => {
    let cancelled = false
    getVariety(id)
      .then((data) => {
        if (!cancelled) setVariety(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <div className="h-5 w-24 rounded bg-slate-200 animate-pulse" aria-hidden />
          <div className="h-9 w-64 rounded bg-slate-200 animate-pulse md:h-10" aria-hidden />
        </div>

        <div className="grid gap-10 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-2">
            <div className="aspect-[16/10] overflow-hidden rounded-lg bg-slate-200 animate-pulse" aria-hidden />
            <div className="mt-4 h-4 w-12 rounded bg-slate-200 animate-pulse" aria-hidden />
            <div className="mt-1.5 h-10 w-full rounded border border-slate-200 bg-slate-100" aria-hidden />
            <div className="mt-4 h-4 w-full rounded bg-slate-200 animate-pulse" aria-hidden />
            <div className="mt-2 h-4 w-3/4 rounded bg-slate-200 animate-pulse" aria-hidden />
            <div className="mt-2 h-4 w-2/3 rounded bg-slate-200 animate-pulse" aria-hidden />
            <div className="mt-3 flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((j) => (
                <span
                  key={j}
                  className="inline-block h-6 w-20 rounded border border-slate-200 bg-slate-100"
                  aria-hidden
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8 md:col-span-3">
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="h-6 w-40 rounded bg-slate-200 animate-pulse" aria-hidden />
              <div className="mt-1 h-4 w-full rounded bg-slate-200 animate-pulse" aria-hidden />
              <div className="mt-4 flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((k) => (
                  <span key={k} className="h-9 w-20 rounded bg-slate-100" aria-hidden />
                ))}
              </div>
              <div className="mt-4 h-10 w-24 rounded border border-slate-200 bg-slate-100" aria-hidden />
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="h-6 w-28 rounded bg-slate-200 animate-pulse" aria-hidden />
              <div className="mt-4 h-5 w-full rounded bg-slate-200 animate-pulse" aria-hidden />
              <div className="mt-6 h-10 w-32 rounded bg-slate-100" aria-hidden />
            </section>
          </div>
        </div>
      </div>
    )
  }
  if (error) {
    return (
      <div className="flex flex-col gap-12">
        <p className="text-red-600">Failed to load variety: {error}</p>
        <Link to="/varieties" className="text-sm font-medium text-green-600 hover:text-green-700">
          Back to Varieties
        </Link>
      </div>
    )
  }
  if (!variety) return <Navigate to="/varieties" replace />

  const isStick = varietyType === VARIETY_TYPES.STICK
  const pricePerAcre = variety.pricePerAcre ?? 500
  const pricePerKg = variety.pricePerKg ?? 4
  const unitPrice = isStick ? pricePerAcre : pricePerKg
  const totalCedis = quantity * unitPrice

  const handleTypeChange = (type) => {
    setVarietyType(type)
    setQuantity(type === VARIETY_TYPES.STICK ? 1 : 10)
    setShowOrderConfirm(false)
  }
  const handleStickClick = (acres) => setQuantity(acres)
  const handlePlaceOrder = () => {
    createOrder({
      varietyId: variety._id,
      varietyName: variety.name,
      type: varietyType,
      quantity,
      totalCedis,
    }).catch(() => { /* order still visible via email */ })
    setShowOrderConfirm(true)
  }

  const typeLabel = isStick ? 'Stick' : 'Food'
  const quantityLabel = isStick ? `${quantity} acre(s)` : `${quantity} kg`
  const unitLabel = isStick ? 'acre(s)' : 'kg'

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <Link
          to="/varieties"
          className="inline-flex w-fit items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-green-600"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Varieties
        </Link>
        <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
          Purchase {variety.name}
        </h1>
      </div>

      <div className="grid gap-10 md:grid-cols-5 md:gap-12">
        <div className="md:col-span-2">
          <div className="aspect-[16/10] overflow-hidden rounded-lg bg-slate-100">
            <img
              src={variety.image}
              alt={variety.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <label htmlFor="variety-type" className="mt-4 block text-sm font-medium text-slate-700">
            Type
          </label>
          <select
            id="variety-type"
            value={varietyType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="mt-1.5 w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            <option value={VARIETY_TYPES.STICK}>Stick</option>
            <option value={VARIETY_TYPES.FOOD}>Food</option>
          </select>
          <p className="mt-4 text-sm text-slate-600">{variety.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {variety.traits.map((trait) => (
              <span
                key={trait}
                className="inline-block border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8 md:col-span-3">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              {isStick ? 'Variety sticks' : 'Variety food'}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {isStick
                ? 'Select how many acres (sticks) you want. Price is per acre.'
                : 'Select quantity in kg. Price is per kg.'}
            </p>
            {isStick ? (
              <>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[1, 2, 3, 5, 10].map((acres) => (
                    <button
                      key={acres}
                      type="button"
                      onClick={() => handleStickClick(acres)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                        quantity === acres
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-slate-300 bg-white text-slate-700 hover:border-green-300 hover:bg-green-50/50'
                      }`}
                    >
                      {acres} acre{acres > 1 ? 's' : ''} — GHS {acres * pricePerAcre}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  1 acre = GHS {pricePerAcre} (cedis)
                </p>
              </>
            ) : (
              <p className="mt-3 text-sm text-slate-600">
                1 kg = GHS {pricePerKg} (cedis)
              </p>
            )}
            <div className="mt-4 flex items-center gap-3">
              <label htmlFor="quantity" className="text-sm font-medium text-slate-700">
                Quantity ({isStick ? 'acres' : 'kg'}):
              </label>
              <input
                id="quantity"
                type="number"
                min={1}
                max={999}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-24 rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Total &amp; Order</h2>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex justify-between text-slate-700">
                <span>
                  {variety.name} ({typeLabel}) — {quantity} {unitLabel} × GHS {unitPrice}
                </span>
                <span className="font-semibold">GHS {totalCedis}</span>
              </div>
            </div>

            {!showOrderConfirm ? (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Place an order
                </button>
              </div>
            ) : (
              <div className="mt-6 rounded-lg bg-green-50 p-4">
                <p className="text-sm font-medium text-green-800">
                  {variety.name} ({typeLabel}) — {quantity} {unitLabel}
                </p>
                <p className="mt-1 text-sm text-green-700">
                  Total: <strong>GHS {totalCedis}</strong>
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  Create an account to complete your order and track your purchase.
                </p>
                <button
                  type="button"
                  onClick={() => setShowCreateAccountModal(true)}
                  className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Create an account
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setShowOrderConfirm(false)}
                  className="mt-3 ml-0 block text-sm font-medium text-green-700 underline hover:text-green-800"
                >
                  Change order
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {showCreateAccountModal && (
        <CreateAccountModal
          onClose={() => setShowCreateAccountModal(false)}
        />
      )}
    </div>
  )
}

export default VarietyPurchase
