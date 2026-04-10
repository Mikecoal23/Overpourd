import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CafeCard from '../components/ui/CafeCard';
import MapView from '../components/ui/MapView';
import { useCafes } from '../hooks/useCafes';

// Error Boundary wrapper
function MapWithErrorHandling({ cafes, selectedCafe, onSelectCafe, userLocation }) {
  try {
    return (
      <MapView
        cafes={cafes}
        selectedCafe={selectedCafe}
        onSelectCafe={onSelectCafe}
        userLocation={userLocation}
      />
    );
  } catch (err) {
    console.error('Map rendering error:', err);
    return (
      <div className="flex items-center justify-center h-full bg-red-50 text-red-600 p-4">
        <div className="text-center">
          <p className="font-semibold">Map Error</p>
          <p className="text-sm mt-1">Unable to render map. Please try again.</p>
        </div>
      </div>
    );
  }
}

export default function Discover() {
  const { cafes, loading, error } = useCafes();
  const [showMap, setShowMap] = useState(false);
  const [selectedTab, setSelectedTab] = useState('nearby');
  const [userLocation, setUserLocation] = useState(null);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const navigate = useNavigate();

  // Request user's location on mount
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
      () => console.warn("Location access denied — using default center.")
    );
  }, []);

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
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
      <h3 className="font-semibold text-lg">{cafe.name}</h3>
      {cafe.distance && <p className="text-sm text-gray-600">{cafe.distance}</p>}
      {cafe.specialty && <p className="text-sm text-coffee font-medium">{cafe.specialty}</p>}
      {cafe.rating && <p className="text-sm text-yellow-500">⭐ {cafe.rating}</p>}
    </div>
  );

  const BadgeCard = ({ badge }) => (
    <div className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition">
      <div className="text-3xl mb-2">{badge.icon}</div>
      <h3 className="font-semibold">{badge.name}</h3>
      <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
    </div>
  );

  const TrendingCard = ({ item }) => (
    <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between hover:shadow-lg transition">
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600">{item.popularity} check-ins</p>
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
      <div className="px-4 py-4 bg-stone-50 border-b">
        <button
          onClick={() => setShowMap(!showMap)}
          className="w-full bg-coffee text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
        >
          {showMap ? '🗺️ Hide Map' : '🗺️ Show Map'}
        </button>
      </div>

      {/* Map Placeholder */}
      {showMap && (
        <div className="w-full bg-stone-50 border-b">
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <p className="text-stone-600 mb-2">Loading map...</p>
                <div className="w-8 h-8 border-4 border-stone-300 border-t-coffee rounded-full animate-spin mx-auto"></div>
              </div>
            </div>
          ) : error ? (
            <div className="h-64 flex items-center justify-center bg-red-50">
              <div className="text-center p-4">
                <p className="text-red-600 font-semibold mb-2">⚠️ Map Error</p>
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            </div>
          ) : (
            <div className="h-64 p-3">
              <MapWithErrorHandling
                cafes={cafes}
                selectedCafe={selectedCafe}
                onSelectCafe={setSelectedCafe}
                userLocation={userLocation}
              />
            </div>
          )}

          {/* Selected Cafe Info Card */}
          {selectedCafe && (
            <div className="px-4 py-3 bg-white border-t border-stone-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-stone-800">{selectedCafe.name}</h3>
                  <p className="text-sm text-stone-500">{selectedCafe.address}</p>
                  {selectedCafe.rating && (
                    <p className="text-sm mt-1">
                      ⭐ {selectedCafe.rating} · {selectedCafe.checkinCount ?? 0} check-ins
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedCafe(null)}
                  className="text-stone-400 hover:text-stone-600 text-lg"
                >
                  ✕
                </button>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => navigate(`/cafe/${selectedCafe.id}`)}
                  className="flex-1 bg-coffee text-white rounded-lg py-2 text-sm font-medium hover:bg-opacity-90"
                >
                  View Café
                </button>
                <button
                  onClick={() => navigate(`/cafe/${selectedCafe.id}?checkin=true`)}
                  className="flex-1 border border-coffee text-coffee rounded-lg py-2 text-sm font-medium hover:bg-cream"
                >
                  Check In ☕
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="flex w-full gap-0">
          {['nearby', 'badges', 'trending', 'recommended'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex-1 py-3 px-0 font-semibold whitespace-nowrap transition border-r last:border-r-0 ${
                selectedTab === tab
                  ? 'bg-coffee text-white'
                  : 'bg-cream text-coffee hover:bg-cream-soft'
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
                <BadgeCard key={badge.id} badge={badge} />
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
