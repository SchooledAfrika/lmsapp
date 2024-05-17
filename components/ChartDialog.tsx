import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Week 01",
    Grade: 100,
    number: 20
    
  },
  {
    name: "Week 02",
    Grade: 80,
    number: 20
  },
  {
    name: "Week 03",
    Grade: 60,
    number: 18
  },
  {
    name: "Week 04",
    Grade: 40,
    number: 40
  },
  {
    name: "Week 05",
    Grade: 20,
    number: 35
   
   
  },
  
 
];

export default function ChartDialog() {
  return (
   <div className="mt-6 overflow-auto">
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis dataKey="" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Grade"
        stroke="#359C71"
        strokeDasharray="3 4"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="number" stroke="#FF6634" strokeDasharray="5 5" />
    </LineChart>

   </div>
    
    
  );
}