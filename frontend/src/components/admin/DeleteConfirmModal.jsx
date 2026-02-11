/**
 * Styled delete confirmation modal. Replaces browser confirm() for a consistent UI.
 * @param {string} title - Modal title (e.g. "Delete variety")
 * @param {string} message - Body text (e.g. 'Delete "TME 419"? This cannot be undone.')
 * @param {() => void} onConfirm - Called when user confirms; caller should close modal and perform delete
 * @param {() => void} onCancel - Called when user cancels or clicks backdrop
 * @param {boolean} [confirming] - Optional; disables buttons and shows "Deleting…" while request is in progress
 */
const DeleteConfirmModal = ({ title, message, onConfirm, onCancel, confirming = false }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-lg">
        <h2 id="delete-modal-title" className="text-lg font-semibold text-slate-900">
          {title}
        </h2>
        <p className="mt-2 text-sm text-slate-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={confirming}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={confirming}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
          >
            {confirming ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
