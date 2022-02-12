import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
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
    numberOfEvents: 25,
    offset: 0,
    currentPage:0,
    pageCount: ''
  }

  componentDidMount() {
    this.mounted = true;
    this.receivedData();
  }

  receivedData() {
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ 
          events: events.slice(this.state.offset, this.state.offset + this.state.numberOfEvents),
          locations:extractLocations(events),
          pageCount: Math.ceil(events.length / this.state.perPage),
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

    return (
      <div className="App">
        <CitySearch locations={locations} updateEvents={this.updateEvents}/>
        <EventList events={events}/>
        <NumberOfEvents numberOfEvents={numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents}/>
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
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

