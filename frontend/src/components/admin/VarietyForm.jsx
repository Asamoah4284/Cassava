import { useState, useEffect, useRef } from 'react'
import { uploadImage } from '../../api/admin'

const emptyVariety = {
  name: '',
  tagline: '',
  description: '',
  image: '',
  traits: [],
  pricePerAcre: 500,
  pricePerKg: 4,
}

const VarietyForm = ({ variety, onSave, onCancel, title }) => {
  const [form, setForm] = useState(emptyVariety)
  const [traitsText, setTraitsText] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (variety) {
      setForm({
        name: variety.name ?? '',
        tagline: variety.tagline ?? '',
        description: variety.description ?? '',
        image: variety.image ?? '',
        traits: Array.isArray(variety.traits) ? variety.traits : [],
        pricePerAcre: variety.pricePerAcre ?? 500,
        pricePerKg: variety.pricePerKg ?? 4,
      })
      setTraitsText(Array.isArray(variety.traits) ? variety.traits.join(', ') : '')
    } else {
      setForm(emptyVariety)
      setTraitsText('')
    }
  }, [variety])

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const url = await uploadImage(file)
      handleChange('image', url)
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const clearImage = () => {
    handleChange('image', '')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const traits = traitsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    const payload = { ...form, traits }
    if (!payload.name || !payload.tagline || !payload.description || !payload.image) {
      setError('Name, tagline, description and image are required.')
      return
    }
    setSaving(true)
    try {
      await onSave(payload)
      onCancel()
    } catch (err) {
      setError(err.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-2 sm:items-center sm:p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-slate-200 bg-white shadow-lg sm:rounded-lg">
        <div className="sticky top-0 border-b border-slate-200 bg-white px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          {error && (
            <p className="bg-red-50 p-2 text-sm text-red-700">{error}</p>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="mt-1 w-full border border-slate-300 px-3 py-2 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Tagline</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="mt-1 w-full border border-slate-300 px-3 py-2 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="mt-1 w-full border border-slate-300 px-3 py-2 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Image</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleFileChange}
              disabled={uploading}
              className="mt-1 w-full border border-slate-300 px-3 py-2 text-sm text-slate-600 file:mr-3 file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-slate-700"
            />
            {uploading && (
              <p className="mt-1 text-sm text-slate-500">Uploading…</p>
            )}
            {form.image && (
              <div className="mt-2 flex items-start gap-3">
                <img
                  src={form.image}
                  alt="Preview"
                  className="h-24 w-24 border border-slate-200 object-cover"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="mt-1 text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Traits (comma-separated)
            </label>
            <input
              type="text"
              value={traitsText}
              onChange={(e) => setTraitsText(e.target.value)}
              placeholder="High yielding, CMD resistant"
              className="mt-1 w-full border border-slate-300 px-3 py-2 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Price per acre (GHS)</label>
              <input
                type="number"
                min={0}
                value={form.pricePerAcre}
                onChange={(e) => handleChange('pricePerAcre', Number(e.target.value) || 0)}
                className="mt-1 w-full border border-slate-300 px-3 py-2 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Price per kg (GHS)</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={form.pricePerKg}
                onChange={(e) => handleChange('pricePerKg', Number(e.target.value) || 0)}
                className="mt-1 w-full border border-slate-300 px-3 py-2 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-green-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-green-400 disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VarietyForm
