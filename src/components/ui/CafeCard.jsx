export default function CafeCard({ cafe }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
      <img 
        src={cafe.image} 
        alt={cafe.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{cafe.name}</h3>
        <p className="text-gray-600 text-sm">{cafe.location}</p>
        <p className="text-yellow-500 mt-2">★ {cafe.rating}</p>
      </div>
    </div>
  );
}
