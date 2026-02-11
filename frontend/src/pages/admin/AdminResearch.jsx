import { useEffect, useState } from 'react'
import { getResearch } from '../../api/client'
import { createResearch, deleteResearch, updateResearch } from '../../api/admin'
import ResearchForm from '../../components/admin/ResearchForm'
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const AdminResearch = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [deleteInProgress, setDeleteInProgress] = useState(false)

  const load = () => {
    setLoading(true)
    getResearch()
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const openDeleteModal = (post) => setDeleting({ id: post._id, title: post.title })
  const closeDeleteModal = () => setDeleting(null)

  const handleConfirmDelete = async () => {
    if (!deleting) return
    setDeleteInProgress(true)
    try {
      await deleteResearch(deleting.id)
      closeDeleteModal()
      load()
    } catch (err) {
      setError(err.message)
    } finally {
      setDeleteInProgress(false)
    }
  }

  const handleCreate = async (data) => {
    await createResearch(data)
    setCreating(false)
    load()
  }

  const handleUpdate = async (id, data) => {
    await updateResearch(id, data)
    setEditing(null)
    load()
  }

  const imageUrl = (path) => {
    if (!path) return null
    if (path.startsWith('http')) return path
    return `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`
  }

  if (loading && posts.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-600">
        Loading research…
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">Research</h1>
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="w-full rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
        >
          Add research post
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Mobile: card layout */}
      <div className="flex flex-col gap-3 md:hidden">
        {posts.map((p) => (
          <div
            key={p._id}
            className="rounded-lg border border-slate-200 bg-white p-4"
          >
            <div className="flex gap-3">
              {p.image ? (
                <img
                  src={imageUrl(p.image)}
                  alt={p.title}
                  className="h-16 w-20 shrink-0 rounded border border-slate-200 object-cover"
                />
              ) : (
                <div className="h-16 w-20 shrink-0 rounded border border-slate-200 bg-slate-50" />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-900">{p.title}</p>
                {p.author && <p className="text-sm text-slate-600">{p.author}</p>}
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">{p.summary}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditing(p)}
                    className="text-sm font-medium text-green-600 hover:text-green-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => openDeleteModal(p)}
                    className="text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                  {p.document && (
                    <a
                      href={p.document.startsWith('http') ? p.document : `${API_BASE}${p.document.startsWith('/') ? '' : '/'}${p.document}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-green-600 hover:text-green-700"
                    >
                      View doc
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-hidden rounded-lg border border-slate-200 bg-white md:block">
        <table className="min-w-full table-fixed divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="w-20 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                Image
              </th>
              <th className="w-[18%] px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                Title
              </th>
              <th className="w-[14%] px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                Author
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                Summary
              </th>
              <th className="w-20 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                Document
              </th>
              <th className="w-32 px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {posts.map((p) => (
              <tr key={p._id}>
                <td className="w-20 px-4 py-2">
                  {p.image ? (
                    <img
                      src={imageUrl(p.image)}
                      alt={p.title}
                      className="h-12 w-16 rounded border border-slate-200 object-cover"
                    />
                  ) : (
                    <span className="text-slate-400 text-xs">—</span>
                  )}
                </td>
                <td className="w-[18%] max-w-0 px-4 py-3">
                  <span className="block truncate font-medium text-slate-900" title={p.title}>
                    {p.title}
                  </span>
                </td>
                <td className="w-[14%] max-w-0 px-4 py-3">
                  <span className="block truncate text-sm text-slate-600" title={p.author || ''}>
                    {p.author || '—'}
                  </span>
                </td>
                <td className="max-w-0 px-4 py-3">
                  <span className="block truncate text-sm text-slate-600" title={p.summary}>
                    {p.summary}
                  </span>
                </td>
                <td className="w-20 px-4 py-3 text-sm">
                  {p.document ? (
                    <a
                      href={p.document.startsWith('http') ? p.document : `${API_BASE}${p.document.startsWith('/') ? '' : '/'}${p.document}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-green-600 hover:text-green-700"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
                <td className="w-32 whitespace-nowrap px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => setEditing(p)}
                    className="mr-2 text-sm font-medium text-green-600 hover:text-green-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => openDeleteModal(p)}
                    className="text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && !loading && (
          <p className="p-6 text-center text-slate-500">No research posts yet. Add one above.</p>
        )}
      </div>
      {posts.length === 0 && !loading && (
        <p className="text-center text-slate-500 md:hidden">No research posts yet. Add one above.</p>
      )}

      {creating && (
        <ResearchForm
          onSave={handleCreate}
          onCancel={() => setCreating(false)}
          title="Add research post"
        />
      )}
      {editing && (
        <ResearchForm
          research={editing}
          onSave={(data) => handleUpdate(editing._id, data)}
          onCancel={() => setEditing(null)}
          title="Edit research post"
        />
      )}
      {deleting && (
        <DeleteConfirmModal
          title="Delete research post"
          message={`Delete "${deleting.title}"? This cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={closeDeleteModal}
          confirming={deleteInProgress}
        />
      )}
    </div>
  )
}

export default AdminResearch
