import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PlayerDetailPage() {
  const { tag } = useParams();
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

  if (!playerData) return <div className="text-gray-600 text-lg">No player data available.</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Player Details</h1>
          <div className="flex justify-center mb-6">
            <img
              className="w-24 h-24 rounded-full border-4 border-gray-300"
              src={playerData.clan.badgeUrls.large}
              alt={`${playerData.clan.name} Clan Badge`}
            />
          </div>
          <ul className="space-y-4 text-gray-700">
            {Object.entries({
              'Name': playerData.name,
              'Tag': playerData.tag,
              'Town Hall Level': playerData.townHallLevel,
              'Town Hall Weapon Level': playerData.townHallWeaponLevel,
              'Experience Level': playerData.expLevel,
              'Trophies': playerData.trophies,
              'Best Trophies': playerData.bestTrophies,
              'War Stars': playerData.warStars,
              'Attack Wins': playerData.attackWins,
              'Defense Wins': playerData.defenseWins,
              'Builder Hall Level': playerData.builderHallLevel,
              'Builder Base Trophies': playerData.builderBaseTrophies,
              'Best Builder Base Trophies': playerData.bestBuilderBaseTrophies,
              'Role': playerData.role,
              'War Preference': playerData.warPreference,
              'Donations': playerData.donations,
              'Donations Received': playerData.donationsReceived,
              'Clan Name': playerData.clan.name,
              'Clan Level': playerData.clan.clanLevel,
            }).map(([key, value]) => (
              <li key={key} className="flex justify-between">
                <span className="font-semibold">{key}:</span>
                <span>{value}</span>
              </li>
            ))}
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
