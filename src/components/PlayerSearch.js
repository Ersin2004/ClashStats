import React from 'react';

const PlayerSearch = ({ displayQuery, onChange, onClick, searchResults, isLoading, error, onResultClick }) => {
  return (
    <div className="bg-darkest-blue p-6 rounded-lg shadow-md flex-1">
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
          onChange={onChange}
          placeholder="LVRQCP9G0"
          className="w-full p-2 bg-darkest-blue text-white border-none"
        />
        <button
          onClick={onClick}
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
        <div className="mt-4 bg-red text-red p-4 rounded text-white">
          <strong>Error:</strong> {error}
        </div>
      )}
      {!isLoading && searchResults.length > 0 && (
        <ul className="mt-4 space-y-2">
          {searchResults.map((player, index) => (
            <li
              key={player.tag}
              className={`p-4 border border-white rounded cursor-pointer hover:bg-darker-blue ${index < searchResults.length - 1 ? 'border-b' : ''}`}
              onClick={() => onResultClick(player.tag)}
            >
              <span className="font-semibold text-white">{player.name} </span>
              <span className="text-white">{player.tag}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlayerSearch;