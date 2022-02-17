// src/CitySearch.js

import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {

  state = {
    query: '',
    suggestions: [],
    showSuggestions: false,
    infoText: ''
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      showSuggestions: true
    });
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) === 0;
    });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText: 'We could not find the city you are looking for. Please try another city.',
        suggestions: []
      })
    } else {
      return this.setState({ 
        query: value,
        suggestions,
        infoText: ''
      });
    }
  };


  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false,
      infoText: ''
    });

    this.props.updateEvents(suggestion);
  }


  render() {
    let { showSuggestions, suggestions, query, infoText } = this.state;
    return (
      <div className='CitySearch'>
        <InfoAlert text={infoText} />
        <input
          type="text"
          className="city"
          placeholder='Search for events in your city...'
          value={query}
          onChange={this.handleInputChange}
        />
        <ul className={`suggestions ${showSuggestions ? 'showSuggestions' : 'display-none'}`} >
          {suggestions.map((suggestion) => (
            <li key={suggestion} onClick={() => this.handleItemClicked(suggestion)}>
              {suggestion}
            </li>
          ))}
          <li id='all' onClick={() => this.handleItemClicked('all')}>
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;
