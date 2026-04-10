import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import CheckinModal from './components/ui/CheckinModal';
import Feed from './pages/Feed';
import Explore from './pages/Explore';
import CafePage from './pages/CafePage';
import Checkin from './pages/Checkin';
import Profile from './pages/Profile';
import Friends from './pages/Friends';
import Groups from './pages/Groups';
import './index.css';

function App() {
  const [isCheckinOpen, setIsCheckinOpen] = useState(false);

  const handleCheckinSubmit = (data) => {
    console.log('Check-in submitted:', data);
    // TODO: Send data to API
    setIsCheckinOpen(false);
  };

  return (
    <Router>
      <Header />
      <div className="pt-20 pb-20 min-h-screen bg-cream text-coffee">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/cafe/:id" element={<CafePage />} />
          <Route path="/checkin" element={<Checkin />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <BottomNav isCheckinOpen={isCheckinOpen} onCheckinClick={() => setIsCheckinOpen(true)} />
      
      {/* Check-In Modal */}
      <CheckinModal
        isOpen={isCheckinOpen}
        onClose={() => setIsCheckinOpen(false)}
        onSubmit={handleCheckinSubmit}
      />
    </Router>
  );
}

export default App;
