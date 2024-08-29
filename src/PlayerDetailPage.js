import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PlayerDetailPage() {
  const { tag } = useParams();
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5000/player/${encodeURIComponent(tag)}`);
        if (!response.ok) throw new Error('Failed to fetch player data');
        const data = await response.json();
        setPlayerData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayerData();
  }, [tag]);

  if (isLoading) return <div className="text-gray-600 text-lg">Loading...</div>;

  if (error) return (
    <div className="bg-red-100 text-red-700 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">Error</h2>
      <p>{error}</p>
    </div>
  );

  if (!playerData) return <div>No player data available.</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Clash Stats</h1>
          <div className="flex justify-center mb-6">
            <img
              className="w-24 h-24 rounded-full border-4 border-gray-300"
              src={playerData.clan.badgeUrls.large}
              alt="Clan Badge"
            />
          </div>
          <ul className="space-y-4 text-gray-700">
            <li className="flex justify-between">
              <span className="font-semibold">Name:</span>
              <span>{playerData.name}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Tag:</span>
              <span>{playerData.tag}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Town Hall Level:</span>
              <span>{playerData.townHallLevel}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Town Hall Weapon Level:</span>
              <span>{playerData.townHallWeaponLevel}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Experience Level:</span>
              <span>{playerData.expLevel}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Trophies:</span>
              <span>{playerData.trophies}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Best Trophies:</span>
              <span>{playerData.bestTrophies}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">War Stars:</span>
              <span>{playerData.warStars}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Attack Wins:</span>
              <span>{playerData.attackWins}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Defense Wins:</span>
              <span>{playerData.defenseWins}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Builder Hall Level:</span>
              <span>{playerData.builderHallLevel}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Builder Base Trophies:</span>
              <span>{playerData.builderBaseTrophies}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Best Builder Base Trophies:</span>
              <span>{playerData.bestBuilderBaseTrophies}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Role:</span>
              <span>{playerData.role}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">War Preference:</span>
              <span>{playerData.warPreference}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Donations:</span>
              <span>{playerData.donations}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Donations Received:</span>
              <span>{playerData.donationsReceived}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Clan Name:</span>
              <span>{playerData.clan.name}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Clan Level:</span>
              <span>{playerData.clan.clanLevel}</span>
            </li>
          </ul>
        </header>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerDetailPage;
