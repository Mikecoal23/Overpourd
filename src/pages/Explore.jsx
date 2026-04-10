import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';

export default function Explore() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/events');
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-4 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
            {event.image && (
              <img src={event.image} alt={event.name} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h3 className="text-xl font-bold text-coffee mb-2">{event.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{event.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <FiCalendar size={16} className="text-coffee" />
                  <span>{event.date} at {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FiMapPin size={16} className="text-coffee" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FiUsers size={16} className="text-coffee" />
                  <span>{event.attendees} attending</span>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-coffee text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition">
                Join Event
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
