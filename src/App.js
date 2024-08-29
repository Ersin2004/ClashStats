import './index.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Lazy-loaded components
const SearchPage = lazy(() => import('./SearchPage'));
const PlayerDetailPage = lazy(() => import('./PlayerDetailPage'));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error occurred:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-center text-red-600">Something went wrong.</div>;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<div className="text-center text-gray-600">Loading...</div>}>
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
