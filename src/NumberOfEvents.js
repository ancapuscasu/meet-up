import React, { Component } from 'react';

class NumberOfEvents extends Component {



  handleInputChange = (e) => {
    const newNumber = parseInt(e.target.value);
    this.props.updateNumberOfEvents(newNumber);
  } 


  render() {
    const { numberOfEvents } = this.props;

    return (
      <div className='number-of-events'>
        <label className="number-of-events__label">Number of events:</label>
        <input
          type="number"
          className="number-of-events__input"
          value={numberOfEvents}
          onChange={(e) => this.handleInputChange(e)}
        />
      </div>
    );
  }
}

export default NumberOfEvents;