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
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log('Fetched item:', item);
      return (
        <div className="App">
          <header className="App-header">
            <h1>Clash Stats</h1>
            <p>Name: {item.name}</p>
          </header>
        </div>
      );
    }
  }
}
  
export default App;
