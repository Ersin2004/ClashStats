import './index.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy-loaded components
const SearchPage = lazy(() => import('./pages/SearchPage'));
const PlayerDetailPage = lazy(() => import('./pages/PlayerDetailPage'));

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<div className="text-center text-gray">Loading...</div>}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/player/:tag" element={<PlayerDetailPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
