import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ExplorePage from './pages/Explore';
import Marketplace from './pages/Marketplace';
import Royalties from './pages/Royalties';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/royalties" element={<Royalties />} />
      </Routes>
    </Router>
  );
}

export default App;
