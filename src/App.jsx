import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import CheckinModal from './components/ui/CheckinModal';
import Feed from './pages/Feed';
import Explore from './pages/Explore';
import CafePage from './pages/CafePage';
import Checkin from './pages/Checkin';
import Profile from './pages/Profile';
import './index.css';

function AppContent() {
  const [isCheckinOpen, setIsCheckinOpen] = useState(false);

  const handleCheckinSubmit = (data) => {
    console.log('Check-in submitted:', data);
    // TODO: Send data to API
    setIsCheckinOpen(false);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/cafe/:id" element={<CafePage />} />
        <Route path="/checkin" element={<Checkin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <BottomNav />
      
      {/* Floating Check-In Button */}
      <button
        onClick={() => setIsCheckinOpen(true)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-coffee text-white rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 transition text-2xl font-bold z-40"
      >
        +
      </button>
      
      {/* Check-In Modal */}
      <CheckinModal
        isOpen={isCheckinOpen}
        onClose={() => setIsCheckinOpen(false)}
        onSubmit={handleCheckinSubmit}
      />
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
