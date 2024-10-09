import React from 'react';

function ClanInfo({ playerData }) {
  return (
    <ul className="space-y-4 text-black">
      <li className="flex justify-between"><span className="font-semibold">Clan Name:</span> <span>{playerData.clan.name}</span></li>
      <li className="flex justify-between"><span className="font-semibold">Clan Level:</span> <span>{playerData.clan.clanLevel}</span></li>
      <li className="flex justify-between"><span className="font-semibold">Clan Capital Contributions:</span> <span>{playerData.clanCapitalContributions}</span></li>
    </ul>
  );
}

export default ClanInfo;