import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import DrinkBadge from '../components/ui/DrinkBadge';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [checkinCount, setCheckinCount] = useState(0);
  const [drinks, setDrinks] = useState([]);
  const { isDark, toggleTheme } = useTheme();

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

  if (!user) return <div className="flex items-center justify-center w-full h-screen bg-white dark:bg-gray-900 dark:text-white">Loading...</div>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-4 pb-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-md p-6 dark:text-white transition-colors w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-lg font-semibold mb-2">{user.name}</p>
            <p className="text-gray-600 dark:text-gray-400">{user.bio}</p>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Toggle theme"
          >
            ⚙️
          </button>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded transition-colors">
            <p className="text-sm text-gray-600 dark:text-gray-400">Check-ins</p>
            <p className="text-3xl font-bold">{checkinCount}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded transition-colors">
            <p className="text-sm text-gray-600 dark:text-gray-400">Favorite Cafes</p>
            <p className="text-3xl font-bold">{user.favoriteCafes?.length || 0}</p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-6 mb-3">Favorite Drinks</h3>
        <div className="flex flex-wrap gap-2">
          {drinks.map((drink) => (
            <DrinkBadge key={drink} drink={drink} />
          ))}
        </div>

        <div className="mt-6 pt-6 border-t dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-3">Settings</h3>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            <span>{isDark ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
