import { Link } from 'react-router-dom';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around">
        <Link to="/" className="flex-1 py-4 text-center hover:bg-gray-100">
          <span>Activity</span>
        </Link>
        <Link to="/explore" className="flex-1 py-4 text-center hover:bg-gray-100">
          <span>Events</span>
        </Link>
        <Link to="/checkin" className="flex-1 py-4 text-center hover:bg-gray-100">
          <span>Discover</span>
        </Link>
        <Link to="/profile" className="flex-1 py-4 text-center hover:bg-gray-100">
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  );
}
