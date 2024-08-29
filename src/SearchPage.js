import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5000/search?q=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) throw new Error('Failed to fetch results');
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchSearchResults();
    }, 300); // Debounce delay

    return () => clearTimeout(debounceFetch);
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
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
        {isLoading && <div className="mt-4 text-gray-600 text-lg">Loading...</div>}
        {!isLoading && searchResults.length > 0 && (
          <ul className="mt-4 space-y-2">
            {searchResults.map(player => (
              <li
                key={player.tag}
                className="cursor-pointer p-2 hover:bg-gray-200 rounded"
                onClick={() => handlePlayerClick(player.tag)}
              >
                <span className="font-semibold">{player.name}</span>
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default SearchPage;
