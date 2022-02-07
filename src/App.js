import React, { Component } from 'react';
import './App.css';
import './nprogres.css';

//components
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';

class App extends Component {

  state = {
    events:[],
    locations:[],
    numberOfEvents: 25,
    currentLocation: 'all'
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ 
          events: events.slice(0, this.state.numberOfEvents),
          locations:extractLocations(events) 
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }


  updateNumberOfEvents = async (newNumberOfEvents) => {
    let { currentLocation } = this.state;

    await this.setState({numberOfEvents: newNumberOfEvents}, () => {
      console.log(this.state.numberOfEvents);
    });
    this.updateEvents(currentLocation);
  };


  updateEvents = (location) => {
    let { numberOfEvents } = this.state;
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      if(this.mounted) {
        const shownEvents = locationEvents.slice(0, numberOfEvents);
        this.setState({
            events: shownEvents,
            currentLocation: location
        });
      }
    });
  }



  render() {
    let { events, locations, numberOfEvents } = this.state;

    return (
      <div className="App">
        <CitySearch locations={locations} updateEvents={this.updateEvents}/>
        <EventList events={events}/>
        <NumberOfEvents numberOfEvents={numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents}/>
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

