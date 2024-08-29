import './App.css';
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
    this.headers = {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImE2MWMxMjI2LWMwNzUtNDk5YS1hZThjLTBiYWU0MjJiNTBiMyIsImlhdCI6MTcyNDg5MTcxOSwic3ViIjoiZGV2ZWxvcGVyLzM4NWYzMTFjLWM5YjEtYjFkZi1jMTI3LTVmZmVlMGRhNWQxMyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE4OC44OC44LjEzMCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.eOohmQfqg0oLoJRLMpi5SLauy63dWCiKazthW8JhkcQSTrK5BjAIEoBGUdm6RIaWrmNGdHuKo9KB1AHdg7MJFA'
    };
    fetch('https://api.clashofclans.com/v1/players/%23LVRQCP9G0', { headers: this.headers })
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
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <h1>Clash Stats</h1>
            <ul>
              <li>Name: {item.name}</li>
              <li>Tag: {item.tag}</li>
              <li>Town Hall Level: {item.townHallLevel}</li>
              {/* Add more fields as needed */}
            </ul>
          </header>
        </div>
      );
    }
  }
}

export default App;
