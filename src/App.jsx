import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import Feed from './pages/Feed';
import Explore from './pages/Explore';
import CafePage from './pages/CafePage';
import Checkin from './pages/Checkin';
import Profile from './pages/Profile';
import './index.css';

function App() {
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
    </Router>
  );
}

export default App;
