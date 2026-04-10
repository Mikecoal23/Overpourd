export default function CheckinModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Check In</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Cafe name"
            className="w-full border rounded px-3 py-2 mb-3"
          />
          <input
            type="text"
            placeholder="Drink"
            className="w-full border rounded px-3 py-2 mb-3"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-coffee text-white rounded hover:bg-opacity-90"
            >
              Check In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
