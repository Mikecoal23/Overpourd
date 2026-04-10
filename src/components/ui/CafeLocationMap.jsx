// src/pages/CafePage.jsx  (map section only — merge into your existing file)
// Add this import at the top of your existing CafePage.jsx:
//   import CafeLocationMap from "../components/ui/CafeLocationMap";
//
// Then drop <CafeLocationMap cafe={cafe} /> wherever you want the map to appear.

// src/components/ui/CafeLocationMap.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function CafeLocationMap({ cafe }) {
  if (!cafe?.lat || !cafe?.lng) return null;

  return (
    <div className="rounded-xl overflow-hidden border border-stone-200 shadow-sm">
      <MapContainer
        center={[cafe.lat, cafe.lng]}
        zoom={16}
        style={{ height: "200px", width: "100%" }}
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[cafe.lat, cafe.lng]}>
          <Popup>{cafe.name}</Popup>
        </Marker>
      </MapContainer>
      <div className="px-3 py-2 text-xs text-stone-500 bg-white flex items-center gap-1">
        📍 {cafe.address}
        <a
          href={`https://www.openstreetmap.org/?mlat=${cafe.lat}&mlon=${cafe.lng}#map=17/${cafe.lat}/${cafe.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-amber-800 underline font-medium"
        >
          Open in Maps →
        </a>
      </div>
    </div>
  );
}
