import React, { Component } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


class EventsPerCityPlot extends Component { 

  getData = () => {
    const {locations, events} = this.props;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      let city;
        if (location.includes('NSW')){
          city = location.split('NSW').shift();
        } else if (location.includes(', ')) {
          city = location.split(', ').shift();
        } else if (location.includes('- ')) {
            city = location.split('- ').shift();
        } 
      return {city, number};
    })
    return data;
  };

  render() {

    return (
      <div className='data-vis-wrapper__plot'>
        <h4>Events in each city</h4>
        <ResponsiveContainer height={250}>
          <ScatterChart
            margin={{ 
              top: 20, right: 20, bottom: 20, left: 0 
            }}
          >
            <CartesianGrid />
            <XAxis 
              type="category" 
              dataKey="city" 
              name="City" 
              minTickGap = "2"
              tickMargin = "10"
            />
            <YAxis 
              type="number" 
              dataKey="number" 
              name="Number Of Events" 
              allowDecimals={false}
            />
            <Tooltip labelFormatter={() => ""} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default EventsPerCityPlot;