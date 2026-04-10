export default function DrinkBadge({ drink, count }) {
  return (
    <div className="inline-flex items-center gap-2 bg-coffee bg-opacity-10 rounded-full px-3 py-1 text-sm">
      <span className="text-coffee font-semibold">{drink}</span>
      {count && <span className="bg-coffee text-white rounded-full px-2 text-xs">{count}</span>}
    </div>
  );
}
