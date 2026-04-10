import { useState } from 'react';
import { FiCoffee } from 'react-icons/fi';

export default function CheckinModal({ isOpen, onClose, onSubmit }) {
  const [cafe, setCafe] = useState('');
  const [drink, setDrink] = useState('');
  const [review, setReview] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(0);

  const handleRatingClick = (index) => {
    // Cycles: empty -> half -> full -> empty
    if (rating === index) {
      setRating(index - 0.5);
    } else if (rating === index - 0.5) {
      setRating(0);
    } else {
      setRating(index);
    }
  };

  const renderRatingMugs = () => {
    return (
      <div className="flex gap-2 cursor-pointer">
        {[1, 2, 3, 4, 5].map((mugs) => (
          <div
            key={mugs}
            onClick={() => handleRatingClick(mugs)}
            className="relative"
          >
            {/* Background mug (empty) */}
            <FiCoffee size={28} className="text-gray-300" />
            
            {/* Filled overlay */}
            {rating >= mugs ? (
              <FiCoffee
                size={28}
                className="text-coffee absolute top-0 left-0"
              />
            ) : rating === mugs - 0.5 ? (
              <div className="absolute top-0 left-0 overflow-hidden w-3.5">
                <FiCoffee size={28} className="text-coffee" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ cafe, drink, review, location, rating });
    setCafe('');
    setDrink('');
    setReview('');
    setLocation('');
    setRating(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">Check In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Cafe name"
            value={cafe}
            onChange={(e) => setCafe(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-3 text-lg"
            required
          />
          <input
            type="text"
            placeholder="What are you drinking?"
            value={drink}
            onChange={(e) => setDrink(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-3 text-lg"
            required
          />
          <input
            type="text"
            placeholder="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-3 text-lg"
          />
          <div>
            <label className="block font-semibold text-coffee mb-3 text-lg">Rate Your Drink</label>
            {renderRatingMugs()}
            {rating > 0 && <p className="text-sm text-gray-600 mt-2">{rating} / 5</p>}
          </div>
          <textarea
            placeholder="Leave a review (optional)"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-3 text-lg resize-none h-32"
          />
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-300 text-lg font-semibold rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-coffee text-white text-lg font-semibold rounded hover:bg-opacity-90 transition"
            >
              Check In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
