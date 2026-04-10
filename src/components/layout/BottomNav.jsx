import { Link } from 'react-router-dom';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors">
      <div className="flex justify-around">
        <Link to="/" className="flex-1 py-4 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <span className="dark:text-gray-200">Activity</span>
        </Link>
        <Link to="/explore" className="flex-1 py-4 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <span className="dark:text-gray-200">Events</span>
        </Link>
        <Link to="/checkin" className="flex-1 py-4 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <span className="dark:text-gray-200">Discover</span>
        </Link>
        <Link to="/profile" className="flex-1 py-4 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <span className="dark:text-gray-200">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
