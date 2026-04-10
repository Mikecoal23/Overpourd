function buildMapPreviewUrl(cafe) {
  if (typeof cafe?.lat !== "number" || typeof cafe?.lng !== "number") return null;
  const center = `${cafe.lat},${cafe.lng}`;
  return `https://staticmap.openstreetmap.de/staticmap.php?center=${center}&zoom=15&size=900x360&markers=${center},brown-pushpin`;
}

function fallbackSvgDataUri(title = "Cafe location") {
  const safeTitle = String(title)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="360" viewBox="0 0 900 360">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f5e9dc" />
          <stop offset="100%" stop-color="#e9d5c0" />
        </linearGradient>
      </defs>
      <rect width="900" height="360" fill="url(#bg)" />
      <circle cx="450" cy="165" r="56" fill="#8B4513" opacity="0.9" />
      <circle cx="450" cy="165" r="26" fill="#fff" />
      <path d="M450 257c-48-41-71-67-71-102a71 71 0 1 1 142 0c0 35-23 61-71 102z" fill="none" stroke="#8B4513" stroke-width="10" />
      <text x="450" y="316" font-family="system-ui, sans-serif" font-size="28" text-anchor="middle" fill="#4b2e1f">${safeTitle}</text>
    </svg>
  `)}`;
}

export default function CafeCard({ cafe, onClick }) {
  const mapPreviewUrl = cafe.image || buildMapPreviewUrl(cafe);
  const imageSrc = mapPreviewUrl || fallbackSvgDataUri(cafe?.name || "Cafe location");

  return (
    <div
      className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.();
        }
      }}
    >
      <img
        src={imageSrc}
        alt={cafe.name}
        className="w-full h-48 object-cover"
        loading="lazy"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = fallbackSvgDataUri(cafe?.name || "Cafe location");
        }}
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{cafe.name}</h3>
        <p className="text-gray-600 text-sm">{cafe.address || cafe.location}</p>
        <p className="text-yellow-500 mt-2">★ {cafe.rating}</p>
      </div>
    </div>
  );
}
