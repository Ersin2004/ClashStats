import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
  const [displayQuery, setDisplayQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim() || searchQuery === '#') {
        setSearchResults([]);
        setIsLoading(false);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const query = searchQuery.startsWith('#') ? searchQuery : `#${searchQuery}`;
        const response = await fetch(`http://localhost:5000/search?q=${encodeURIComponent(query)}`);

        if (!response.ok) {
          throw new Error('Failed to fetch player data');
        }

        const data = await response.json();

        if (data.error) {
          setError(data.error);
          setSearchResults([]);
        } else {
          setSearchResults([data]);
        }
      } catch (error) {
        if (searchQuery.trim() && searchQuery !== '#') {
          setError(error.message);
        }
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => {
      clearTimeout(debounceFetch);
      clearTimeout(timeoutRef.current);
    };
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setDisplayQuery(value);

    if (!value.startsWith('#')) {
      setSearchQuery(`#${value}`);
    } else {
      setSearchQuery(value);
    }

    if (!value.trim() || value === '#') {
      setError(null);
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() && searchQuery !== '#') {
      navigate(`/player/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      <header className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Clash Stats</h1>
        <div className="flex items-center border border-gray-300 rounded">
          <div className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
            </svg>
          </div>
          <input
            type="text"
            value={displayQuery}
            onChange={handleSearchChange}
            placeholder="LVRQCP9G0"
            className="w-full p-2 border-none rounded-r"
          />
          <button
            onClick={handleSearchClick}
            className="ml-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        {isLoading && (
          <div className="mt-4 flex justify-center items-center">
            <svg className="animate-spin h-8 w-8 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2z"></path>
            </svg>
          </div>
        )}
        {error && !isLoading && (
          <div className="mt-4 bg-red-100 text-red-700 p-4 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}
        {!isLoading && searchResults.length > 0 && (
          <ul className="mt-4 space-y-2">
            {searchResults.map((player, index) => (
              <li
                key={player.tag}
                className={`p-2 cursor-pointer hover:bg-gray-200 rounded ${index < searchResults.length - 1 ? 'border-b border-gray-300' : ''}`}
                onClick={() => navigate(`/player/${encodeURIComponent(player.tag)}`)}
              >
                <span className="font-semibold">{player.name}</span> <span className="text-gray-500 pl-1">{player.tag}</span>
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default SearchPage;
