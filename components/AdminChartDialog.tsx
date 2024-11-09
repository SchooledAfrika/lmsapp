import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IAdminChart {
  teachers: (number | null)[];
  students: (number | null)[];
  parents: (number | null)[];
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};
const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const LargeSkeleton = () => {
  return (
    <Skeleton
      className=" w-full rounded-lg"
      height={350}
      variant="rectangular"
      animation="wave"
    />
  );
};

export default function AdminChartDialog() {
  // here, we will make call to fetch chart informations
  const {
    data: chartData,
    isLoading,
    error,
    isError,
  } = useQuery<IAdminChart>({
    queryKey: ["line-chart-admin-all"],
    queryFn: async () => {
      const response = await fetch("/api/charts/all-users-chart");
      const result = response.json();
      return result;
    },
  });

  if (isLoading) {
    return <LargeSkeleton />;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }
  const data = {
    labels,
    datasets: [
      {
        label: "Parents",
        data: chartData?.parents,
        borderColor: "#ff0000",
        backgroundColor: "#E1341E",
      },
      {
        label: "Teachers",
        data: chartData?.teachers,
        borderColor: "#FF6634",
        backgroundColor: "#D53500",
      },

      {
        label: "Students",
        data: chartData?.students,
        borderColor: "#359671",
        backgroundColor: "#00ff00",
      },
    ],
  };

  return (
    <div className="md:w-[90%] mx-auto w-full px-3">
      <Line options={options} data={data} />
    </div>
  );
}
