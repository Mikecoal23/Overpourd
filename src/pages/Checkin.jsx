import { useState } from 'react';
import CafeCard from '../components/ui/CafeCard';

export default function Discover() {
  const [showMap, setShowMap] = useState(false);
  const [selectedTab, setSelectedTab] = useState('nearby');
  const [selectedBadgeId, setSelectedBadgeId] = useState(null);

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
    <div className="bg-cream-soft rounded-lg shadow p-4 hover:shadow-lg transition">
      <h3 className="font-semibold text-lg text-coffee">{cafe.name}</h3>
      {cafe.distance && <p className="text-sm text-coffee/70">{cafe.distance}</p>}
      {cafe.specialty && <p className="text-sm text-coffee font-medium">{cafe.specialty}</p>}
      {cafe.rating && <p className="text-sm text-sage">⭐ {cafe.rating}</p>}
    </div>
  );

  const BadgeCard = ({ badge, selected, onSelect }) => (
    <button
      type="button"
      onClick={() => onSelect(badge.id)}
      className={`w-full bg-cream-soft rounded-3xl shadow-sm p-4 text-center transition-all duration-300 ease-out transform ${
        selected ? 'shadow-lg -translate-y-0.5' : 'hover:-translate-y-0.5 hover:shadow-md'
      } focus:outline-none focus-visible:ring-2 focus-visible:ring-sage/50`}
    >
      <div
        className={`w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors duration-300 ${
          selected ? 'bg-sage text-cream' : 'bg-cream text-coffee'
        }`}
      >
        <span className="text-3xl">{badge.icon}</span>
      </div>
      <h3 className="font-semibold">{badge.name}</h3>
      <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
    </button>
  );

  const TrendingCard = ({ item }) => (
    <div className="bg-cream-soft rounded-lg shadow p-4 flex items-center justify-between hover:shadow-lg transition">
      <div>
        <h3 className="font-semibold text-coffee">{item.name}</h3>
        <p className="text-sm text-coffee/70">{item.popularity} check-ins</p>
      </div>
      <span className="text-2xl">{item.icon}</span>
    </div>
  );

  const RecommendedCard = ({ item }) => (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
      <h3 className="font-semibold text-lg">{item.name}</h3>
      <p className="text-sm text-gray-600 mt-1">{item.reason}</p>
      <p className="text-sm text-yellow-500 mt-2">⭐ {item.rating}</p>
    </div>
  );

  return (
    <div className="w-full min-h-screen pb-20">
      {/* Map Toggle Section */}
      <div className="px-4 py-4 bg-cream border-b border-cream-soft">
        <button
          onClick={() => setShowMap(!showMap)}
          className="w-full bg-coffee text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
        >
          {showMap ? '🗺️ Hide Map' : '🗺️ Show Map'}
        </button>
      </div>

      {/* Map Placeholder */}
      {showMap && (
        <div className="w-full h-64 bg-cream-soft flex items-center justify-center text-coffee/70 border-b border-cream-soft">
          <p>Map view coming soon</p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="sticky top-0 bg-cream border-b border-cream-soft z-10">
        <div className="flex w-full gap-0">
          {['nearby', 'badges', 'trending', 'recommended'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex-1 py-3 px-0 font-semibold whitespace-nowrap transition border-r last:border-r-0 ${
                selectedTab === tab
                  ? 'bg-sage text-cream'
                  : 'bg-cream-soft text-coffee hover:bg-cream'
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
            <h2 className="text-2xl font-bold mb-4">Nearby Cafes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearby.map((cafe) => (
                <CafeItemCard key={cafe.id} cafe={cafe} />
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'badges' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Earn Badges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map((badge) => (
                <BadgeCard
                  key={badge.id}
                  badge={badge}
                  selected={selectedBadgeId === badge.id}
                  onSelect={setSelectedBadgeId}
                />
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'trending' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Trending Drinks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trending.map((item) => (
                <TrendingCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'recommended' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
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
