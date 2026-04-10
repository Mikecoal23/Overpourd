import { NavLink } from 'react-router-dom';
import { FiHome, FiCalendar, FiCompass, FiUser, FiPlus } from 'react-icons/fi';

export default function BottomNav({ isCheckinOpen, onCheckinClick }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-cream-soft border-t border-cream">
      <div className="flex justify-around items-center">
        <NavLink to="/" className="flex-1 text-center">
          {({ isActive }) => (
            <div className="py-4 flex flex-col items-center gap-1 transition">
              <span className={`p-2 rounded-full transition ${isActive ? 'bg-sage text-cream' : 'bg-cream text-coffee'}`}>
                <FiHome size={24} />
              </span>
              <span className={`text-xs ${isActive ? 'text-coffee' : 'text-coffee/80'}`}>Activity</span>
            </div>
          )}
        </NavLink>
        <NavLink to="/explore" className="flex-1 text-center">
          {({ isActive }) => (
            <div className="py-4 flex flex-col items-center gap-1 transition">
              <span className={`p-2 rounded-full transition ${isActive ? 'bg-sage text-cream' : 'bg-cream text-coffee'}`}>
                <FiCalendar size={24} />
              </span>
              <span className={`text-xs ${isActive ? 'text-coffee' : 'text-coffee/80'}`}>Events</span>
            </div>
          )}
        </NavLink>
        
        {/* Center Check-In Button */}
        <button
          onClick={onCheckinClick}
          className="relative w-16 h-16 -mt-8 rounded-full overflow-hidden shadow-lg transition hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sage/50 z-50 border border-cream-soft bg-white flex items-center justify-center"
          type="button"
        >
          <span
            className={`absolute inset-0 rounded-full transition-all duration-300 ease-out origin-center ${
              isCheckinOpen ? 'scale-100 bg-sage opacity-100' : 'scale-0 bg-sage opacity-0'
            }`}
          />
          <span className={`relative transition-colors duration-300 ${isCheckinOpen ? 'text-cream' : 'text-black'}`}>
            <FiPlus size={32} />
          </span>
        </button>
        
        <NavLink to="/checkin" className="flex-1 text-center">
          {({ isActive }) => (
            <div className="py-4 flex flex-col items-center gap-1 transition">
              <span className={`p-2 rounded-full transition ${isActive ? 'bg-sage text-cream' : 'bg-cream text-coffee'}`}>
                <FiCompass size={24} />
              </span>
              <span className={`text-xs ${isActive ? 'text-coffee' : 'text-coffee/80'}`}>Discover</span>
            </div>
          )}
        </NavLink>
        <NavLink to="/profile" className="flex-1 text-center">
          {({ isActive }) => (
            <div className="py-4 flex flex-col items-center gap-1 transition">
              <span className={`p-2 rounded-full transition ${isActive ? 'bg-sage text-cream' : 'bg-cream text-coffee'}`}>
                <FiUser size={24} />
              </span>
              <span className={`text-xs ${isActive ? 'text-coffee' : 'text-coffee/80'}`}>Profile</span>
            </div>
          )}
        </NavLink>
      </div>
    </nav>
  );
}
