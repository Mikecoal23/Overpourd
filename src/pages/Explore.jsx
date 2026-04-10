import { useEffect, useState } from 'react';
import CafeCard from '../components/ui/CafeCard';

export default function Explore() {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    // Fetch cafes from api
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 pb-20">
      <h2 className="text-2xl font-bold mb-4">Explore Cafes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cafes.map((cafe) => (
          <CafeCard key={cafe.id} cafe={cafe} />
        ))}
      </div>
    </div>
  );
}
