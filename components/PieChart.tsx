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

const  PieCharts = () => {
  return (
   <div className='w-[40%] flex flex-1 mt-6 ml-3'>
     <Pie data={data} />
     
   </div>
  ) 
}


export default PieCharts;


