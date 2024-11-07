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
import { useSession } from "next-auth/react";
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

const options = {
  scales: {
    y: {
      beginAtZero: true,
      max: 50,
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const ChartsSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      className=" w-full"
      height={250}
      animation="wave"
    />
  );
};

export default function ChartDialog() {
  const { data: userInfo } = useSession();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["student-score-chart"],
    queryFn: async () => {
      const response = await fetch(
        `/api/charts/student-exam-score/${userInfo?.user.id}`
      );
      const result = await response.json();
      return result;
    },
  });

  if (isLoading) {
    return <ChartsSkeleton />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  const dataCount = {
    labels,
    datasets: [
      {
        label: "Average Score by Month",
        data,
        borderColor: "#FF6634",
        backgroundColor: "#ff0000",
      },
    ],
  };
  return <Line options={options} data={dataCount} />;
}
