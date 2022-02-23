import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';


const EventGenre = ({ events }) => {

  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = () => {
      const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
      const data = genres.map((genre) => {
        const value = events.filter(({ summary }) => summary.split(' ').includes(genre)).length;
        return { name: genre, value }
      });
      return data;
    };
    setData(() => getData());
  },[events]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#DC143C"];

  return (
    <div className='data-vis-wrapper__chart'>
      <h4>Events by topic</h4>
      <ResponsiveContainer width='100%' height={250}>
        <PieChart >
          <Pie
            data={data}
            labelLine={false}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} />
          ))}
          </Pie>
          <Legend verticalAlign="bottom" align="center"/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

};




export default EventGenre;