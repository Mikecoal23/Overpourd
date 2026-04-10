import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiMapPin, FiUsers, FiArrowLeft } from 'react-icons/fi';

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    const fetchEvent = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/events/${id}`);
        setEvent(response.data);
      } catch (fetchError) {
        setError(fetchError.response?.status === 404 ? 'Event not found.' : 'Unable to load event details.');
        console.error(fetchError);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading event details...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <p className="text-gray-600 text-lg">Event not found.</p>
        <Link
          to="/explore"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-coffee text-white rounded-lg"
        >
          <FiArrowLeft /> Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/explore"
        className="inline-flex items-center gap-2 text-coffee font-semibold mb-6"
      >
        <FiArrowLeft /> Back to Explore
      </Link>

      <article className="bg-white rounded-3xl shadow-lg overflow-hidden">
        {event.image && (
          <img src={event.image} alt={event.name} className="w-full h-72 object-cover" />
        )}
        <div className="p-8">
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
            <span>{event.date}</span>
            <span>{event.time}</span>
          </div>
          <h1 className="text-3xl font-bold text-coffee mb-4">{event.name}</h1>
          <p className="text-gray-700 mb-6">{event.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div className="flex items-start gap-3">
              <FiMapPin size={20} className="mt-1 text-coffee" />
              <div>
                <h2 className="font-semibold text-gray-900">Location</h2>
                <p>{event.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiUsers size={20} className="mt-1 text-coffee" />
              <div>
                <h2 className="font-semibold text-gray-900">Attendees</h2>
                <p>{event.attendees} people signed up</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
