import React from 'react';

function ClanSearch() {
  return (
    <div className="w-full max-w-4xl bg-darkest-blue p-6 rounded-lg shadow-md mt-4">
      <h1 className="text-3xl font-extrabold text-white mb-6 text-center">Clan Search</h1>
      <div className="flex items-center border border-white rounded">
        <input
          type="text"
          placeholder="CLAN NAME"
          className="w-full p-2 bg-darkest-blue text-white border-none"
        />
        <button className="py-2 px-4 bg-darker-blue text-white rounded hover:bg-darkest-blue border border-white">
          Search
        </button>
      </div>
    </div>
  );
}

export default ClanSearch;