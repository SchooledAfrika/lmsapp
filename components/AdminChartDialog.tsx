import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    
  },
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',  'Nov', 'Dec'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Parents',
      data: labels.map(() => faker.number.int({ min: 0, max: 400 })),
      borderColor: '#FF6634',
      backgroundColor: '#ff0000',
    },
    {
      label: 'Teachers',
      data: labels.map(() => faker.number.int({ min: 0, max: 500 })),
      borderColor: '#F7080D',
      backgroundColor: '#DC3B23',
    },
    
    {
        label: 'Students',
        data: labels.map(() => faker.number.int({ min: 0, max: 500 })),
        borderColor: '#359671',
        backgroundColor: '#00ff00',
      },
  ],
};

export default function AdminChartDialog() {
  return (
  <div className='md:w-[90%] mx-auto w-full px-3'>
     <Line options={options} data={data}  />
  </div>
  )
 
}



