import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Tabs from '../components/Tabs';
import Overview from '../components/Overview';
import ClanInfo from '../components/ClanInfo';
import LegendStatistics from '../components/LegendStatistics';
import Achievements from '../components/Achievements';

function PlayerDetailPage() {
  const { tag } = useParams();
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

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

  if (isLoading) return <div className="text-black text-lg">Loading...</div>;

  if (error) return (
    <div className="bg-red text-dark-red p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">Error</h2>
      <p>{error}</p>
    </div>
  );

  if (!playerData) return <div className="text-black text-lg">No player data available.</div>;

  return (
    <div className="min-h-screen bg-gray flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-black">Player Details</h1>
          <div className="flex justify-center mt-4">
            <img
              className="w-24 h-24 rounded-full border-4 border-white"
              src={playerData.clan.badgeUrls.large}
              alt={`${playerData.clan.name} Clan Badge`}
            />
          </div>
        </header>

        {/* Tabs */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && <Overview playerData={playerData} />}
          {activeTab === 'clan' && <ClanInfo playerData={playerData} />}
          {activeTab === 'legend' && <LegendStatistics playerData={playerData} />}
          {activeTab === 'achievements' && <Achievements playerData={playerData} />}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue py-2 px-4 rounded-lg shadow hover:bg-dark-blue text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerDetailPage;