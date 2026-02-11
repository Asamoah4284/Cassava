import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getVarieties } from '../../api/client'
import { createVariety, deleteVariety, updateVariety } from '../../api/admin'
import VarietyForm from '../../components/admin/VarietyForm'

const AdminVarieties = () => {
  const [varieties, setVarieties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)

  const load = () => {
    setLoading(true)
    getVarieties()
      .then(setVarieties)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete variety "${name}"?`)) return
    try {
      await deleteVariety(id)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCreate = async (data) => {
    await createVariety(data)
    setCreating(false)
    load()
  }

  const handleUpdate = async (id, data) => {
    await updateVariety(id, data)
    setEditing(null)
    load()
  }

  if (loading && varieties.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-600">
        Loading varieties…
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Varieties</h1>
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Add variety
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                Variety
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                Tagline
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {varieties.map((v) => (
              <tr key={v._id}>
                <td className="whitespace-nowrap px-4 py-3">
                  <span className="font-medium text-slate-900">{v.name}</span>
                </td>
                <td className="max-w-xs truncate px-4 py-3 text-sm text-slate-600">
                  {v.tagline}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => setEditing(v)}
                    className="mr-2 text-sm font-medium text-green-600 hover:text-green-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(v._id, v.name)}
                    className="text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {varieties.length === 0 && !loading && (
          <p className="p-6 text-center text-slate-500">No varieties yet. Add one above.</p>
        )}
      </div>

      {creating && (
        <VarietyForm
          onSave={handleCreate}
          onCancel={() => setCreating(false)}
          title="Add variety"
        />
      )}
      {editing && (
        <VarietyForm
          variety={editing}
          onSave={(data) => handleUpdate(editing._id, data)}
          onCancel={() => setEditing(null)}
          title="Edit variety"
        />
      )}
    </div>
  )
}

export default AdminVarieties
