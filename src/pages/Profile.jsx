import { useEffect, useState } from 'react';
import DrinkBadge from '../components/ui/DrinkBadge';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [checkinCount, setCheckinCount] = useState(0);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    // Mock user profile data - replace with API call
    setUser({
      name: 'Coffee Lover',
      bio: 'Always exploring new cafes',
      favoriteCafes: ['Bean There', 'Brew Lab']
    });
    setCheckinCount(24);
    setDrinks(['Espresso', 'Latte', 'Cold Brew']);
  }, []);

  if (!user) return <div className="flex items-center justify-center w-full h-screen">Loading...</div>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-4 pb-20">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
        <p className="text-lg font-semibold mb-2">{user.name}</p>
        <p className="text-gray-600">{user.bio}</p>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-sm text-gray-600">Check-ins</p>
            <p className="text-3xl font-bold">{checkinCount}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-sm text-gray-600">Favorite Cafes</p>
            <p className="text-3xl font-bold">{user.favoriteCafes?.length || 0}</p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-6 mb-3">Favorite Drinks</h3>
        <div className="flex flex-wrap gap-2">
          {drinks.map((drink) => (
            <DrinkBadge key={drink} drink={drink} />
          ))}
        </div>
      </div>
    </div>
  );
}
