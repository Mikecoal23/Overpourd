import { useEffect, useState } from 'react';
import CheckinCard from '../components/ui/CheckinCard';

export default function Feed() {
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    // Fetch checkins from api
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 pb-20">
      {checkins.map((checkin) => (
        <CheckinCard key={checkin.id} checkin={checkin} />
      ))}
      <h2 className="text-2xl font-bold mt-4">Activity</h2>
    </div>
  );
}
