import { useState, useEffect, useRef } from 'react'
import { uploadImage, uploadDocument } from '../../api/admin'

const emptyResearch = {
  title: '',
  summary: '',
  body: '',
  author: '',
  image: '',
  document: '',
}

const ResearchForm = ({ research, onSave, onCancel, title }) => {
  const [form, setForm] = useState(emptyResearch)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadingDoc, setUploadingDoc] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)
  const docInputRef = useRef(null)

  useEffect(() => {
    if (research) {
      setForm({
        title: research.title ?? '',
        summary: research.summary ?? '',
        body: research.body ?? '',
        author: research.author ?? '',
        image: research.image ?? '',
        document: research.document ?? '',
      })
    } else {
      setForm(emptyResearch)
    }
  }, [research])

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const url = await uploadImage(file)
      handleChange('image', url)
    } catch (err) {
      setError(err.message || 'Image upload failed')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleDocumentChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setUploadingDoc(true)
    try {
      const url = await uploadDocument(file)
      handleChange('document', url)
    } catch (err) {
      setError(err.message || 'Document upload failed')
    } finally {
      setUploadingDoc(false)
      e.target.value = ''
    }
  }

  const clearImage = () => {
    handleChange('image', '')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const clearDocument = () => {
    handleChange('document', '')
    if (docInputRef.current) docInputRef.current.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.title?.trim() || !form.summary?.trim()) {
      setError('Title and summary are required.')
      return
    }
    setSaving(true)
    try {
      await onSave(form)
      onCancel()
    } catch (err) {
      setError(err.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-slate-200 bg-white shadow-lg">
        <div className="sticky top-0 border-b border-slate-200 bg-white px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          {error && (
            <p className="bg-red-50 p-2 text-sm text-red-700">{error}</p>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="mt-1 w-full border border-slate-300 px-3 py-2 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Author (lecturer name)</label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => handleChange('author', e.target.value)}
              placeholder="Dr. Jane Doe"
              className="mt-1 w-full border border-slate-300 px-3 py-2 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Summary</label>
            <textarea
              value={form.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              rows={3}
              className="mt-1 w-full border border-slate-300 px-3 py-2 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Full content (optional)</label>
            <textarea
              value={form.body}
              onChange={(e) => handleChange('body', e.target.value)}
              rows={4}
              className="mt-1 w-full border border-slate-300 px-3 py-2 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Cover image (optional)</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleImageChange}
              disabled={uploading}
              className="mt-1 w-full border border-slate-300 px-3 py-2 text-sm text-slate-600 file:mr-3 file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-slate-700"
            />
            {uploading && (
              <p className="mt-1 text-sm text-slate-500">Uploading image…</p>
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
            <label className="block text-sm font-medium text-slate-700">Research document (optional)</label>
            <p className="mt-0.5 text-xs text-slate-500">PDF, DOC, or DOCX. Max 15MB.</p>
            <input
              ref={docInputRef}
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleDocumentChange}
              disabled={uploadingDoc}
              className="mt-1 w-full border border-slate-300 px-3 py-2 text-sm text-slate-600 file:mr-3 file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-slate-700"
            />
            {uploadingDoc && (
              <p className="mt-1 text-sm text-slate-500">Uploading document…</p>
            )}
            {form.document && (
              <div className="mt-2 flex items-center gap-3">
                <a
                  href={form.document}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-green-600 hover:text-green-700"
                >
                  View document
                </a>
                <button
                  type="button"
                  onClick={clearDocument}
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            )}
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

export default ResearchForm
