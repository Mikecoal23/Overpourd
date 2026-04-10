// src/pages/Explore.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MapView from "../components/ui/MapView";
import CafeCard from "../components/ui/CafeCard";
import { useCafes } from "../hooks/useCafes";

export default function Explore() {
  const { cafes, loading } = useCafes();
  const [view, setView] = useState("map"); // "map" | "list"
  const [userLocation, setUserLocation] = useState(null);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Request user's location on mount
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
      () => console.warn("Location access denied — using default center.")
    );
  }, []);

  const filtered = cafes.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-stone-50">
      {/* Header */}
      <div className="px-4 pt-6 pb-3 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-stone-800 mb-3">Explore Cafés</h1>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search cafés..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-stone-200 rounded-lg px-4 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-amber-800 mb-3"
        />

        {/* Map / List toggle */}
        <div className="flex bg-stone-100 rounded-lg p-1 gap-1">
          {["map", "list"].map((mode) => (
            <button
              key={mode}
              onClick={() => setView(mode)}
              className={`flex-1 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${
                view === mode
                  ? "bg-white text-amber-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              {mode === "map" ? "🗺 Map" : "☰ List"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        {loading ? (
          <div className="flex items-center justify-center h-full text-stone-400">
            Loading cafés...
          </div>
        ) : view === "map" ? (
          <>
            {/* Map takes full remaining height */}
            <div className="h-full p-3">
              <MapView
                cafes={filtered}
                selectedCafe={selectedCafe}
                onSelectCafe={setSelectedCafe}
                userLocation={userLocation}
              />
            </div>

            {/* Bottom sheet for selected café */}
            {selectedCafe && (
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl shadow-xl p-4 border border-stone-100">
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
                    className="text-stone-400 hover:text-stone-600 text-lg leading-none"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => navigate(`/cafe/${selectedCafe.id}`)}
                    className="flex-1 bg-amber-900 text-white rounded-lg py-2 text-sm font-medium"
                  >
                    View Café
                  </button>
                  <button
                    onClick={() => navigate(`/checkin?cafeId=${selectedCafe.id}`)}
                    className="flex-1 border border-amber-900 text-amber-900 rounded-lg py-2 text-sm font-medium"
                  >
                    Check In ☕
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          // List view
          <div className="overflow-y-auto h-full px-4 py-3 space-y-3">
            {filtered.length === 0 ? (
              <p className="text-center text-stone-400 mt-10">No cafés found.</p>
            ) : (
              filtered.map((cafe) => (
                <CafeCard
                  key={cafe.id}
                  cafe={cafe}
                  onClick={() => navigate(`/cafe/${cafe.id}`)}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}