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
import EventGenre from './EventGenre';
import EventsPerCityPlot from './EventsPerCityPlot';

class App extends Component {
  
  state = {
    events:[],
    eventsOnPage:[],
    locations:[],
    currentLocation: 'all',
    numberOfEvents: 12,
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;

    if ((localStorage.getItem('access_token') !== null) && (!navigator.onLine)) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ 
            events: events,
            eventsOnPage: events.slice(0, this.state.numberOfEvents),
            locations:extractLocations(events), 
            showWelcomeScreen: false
          });
        }
      });
    } else {
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
              events: events,
              eventsOnPage: events.slice(0, this.state.numberOfEvents),
              locations:extractLocations(events), 
            });
          }
        }); 
      // }
    }
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
            eventsOnPage: shownEvents,
            currentLocation: location
        });
      }
    });
  }


  render() {
    let { eventsOnPage, events, locations, numberOfEvents, showWelcomeScreen } = this.state;

    // if (showWelcomeScreen === undefined) return <div className='App' />
    // if (showWelcomeScreen === true) return ( 
    //   <WelcomeScreen 
    //     showWelcomeScreen={showWelcomeScreen} 
    //     getAccessToken={() => { getAccessToken() }}
    // />
    // )

      return (
        <div className="App">
          { !navigator.onLine ? <WarningAlert className="alert__offline-visible" text='You are not connected to the internet. The events you see may not be up-to-date.'/> : <WarningAlert className="alert__offline-hidden" text=''/>}
          
          <h1 className='meet-up-brand title'>Meet Up</h1>

          <CitySearch 
            locations={locations} 
            updateEvents={this.updateEvents}
          />
          <NumberOfEvents 
            numberOfEvents={numberOfEvents} 
            updateNumberOfEvents={this.updateNumberOfEvents}
          />
      
          <div className='data-vis-wrapper'>
            <EventGenre events={events} />
            <EventsPerCityPlot locations={locations} events={events}/>
          </div>

          {/* //EventList// */}
          {events.length === 0 ? <div class="lds-dual-ring"></div> : <EventList events={eventsOnPage}/> }

       </div>
      );
  } 
}

export default App;