// src/pages/Explore.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Explore() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await axios.get(`${apiUrl}/events`, { timeout: 5000 });
        setEvents(response.data || []);
      } catch (err) {
        console.error('Error fetching events:', err.message);
        setError(err.message || 'Failed to fetch events');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filtered = events.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-stone-50">
      {/* Header */}
      <div className="px-4 pt-6 pb-3 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-stone-800 mb-3">Upcoming Events</h1>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-stone-200 rounded-lg px-4 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-amber-800"
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-stone-600 mb-2">Loading events...</p>
              <div className="w-8 h-8 border-4 border-stone-300 border-t-amber-800 rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full bg-red-50">
            <div className="text-center p-6">
              <p className="text-red-600 font-semibold mb-2">⚠️ Connection Error</p>
              <p className="text-red-500 text-sm mb-4">{error}</p>
              <p className="text-stone-600 text-sm mb-4">Make sure the backend server is running:</p>
              <code className="bg-stone-800 text-white px-3 py-2 rounded text-xs block mb-4">cd backend && npm start</code>
              <button
                onClick={() => window.location.reload()}
                className="bg-amber-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-900"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          // Events list
          <div className="overflow-y-auto h-full px-4 py-3 space-y-3">
            {filtered.length === 0 ? (
              <p className="text-center text-stone-400 mt-10">No events found.</p>
            ) : (
              filtered.map((event) => (
                <div
                  key={event.id || event._id}
                  className="bg-white rounded-lg shadow p-4 border border-stone-200 hover:shadow-md transition cursor-pointer"
                  onClick={() => navigate(`/events/${event.id || event._id}`)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-stone-800">{event.name}</h3>
                      <p className="text-sm text-stone-600 mt-1">{event.description}</p>
                      <p className="text-xs text-stone-500 mt-2">📍 {event.location}</p>
                      <p className="text-xs text-stone-500">📅 {event.date}</p>
                    </div>
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}