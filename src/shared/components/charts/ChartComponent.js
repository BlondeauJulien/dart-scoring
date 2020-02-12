import React, { useState } from 'react';
import {
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Label,
  Pie,
  PieChart,
  Cell
} from 'recharts';

const ChartComponent = props => {
  const [data] = useState(props.data);


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
    const RADIAN = Math.PI / 180;                    
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x  = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy  + radius * Math.sin(-midAngle * RADIAN);
      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}% ` + data[index].name}
        </text>
      );
    };


    return (
      <PieChart width={400} height={400}>
        <Pie dataKey="value"  data={data} cx={200} cy={200} labelLine={false} outerRadius={140} label={renderCustomizedLabel}>
          {
          	data.map((entry) => <Cell fill={entry.color}/>)
          }
        </Pie> 
        <Tooltip />
      </PieChart>
    );
  }

}

export default ChartComponent
