import React, { Component } from 'react';
import './App.css';
import './nprogress.css';

//components
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { WarningAlert } from './Alert';

class App extends Component {
  
  state = {
    events:[],
    locations:[],
    currentLocation: 'all',
    numberOfEvents: 12,
    offlineAlertText: ''
  }

  componentDidMount() {
    this.mounted = true;
    this.offlineAlert();
  
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

  componentDidUpdate () {
    this.offlineAlert();
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

  offlineAlert = () => {
    if (!navigator.onLine) {
      this.setState({
        offlineAlertText: 'You are not connected to the internet. <br> The events you see may not be up-to-date.'
      });
    } else {
      this.setState({
        offlineAlertText: ''
      });
    }
  }


  render() {


    let { events, locations, numberOfEvents, offlineAlertText } = this.state;

    if(events.length === 0) {
      return (
        <div className="App">
          <WarningAlert classNametext = {offlineAlertText} />
          <CitySearch locations={locations} updateEvents={this.updateEvents}/>
          <NumberOfEvents numberOfEvents={numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents}/>
          <div class="lds-dual-ring"></div>
       </div>
      );
    } else {
      return (
        <div className="App">
          <WarningAlert text = {offlineAlertText} />
          <CitySearch locations={locations} updateEvents={this.updateEvents}/>
          <NumberOfEvents numberOfEvents={numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents}/>
          <EventList events={events}/>
        </div>
      );
    }
    
  }
}

export default App;
