import React, { useEffect, useState } from 'react';
import {
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Label,
  Pie,
  PieChart
} from 'recharts';

const ChartComponent = props => {
  const [data, setData] = useState(undefined)
  useEffect(() => {
    setData(props.data);
    // eslint-disable-next-line
  }, []);

  if(props.chartType === 'lineChart') {
    return (
      <LineChart
        width={750}
        height={450}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"><Label value="matches" offset={-5} position="insideBottom" /></XAxis> 
        <YAxis/>
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    );
  }

  if(props.chartType === 'pieChart') {
    return (
      <PieChart width={400} height={400}>
        <Pie dataKey="value" isAnimationActive={false} data={data} cx={200} cy={200} outerRadius={140} fill="#8884d8" label />
        <Tooltip />
      </PieChart>
    );
  }

}

export default ChartComponent
