import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Activity';
      case '/explore':
        return 'Events';
      case '/checkin':
        return 'Discover';
      case '/friends':
        return 'Friends';
      case '/groups':
        return 'Groups';
      case '/profile':
        return 'Profile';
      default:
        return 'Overpourd';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-cream-soft border-b border-cream z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center">
        <h1 className="text-2xl font-bold text-coffee">{getPageTitle()}</h1>
      </div>
    </header>
  );
}
