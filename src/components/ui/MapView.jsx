// src/components/ui/MapView.jsx
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default marker icons (broken by Vite's asset bundling)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom coffee-colored marker
const coffeeIcon = new L.Icon({
  iconUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="32" height="42">
      <path d="M16 0C7.16 0 0 7.16 0 16c0 10.5 16 26 16 26S32 26.5 32 16C32 7.16 24.84 0 16 0z" fill="#8B4513"/>
      <circle cx="16" cy="16" r="8" fill="white"/>
      <text x="16" y="20" text-anchor="middle" font-size="11" fill="#8B4513">☕</text>
    </svg>
  `)}`,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42],
});

// Re-centers the map when userLocation changes
function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 14);
  }, [center, map]);
  return null;
}

export default function MapView({ cafes = [], selectedCafe, onSelectCafe, userLocation }) {
  const defaultCenter = userLocation || [32.2795, -106.7467]; // Las Cruces, NM fallback

  // Filter cafes that have valid coordinates
  const validCafes = cafes.filter(cafe => {
    const lat = cafe.lat || cafe.latitude;
    const lng = cafe.lng || cafe.longitude;
    return lat && lng && !isNaN(lat) && !isNaN(lng);
  });

  return (
    <MapContainer
      center={defaultCenter}
      zoom={14}
      className="w-full h-full rounded-xl"
      style={{ height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {userLocation && (
        <Marker
          position={userLocation}
          icon={new L.Icon({
            iconUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
                <circle cx="10" cy="10" r="8" fill="#3B82F6" stroke="white" stroke-width="2"/>
              </svg>
            `)}`,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          })}
        >
          <Popup>You are here</Popup>
        </Marker>
      )}

      {validCafes.map((cafe) => {
        const lat = cafe.lat || cafe.latitude;
        const lng = cafe.lng || cafe.longitude;
        return (
          <Marker
            key={cafe.id}
            position={[lat, lng]}
            icon={coffeeIcon}
            eventHandlers={{ click: () => onSelectCafe?.(cafe) }}
          >
            <Popup>
              <div className="text-sm font-semibold">{cafe.name}</div>
              <div className="text-xs text-gray-500">{cafe.address || 'No address'}</div>
              <button
                className="mt-1 text-xs text-amber-800 font-medium underline"
                onClick={() => onSelectCafe?.(cafe)}
              >
                View café →
              </button>
            </Popup>
          </Marker>
        );
      })}

      <RecenterMap center={userLocation} />
    </MapContainer>
  );
}
