import { Link } from 'react-router-dom';
import { FiHome, FiCalendar, FiCompass, FiUser, FiPlus } from 'react-icons/fi';

export default function BottomNav({ onCheckinClick }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center">
        <Link to="/" className="flex-1 py-4 text-center hover:bg-gray-100 flex flex-col items-center gap-1">
          <FiHome size={24} />
          <span className="text-xs">Activity</span>
        </Link>
        <Link to="/explore" className="flex-1 py-4 text-center hover:bg-gray-100 flex flex-col items-center gap-1">
          <FiCompass size={24} />
          <span className="text-xs">Explore</span>
        </Link>
        
        {/* Center Check-In Button */}
        <button
          onClick={onCheckinClick}
          className="w-16 h-16 -mt-8 bg-coffee text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition z-50"
        >
          <FiPlus size={32} />
        </button>
        
        <Link to="/checkin" className="flex-1 py-4 text-center hover:bg-gray-100 flex flex-col items-center gap-1">
          <FiCompass size={24} />
          <span className="text-xs">Discover</span>
        </Link>
        <Link to="/profile" className="flex-1 py-4 text-center hover:bg-gray-100 flex flex-col items-center gap-1">
          <FiUser size={24} />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
