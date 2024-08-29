import './index.css';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    this.componentGetUser();
  }

  componentGetUser() {
    fetch('http://localhost:5000/player')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            item: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { isLoaded, item, error } = this.state;

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-red-100 text-red-700 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">Error</h2>
            <p>{error.message}</p>
          </div>
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-gray-600 text-lg">Loading...</div>
        </div>
      );
    } else {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <header className="text-center">
              <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Clash Stats</h1>
              <div className="flex justify-center mb-6">
                <img 
                  className="w-24 h-24 rounded-full border-4 border-gray-300" 
                  src={item.clan.badgeUrls.large} 
                  alt="Clan Badge" 
                />
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex justify-between">
                  <span className="font-semibold">Name:</span>
                  <span>{item.name}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Tag:</span>
                  <span>{item.tag}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Town Hall Level:</span>
                  <span>{item.townHallLevel}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Town Hall Weapon Level:</span>
                  <span>{item.townHallWeaponLevel}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Experience Level:</span>
                  <span>{item.expLevel}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Trophies:</span>
                  <span>{item.trophies}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Best Trophies:</span>
                  <span>{item.bestTrophies}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">War Stars:</span>
                  <span>{item.warStars}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Attack Wins:</span>
                  <span>{item.attackWins}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Defense Wins:</span>
                  <span>{item.defenseWins}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Builder Hall Level:</span>
                  <span>{item.builderHallLevel}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Builder Base Trophies:</span>
                  <span>{item.builderBaseTrophies}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Best Builder Base Trophies:</span>
                  <span>{item.bestBuilderBaseTrophies}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Role:</span>
                  <span>{item.role}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">War Preference:</span>
                  <span>{item.warPreference}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Donations:</span>
                  <span>{item.donations}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Donations Received:</span>
                  <span>{item.donationsReceived}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Clan Name:</span>
                  <span>{item.clan.name}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Clan Level:</span>
                  <span>{item.clan.clanLevel}</span>
                </li>
              </ul>
            </header>
          </div>
        </div>
      );
    }
  }
}

export default App;
