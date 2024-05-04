 'use client'

 import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
 
  datasets: [
    {
      label: '% of Students',
      data: [48, 29, 23],
      backgroundColor: [
        '#359C71',
        '#FDA21A',
        '#FF6634',
        
      ],
      borderColor: [
        '#359C71',
        '#FDA21A',
        '#FF6634',
        
      ],
      borderWidth: 1,
    },
  ],
};

export default function PieCharts() {
  return (
   <div className='w-[45%] mt-6 ml-4'>
     <Pie data={data} />
     
   </div>
  ) 
}


// import React, {useEffect,  useState } from "react";
// import { PieChart, Pie, Cell } from "recharts";

// const data = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 }
// ];

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
//   index
// }: any) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };
// const PieCharts = () => {
//     const [isClient, setIsClient] = useState(false)

//     useEffect(() => {
//         setIsClient(true)
//       }, [])
//   return (
//     <div className=" pr-2">
//         {isClient &&
//         <PieChart width={300} height={400}>
//       <Pie
//         data={data}
//         cx={200}
//         cy={200}
//         labelLine={false}
//         label={renderCustomizedLabel}
//         outerRadius={80}
//         fill="#8884d8"
//         dataKey="value"
//       >
//         {data.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//         ))}
//       </Pie>
//     </PieChart>}

//     </div>
    
//   );
// }
//  export default PieCharts
