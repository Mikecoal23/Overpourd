export default function CheckinCard({ checkin }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{checkin.user}</h3>
          <p className="text-gray-600 text-sm">{checkin.cafe}</p>
        </div>
        <span className="text-sm text-gray-500">{checkin.date}</span>
      </div>
      <p className="mt-2 text-gray-700">{checkin.drink}</p>
    </div>
  );
}
