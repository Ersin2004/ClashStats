import React from 'react';

function PlayerProfile({ player }) {
  return (
    <div className="bg-darker-blue p-6 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-white mb-4">{player.name}</h1>
      <p className="text-lg text-gray">
        Tag: <span className="font-semibold text-white">{player.tag}</span>
      </p>
      <p className="text-lg text-gray">
        Clan: <span className="font-semibold text-white">{player.clan ? player.clan.name : 'No Clan'}</span>
      </p>
    </div>
  );
}

export default PlayerProfile;