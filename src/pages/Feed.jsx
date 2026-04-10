import { useEffect, useState } from 'react';
import CheckinCard from '../components/ui/CheckinCard';

export default function Feed() {
  const [checkins, setCheckins] = useState([]);
  const [filter, setFilter] = useState('friends');

  useEffect(() => {
    // Fetch checkins from api
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-0 py-0 pb-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="w-full flex gap-0">
        <button
          onClick={() => setFilter('friends')}
          className={`flex-1 px-4 py-2 rounded-none font-semibold transition ${
            filter === 'friends'
              ? 'bg-coffee text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Friends
        </button>
        <button
          onClick={() => setFilter('nearby')}
          className={`flex-1 px-4 py-2 rounded-none font-semibold transition ${
            filter === 'nearby'
              ? 'bg-coffee text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Nearby
        </button>
        <button
          onClick={() => setFilter('groups')}
          className={`flex-1 px-4 py-2 rounded-none font-semibold transition ${
            filter === 'groups'
              ? 'bg-coffee text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Groups
        </button>
      </div>
      <div className="w-full px-4 max-w-2xl mt-4">
        {checkins.map((checkin) => (
          <CheckinCard key={checkin.id} checkin={checkin} />
        ))}
      </div>
    </div>
  );
}
