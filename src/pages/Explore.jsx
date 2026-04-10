import { useEffect, useState } from 'react';
import CafeCard from '../components/ui/CafeCard';

export default function Explore() {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    // Fetch cafes from api
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-4 pb-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
        {cafes.map((cafe) => (
          <CafeCard key={cafe.id} cafe={cafe} />
        ))}
      </div>
    </div>
  );
}
