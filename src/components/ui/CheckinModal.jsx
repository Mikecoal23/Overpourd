import { useState } from 'react';

export default function CheckinModal({ isOpen, onClose, onSubmit }) {
  const [cafe, setCafe] = useState('');
  const [drink, setDrink] = useState('');
  const [review, setReview] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ cafe, drink, review, location });
    setCafe('');
    setDrink('');
    setReview('');
    setLocation('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full max-h-96 overflow-y-auto transition-colors">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Check In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Cafe name"
            value={cafe}
            onChange={(e) => setCafe(e.target.value)}
            className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-3 py-2 mb-3 transition-colors"
            required
          />
          <input
            type="text"
            placeholder="What are you drinking?"
            value={drink}
            onChange={(e) => setDrink(e.target.value)}
            className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-3 py-2 mb-3 transition-colors"
            required
          />
          <input
            type="text"
            placeholder="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-3 py-2 mb-3 transition-colors"
          />
          <textarea
            placeholder="Leave a review (optional)"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-3 py-2 mb-3 resize-none h-20 transition-colors"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-coffee text-white rounded hover:bg-opacity-90 transition-colors"
            >
              Check In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
