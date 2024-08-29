import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
  const [displayQuery, setDisplayQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(null);
  const navigate = useNavigate();
  const imageRef = useRef(null);

  const images = [
    '/images/characters/barbarian.png',
    '/images/characters/night-witch.png',
    '/images/characters/valkyrie.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevImageIndex(currentImageIndex);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Adjust the interval if needed

    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  useEffect(() => {
    const handleAnimationEnd = () => {
      if (imageRef.current) {
        imageRef.current.classList.remove('image-fade-in');
      }
    };

    if (imageRef.current) {
      imageRef.current.addEventListener('animationend', handleAnimationEnd);
      imageRef.current.classList.add('image-fade-in');
    }

    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [currentImageIndex]);

  useEffect(() => {
    if (prevImageIndex !== null) {
      const prevImage = document.querySelector(`.image[data-index='${prevImageIndex}']`);
      if (prevImage) {
        prevImage.classList.add('image-fade-out');
      }
    }
  }, [prevImageIndex]);

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
    <div className="min-h-screen bg-dark-blue flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-4xl flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {/* Image Carousel Section */}
        <div className="bg-darker-blue rounded-lg">
          <div className="relative w-64 h-64 overflow-hidden rounded-lg shadow image-container">
            {images.map((src, index) => (
              <img
                key={src}
                ref={index === currentImageIndex ? imageRef : null}a
                src={src}
                className={`image ${index === prevImageIndex ? 'image-fade-out' : ''}`}
                alt={`Character ${index}`}
                data-index={index}
                style={{ opacity: index === currentImageIndex || index === prevImageIndex ? 1 : 0 }}
              />
            ))}
          </div>
        </div>

        {/* Player Search Section */}
        <div className="bg-darker-blue p-6 rounded-lg shadow-md flex-1">
          <h1 className="text-3xl font-extrabold text-white mb-6 mt-6 text-center">Player Search</h1>
          <div className="flex items-center border border-white rounded">
            <div className="p-2 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
              </svg>
            </div>
            <input
              type="text"
              value={displayQuery}
              onChange={handleSearchChange}
              placeholder="LVRQCP9G0"
              className="w-full p-2 bg-darkest-blue text-white border-none"
            />
            <button
              onClick={handleSearchClick}
              className="py-2 px-4 bg-darker-blue text-white rounded hover:bg-darkest-blue border border-white"
            >
              Search
            </button>
          </div>
          {isLoading && (
            <div className="mt-4 flex justify-center items-center">
              <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                  className={`p-4 border border-white rounded cursor-pointer hover:bg-darker-blue ${index < searchResults.length - 1 ? 'border-b' : ''}`}
                  onClick={() => navigate(`/player/${encodeURIComponent(player.tag)}`)}
                >
                  <span className="font-semibold text-white">{player.name}</span>
                  <span className="text-gray-300 pl-2">{player.tag}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Clan Search Section */}
      <div className="w-full max-w-4xl bg-darker-blue p-6 rounded-lg shadow-md mt-4">
        <h1 className="text-3xl font-extrabold text-white mb-6 text-center">Clan Search</h1>
        <div className="flex items-center border border-white rounded">
          <input
            type="text"
            placeholder="CLAN NAME"
            className="w-full p-2 bg-darkest-blue text-white border-none"
          />
          <button
            className="py-2 px-4 bg-darker-blue text-white rounded hover:bg-darkest-blue border border-white"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
