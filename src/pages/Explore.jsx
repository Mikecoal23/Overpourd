import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiMapPin, FiStar } from 'react-icons/fi';

export default function Explore() {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCafes();
  }, []);

  const fetchCafes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/cafes`);
      setCafes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cafes:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading cafes...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-4 pb-20">
      <h1 className="text-2xl font-bold text-coffee mb-6">Explore Cafes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {cafes.map((cafe) => (
          <Link key={cafe._id || cafe.id} to={`/cafe/${cafe.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
            {cafe.image && (
              <img src={cafe.image} alt={cafe.name} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h3 className="text-xl font-bold text-coffee mb-2">{cafe.name}</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <FiMapPin size={16} className="text-coffee" />
                  <span>{cafe.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FiStar size={16} className="text-coffee" />
                  <span>{cafe.rating} stars</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}