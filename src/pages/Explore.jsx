import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiMapPin, FiUsers, FiCalendar } from 'react-icons/fi';

export default function Explore() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${apiUrl}/events`);
        setEvents(response.data || []);
      } catch (fetchError) {
        setError('Unable to load events from the server.');
        console.error(fetchError);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-screen bg-cream text-coffee">
        <p className="text-coffee/70">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center h-screen bg-cream text-coffee px-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-4 pb-20 bg-cream">
      <h1 className="text-2xl font-bold text-coffee mb-6">Explore Events</h1>
      {events.length === 0 ? (
        <p className="text-coffee/70">No events available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
          {events.map((event) => (
            <Link
              key={event.id}
              to={event.link || `/events/${event.id}`}
              className="block transform transition hover:-translate-y-0.5"
            >
              <article className="bg-cream-soft rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                {event.image && (
                  <img src={event.image} alt={event.name} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3 text-sm text-coffee/70">
                    <span className="flex items-center gap-1">
                      <FiCalendar size={14} />
                      {event.date}
                    </span>
                    <span>{event.time}</span>
                  </div>
                  <h3 className="text-xl font-bold text-coffee mb-2">{event.name}</h3>
                  <p className="text-coffee/70 text-sm mb-3">{event.description}</p>
                  <div className="space-y-2 text-sm text-coffee/70">
                    <div className="flex items-center gap-2">
                      <FiMapPin size={16} className="text-coffee" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiUsers size={16} className="text-coffee" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}