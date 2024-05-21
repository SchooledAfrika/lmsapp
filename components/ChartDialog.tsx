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

const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Grade',
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      borderColor: '#FF6634',
      backgroundColor: '#ff0000',
    },
    {
      label: 'Number',
      data: labels.map(() => faker.number.int({ min: 0, max: 50 })),
      borderColor: '#359671',
      backgroundColor: '#00ff00',
    },
  ],
};

export default function ChartDialog() {
  return <Line options={options} data={data} />;
}



