import React from 'react';

function Tabs({ activeTab, setActiveTab, hasClan }) {
  return (
    <div className="flex space-x-4 mb-6 justify-center">
      <button
        className={`py-2 px-4 rounded-lg ${activeTab === 'overview' ? 'bg-dark-blue text-white' : 'bg-blue text-white'}`}
        onClick={() => setActiveTab('overview')}
      >
        Overview
      </button>
      {hasClan && (
        <button
          className={`py-2 px-4 rounded-lg ${activeTab === 'clan' ? 'bg-dark-blue text-white' : 'bg-blue text-white'}`}
          onClick={() => setActiveTab('clan')}
        >
          Clan Info
        </button>
      )}
      <button
        className={`py-2 px-4 rounded-lg ${activeTab === 'achievements' ? 'bg-dark-blue text-white' : 'bg-blue text-white'}`}
        onClick={() => setActiveTab('achievements')}
      >
        Achievements
      </button>
    </div>
  );
}

export default Tabs;
