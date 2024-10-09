import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import PlayerSearch from '../components/PlayerSearch';
import ClanSearch from '../components/ClanSearch';

function SearchPage() {
  const [displayQuery, setDisplayQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const images = [
    '/images/characters/barbarian.png',
    '/images/characters/night-witch.png',
    '/images/characters/valkyrie.png',
  ];

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
        setError(error.message);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(debounceFetch);
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

  const handleResultClick = (tag) => {
    navigate(`/player/${encodeURIComponent(tag)}`);
  };

  return (
    <div className="min-h-screen bg-darker-blue flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-4xl flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {/* Image Carousel Section */}
        <ImageCarousel images={images} />

        {/* Player Search Section */}
        <PlayerSearch
          displayQuery={displayQuery}
          onChange={handleSearchChange}
          onClick={handleSearchClick}
          searchResults={searchResults}
          isLoading={isLoading}
          error={error}
          onResultClick={handleResultClick}
        />
      </div>

      {/* Clan Search Section WIP*/}
      <ClanSearch />
    </div>
  );
}

export default SearchPage;
