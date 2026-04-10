import { useState } from 'react';

export default function Checkin() {
  const [cafe, setCafe] = useState('');
  const [drink, setDrink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Post checkin to api
    setCafe('');
    setDrink('');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 pb-20">
      <h2 className="text-2xl font-bold mb-6">Check In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Cafe name"
          value={cafe}
          onChange={(e) => setCafe(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
        <input
          type="text"
          placeholder="What are you drinking?"
          value={drink}
          onChange={(e) => setDrink(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-coffee text-white rounded-lg py-2 font-semibold hover:bg-opacity-90"
        >
          Check In
        </button>
      </form>
    </div>
  );
}
