import React from 'react';

function Overview({ playerData }) {
  return (
    <ul className="space-y-4 text-black">
      <li className="flex justify-between"><span className="font-semibold">Name:</span> <span>{playerData.name}</span></li>
      <li className="flex justify-between"><span className="font-semibold">Tag:</span> <span>{playerData.tag}</span></li>
      <li className="flex justify-between"><span className="font-semibold">Town Hall Level:</span> <span>{playerData.townHallLevel}</span></li>
      <li className="flex justify-between"><span className="font-semibold">Experience Level:</span> <span>{playerData.expLevel}</span></li>
      <li className="flex justify-between"><span className="font-semibold">Trophies:</span> <span>{playerData.trophies}</span></li>
      <li className="flex justify-between"><span className="font-semibold">War Stars:</span> <span>{playerData.warStars}</span></li>
    </ul>
  );
}

export default Overview;