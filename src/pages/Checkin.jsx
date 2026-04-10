import { useState } from 'react';
import CafeCard from '../components/ui/CafeCard';

export default function Discover() {
  const [showMap, setShowMap] = useState(false);
  const [selectedTab, setSelectedTab] = useState('nearby');

  // Mock data - replace with API calls
  const nearby = [
    { id: 1, name: 'Bean There', distance: '0.3 mi', specialty: 'Espresso' },
    { id: 2, name: 'Brew Lab', distance: '0.5 mi', specialty: 'Cold Brew' },
    { id: 3, name: 'Coffee Corner', distance: '0.8 mi', specialty: 'Latte' },
  ];

  const badges = [
    { id: 1, name: 'Early Bird', icon: '🌅', description: 'Check in before 7 AM' },
    { id: 2, name: 'Social Butterfly', icon: '🦋', description: 'Check in with 5+ friends' },
    { id: 3, name: 'Explorer', icon: '🗺️', description: 'Visit 10 different cafes' },
  ];

  const trending = [
    { id: 1, name: 'Oat Milk Latte', popularity: 234, icon: '☕' },
    { id: 2, name: 'Cold Brew', popularity: 189, icon: '🧊' },
    { id: 3, name: 'Cappuccino', popularity: 156, icon: '🫗' },
  ];

  const recommended = [
    { id: 1, name: 'Mocha Madness', reason: 'Popular near you', rating: 4.8 },
    { id: 2, name: 'Vanilla Flat White', reason: 'Trending this week', rating: 4.6 },
    { id: 3, name: 'Iced Americano', reason: 'Your friends love it', rating: 4.9 },
  ];

  const CafeItemCard = ({ cafe }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-md p-4 hover:shadow-lg dark:hover:shadow-lg transition dark:text-white">
      <h3 className="font-semibold text-lg">{cafe.name}</h3>
      {cafe.distance && <p className="text-sm text-gray-600 dark:text-gray-400">{cafe.distance}</p>}
      {cafe.specialty && <p className="text-sm text-coffee font-medium">{cafe.specialty}</p>}
      {cafe.rating && <p className="text-sm text-yellow-500">⭐ {cafe.rating}</p>}
    </div>
  );

  const BadgeCard = ({ badge }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-md p-4 text-center hover:shadow-lg dark:hover:shadow-lg transition dark:text-white">
      <div className="text-3xl mb-2">{badge.icon}</div>
      <h3 className="font-semibold">{badge.name}</h3>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{badge.description}</p>
    </div>
  );

  const TrendingCard = ({ item }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-md p-4 flex items-center justify-between hover:shadow-lg dark:hover:shadow-lg transition dark:text-white">
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{item.popularity} check-ins</p>
      </div>
      <span className="text-2xl">{item.icon}</span>
    </div>
  );

  const RecommendedCard = ({ item }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-md p-4 hover:shadow-lg dark:hover:shadow-lg transition dark:text-white">
      <h3 className="font-semibold text-lg">{item.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.reason}</p>
      <p className="text-sm text-yellow-500 mt-2">⭐ {item.rating}</p>
    </div>
  );

  return (
    <div className="w-full min-h-screen pb-20 bg-white dark:bg-gray-900 transition-colors">
      {/* Map Toggle Section */}
      <div className="px-4 py-4 bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700 transition-colors">
        <button
          onClick={() => setShowMap(!showMap)}
          className="w-full bg-coffee text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
        >
          {showMap ? '🗺️ Hide Map' : '🗺️ Show Map'}
        </button>
      </div>

      {/* Map Placeholder */}
      {showMap && (
        <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 border-b dark:border-gray-700 transition-colors">
          <p>Map view coming soon</p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 z-10 transition-colors">
        <div className="flex w-full gap-0">
          {['nearby', 'badges', 'trending', 'recommended'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex-1 py-3 px-0 font-semibold whitespace-nowrap transition border-r dark:border-gray-700 last:border-r-0 ${
                selectedTab === tab
                  ? 'bg-coffee text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-4 py-6 max-w-6xl mx-auto w-full">
        {selectedTab === 'nearby' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Nearby Cafes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearby.map((cafe) => (
                <CafeItemCard key={cafe.id} cafe={cafe} />
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'badges' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Earn Badges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'trending' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Trending Drinks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trending.map((item) => (
                <TrendingCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'recommended' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommended.map((item) => (
                <RecommendedCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
