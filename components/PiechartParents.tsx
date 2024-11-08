"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { ChartsSkeleton } from "./ChartDialog";
import { useWardId } from "@/data-access/conversion";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right" as const, // Move legend to the right
      align: "center" as const, // Center-align the legend vertically
    },
  },
};

const PiechartParents = () => {
  const { wardId } = useWardId();
  const {
    data: infoData,
    isLoading,
    isError,
    error,
  } = useQuery<number[]>({
    queryKey: ["teacher-piechart-parents", wardId],
    queryFn: async () => {
      const response = await fetch(
        `/api/charts/parents-piechart?wardId=${wardId}`
      );
      const result = response.json();
      return result;
    },
  });
  if (isLoading) {
    return <ChartsSkeleton />;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  const data = {
    labels: ["Total-Classes", "Total-Exams", "Total-Resources"],
    datasets: [
      {
        label: "Distributions",
        data: infoData,
        backgroundColor: ["#359C71", "#FDA21A", "#FF6634"],
        borderColor: ["#359C71", "#FDA21A", "#FF6634"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Pie options={options} data={data} />
    </div>
  );
};

export default PiechartParents;
