import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [displayedResults, setDisplayedResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [loadingStartedAt, setLoadingStartedAt] = useState(null);
  const [resultsToShow, setResultsToShow] = useState(3);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setDisplayedResults([]);
        setIsLoading(false);
        setResultsToShow(3);
        return;
      }

      setLoadingStartedAt(Date.now());
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5000/search?q=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) throw new Error('Failed to fetch results');
        const data = await response.json();

        setSearchResults(data);
        setDisplayedResults(data.slice(0, resultsToShow));
      } catch (error) {
        setError(error.message);
      } finally {
        const timeElapsed = Date.now() - loadingStartedAt;
        const minDisplayTime = 3000;
        const remainingTime = Math.max(minDisplayTime - timeElapsed, 0);

        timeoutRef.current = setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchSearchResults();
    }, 300); // 300 ms

    return () => {
      clearTimeout(debounceFetch);
      clearTimeout(timeoutRef.current);
    };
  }, [searchQuery, resultsToShow]);

  const loadMoreResults = async () => {
    if (isLoadingMore || searchResults.length <= displayedResults.length) return;

    setIsLoadingMore(true);
    try {
      const nextPageResults = searchResults.slice(displayedResults.length, displayedResults.length + 3);
      setDisplayedResults(prev => [...prev, ...nextPageResults]);
      setResultsToShow(prev => prev + 3);
    } catch (error) {
      setError('Failed to load more results');
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setResultsToShow(3);
  };

  const handlePlayerClick = (playerTag) => {
    navigate(`/player/${encodeURIComponent(playerTag)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      <header className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Clash Stats</h1>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search players..."
          className="w-full p-2 border rounded"
        />
        {error && (
          <div className="mt-4 bg-red-100 text-red-700 p-4 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}
        {isLoading && !isLoadingMore && (
          <div className="mt-4 flex justify-center items-center">
            <svg className="animate-spin h-8 w-8 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2z"></path>
            </svg>
          </div>
        )}
        {!isLoading && displayedResults.length === 0 && searchQuery.trim() && (
          <div className="mt-4 text-gray-600 text-lg">No players found</div>
        )}
        {!isLoading && displayedResults.length > 0 && (
          <ul className="mt-4 space-y-2">
            {displayedResults.map((player, index) => (
              <li
                key={player.tag}
                className={`p-2 cursor-pointer hover:bg-gray-200 rounded ${index < displayedResults.length - 1 ? 'border-b border-gray-300' : ''}`}
                onClick={() => handlePlayerClick(player.tag)}
              >
                <span className="font-semibold">{player.name}</span> <span className="text-gray-500 pl-1">{player.tag}</span>
              </li>
            ))}
          </ul>
        )}
        {isLoadingMore && (
          <div className="mt-4 flex justify-center items-center">
            <svg className="animate-spin h-8 w-8 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2z"></path>
            </svg>
          </div>
        )}
        {!isLoading && searchResults.length > displayedResults.length && !isLoadingMore && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={loadMoreResults}
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Load More
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default SearchPage;
