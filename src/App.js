import React, { Component } from 'react';
import './App.css';

//components
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CitySearch />
        <EventList />
        <NumberOfEvents />
      </div>
    );
  }
}

export default App;

/** 
import React from 'react';

//components
import EventList from './EventList';

//styling
import './App.css';

function App() {
  return (
    <div className="App">
      <EventList />
    </div>
  );
}

export default App;

*/

