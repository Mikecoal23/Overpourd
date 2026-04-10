import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function CafePage() {
  const { id } = useParams();
  const [cafe, setCafe] = useState(null);
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    // Fetch cafe details and checkins
  }, [id]);

  if (!cafe) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 pb-20">
      <img src={cafe.image} alt={cafe.name} className="w-full h-64 object-cover rounded-lg" />
      <h1 className="text-3xl font-bold mt-4">{cafe.name}</h1>
      <p className="text-gray-600">{cafe.location}</p>
      <p className="text-2xl text-yellow-500 mt-2">★ {cafe.rating}</p>
      
      <h2 className="text-xl font-bold mt-6 mb-4">Recent Check-ins</h2>
      {/* Add checkins list */}
    </div>
  );
}
