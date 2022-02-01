import React, { Component } from 'react';

class NumberOfEvents extends Component {

  state = {
    numberOfEvents: 32
  }; 

  handleInputChange = (event) => {
    let value = event.target.value;
    
    this.setState({ 
      numberOfEvents: value
    });
  };
    
    
  render() {
    const { numberOfEvents } = this.state;

    return (
      <div className='number-of-events'>
        <input
          type="number"
          className="number-of-events__input"
          value={numberOfEvents}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default NumberOfEvents;