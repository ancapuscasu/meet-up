import React, { Component } from 'react';
import './App.css';
import './nprogress.css';

//components
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { checkToken, extractLocations, getAccessToken, getEvents } from './api';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
  
  state = {
    events:[],
    locations:[],
    currentLocation: 'all',
    numberOfEvents: 12,
    offlineAlertText: '',
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;

    // const accessToken = localStorage.getItem('access_token');
    // const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    // const searchParams = new URLSearchParams(window.location.search);
    // const code = searchParams.get("code");
    // this.setState({ 
    //   showWelcomeScreen: !(code || isTokenValid) 
    // });
    // if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ 
            events: events.slice(0, this.state.numberOfEvents),
            locations:extractLocations(events), 
          });
        }
      }); 
    }
  // }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate() {
    this.offlineAlert = () => {};
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

  offlineAlert() {
    if (!navigator.onLine) {
      this.setState({
        offlineAlertText: 'You are not connected to the internet. The events you see may not be up-to-date.'
      });
    } else {
      this.setState({
        offlineAlertText: ''
      });
    }
  }


  render() {
    let { events, locations, numberOfEvents, offlineAlertText, showWelcomeScreen } = this.state;

    if (showWelcomeScreen === undefined) return <div className='App' />

    if(events.length === 0) {
      return (
        <div className="App">
          <WarningAlert text = {offlineAlertText} />
          <CitySearch locations={locations} updateEvents={this.updateEvents}/>
          <NumberOfEvents numberOfEvents={numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents}/>
          <div class="lds-dual-ring"></div>
          <WelcomeScreen showWelcomeScreen={showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
       </div>
      );
    } else {
      return (
        <div className="App">
          <WarningAlert text = {offlineAlertText} />
          <CitySearch locations={locations} updateEvents={this.updateEvents}/>
          <NumberOfEvents numberOfEvents={numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents}/>
          <EventList events={events}/>
          <WelcomeScreen showWelcomeScreen={showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
        </div>
      );
    }
    
  }
}

export default App;
