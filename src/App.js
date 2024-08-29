import './index.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './SearchPage';
import PlayerDetailPage from './PlayerDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/player/:tag" element={<PlayerDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
