import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Activity';
      case '/explore':
        return 'Explore';
      case '/checkin':
        return 'Check In';
      case '/profile':
        return 'Profile';
      default:
        return 'Overpourd';
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-coffee">{getPageTitle()}</h1>
      </div>
    </header>
  );
}
