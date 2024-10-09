import React from 'react';

function LegendStatistics({ playerData }) {
  return (
    <ul className="space-y-4 text-black">
      <li className="flex justify-between"><span className="font-semibold">Legend Trophies:</span> <span>{playerData.legendStatistics.legendTrophies}</span></li>
      <li className="flex justify-between"><span className="font-semibold">Best Builder Base Season Rank:</span> <span>{playerData.legendStatistics.bestBuilderBaseSeason.rank}</span></li>
      <li className="flex justify-between"><span className="font-semibold">Best Builder Base Season Trophies:</span> <span>{playerData.legendStatistics.bestBuilderBaseSeason.trophies}</span></li>
    </ul>
  );
}

export default LegendStatistics;