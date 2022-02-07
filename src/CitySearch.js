// src/CitySearch.js

import React, { Component } from 'react';

class CitySearch extends Component {

  state = {
    query: '',
    suggestions: [],
    showSuggestions: false
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      showSuggestions: true
    });
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) === 0;
    });
    this.setState({ 
      query:value,
      suggestions,
    });
  };


  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false
    });

    this.props.updateEvents(suggestion);
  }


  render() {
    let { showSuggestions, suggestions, query } = this.state;
    return (
      <div className='CitySearch'>
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




// import React from 'react';



// function CitySearch(props) {
//   return (
//     <div className='CitySearch'> 
//       <input
//         type="text"
//         className="city"
//       />
//       <ul className="suggestions" >
//       </ul>
//     </div>
//   );
// }

// export default CitySearch;