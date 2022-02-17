import React, { Component } from 'react';
import './App.css';
import './nprogress.css';

//components
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';

class App extends Component {
  
  state = {
    events:[],
    locations:[],
    currentLocation: 'all',
    numberOfEvents: 12
  }

  componentDidMount() {
    this.mounted = true;
  
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ 
          events: events.slice(0, this.state.numberOfEvents),
          locations:extractLocations(events),
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }


  updateNumberOfEvents = async (newNumberOfEvents) => {
    let { currentLocation } = this.state;

    await this.setState({
      numberOfEvents: newNumberOfEvents
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

  handlePageClick = event => {
    const selectedPage = event.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.receivedData()
    })
  }



  render() {


    let { events, locations, numberOfEvents } = this.state;

    if(events.length === 0) {
      return (
        <div className="App">
          <CitySearch locations={locations} updateEvents={this.updateEvents}/>
          <div class="lds-dual-ring"></div>
          <NumberOfEvents numberOfEvents={numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents}/>
       </div>
      );
    } else {
      return (
        <div className="App">
          <CitySearch locations={locations} updateEvents={this.updateEvents}/>
          <EventList events={events}/>
          <NumberOfEvents numberOfEvents={numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents}/>
        </div>
      );
    }
    
  }
}

export default App;
