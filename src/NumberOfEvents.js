import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  
  state = {
    infoText: '',
    newNumber: this.props.numberOfEvents
  }

  handleInputChange = async (e) => {
    const number = parseInt(e.target.value);
    if (number < 1 || number > 25 || isNaN(number)) {
      this.setState({
        infoText: 'Please choose a number between 1 and 25',
        newNumber: number

      })
    } else {
      await this.setState({
        infoText: '',
        newNumber: number
      })
      this.props.updateNumberOfEvents(this.state.newNumber);
    }
  } 



  render() {
    const { newNumber, infoText } = this.state;

    return (
      <div className='number-of-events-container'>
        <ErrorAlert text={infoText} />
        <div className='number-of-events'>
          <label className="number-of-events__label">Number of events:</label>
          <input
            type="number"
            className="number-of-events__input"
            value={newNumber}
            onChange={(e) => this.handleInputChange(e)}
          />
        </div>
      </div>
    );
  }
}

export default NumberOfEvents;