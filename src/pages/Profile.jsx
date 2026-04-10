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
    <div className="w-full flex flex-col items-center px-4 pt-4 pb-20 bg-cream text-coffee">
      <div className="bg-cream-soft rounded-lg shadow p-6 w-full max-w-md">
        <p className="text-lg font-semibold mb-2">{user.name}</p>
        <p className="text-coffee/70">{user.bio}</p>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="relative bg-cream p-4 rounded overflow-hidden">
            <div className="absolute top-[-0.75rem] right-[-0.75rem] w-24 h-24 bg-sage/10 rounded-2xl" />
            <div className="relative">
              <p className="text-sm text-coffee/70">Check-ins</p>
              <p className="text-3xl font-bold">{checkinCount}</p>
            </div>
          </div>
          <div className="relative bg-cream p-4 rounded overflow-hidden">
            <div className="absolute bottom-[-0.75rem] left-[-0.75rem] w-24 h-24 bg-sage/10 rounded-2xl" />
            <div className="relative">
              <p className="text-sm text-coffee/70">Favorite Cafes</p>
              <p className="text-3xl font-bold">{user.favoriteCafes?.length || 0}</p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-6 mb-3">Favorite Drinks</h3>
        <div className="flex flex-wrap gap-2">
          {drinks.map((drink) => (
            <div key={drink} className="relative">
              <div className="absolute inset-0 m-0.5 bg-sage/10 rounded-2xl" />
              <div className="relative z-10">
                <DrinkBadge drink={drink} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
