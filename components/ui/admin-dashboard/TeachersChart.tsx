"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { LargeSkeleton } from "@/components/AdminChartDialog";

const chartConfig = {
  desktop: {
    label: "Active",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Passive",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
// api/charts/admin-teacher-chart
export function TeachersChart() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-students-charts"],
    queryFn: async () => {
      const response = await fetch("/api/charts/admin-student-chart");
      const result = await response.json();
      return result;
    },
  });
  if (isLoading) {
    return <LargeSkeleton />;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }
  return (
    <Card className="md:mt-12 mb-6">
      <CardHeader>
        <CardTitle className="text-[18px]">Teachers</CardTitle>
        {/* <CardDescription>January - December 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="active" fill="Green" radius={4} />
            <Bar dataKey="passive" fill="Red" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Bar chart of active and inactive teachers{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 12 months
        </div>
      </CardFooter>
    </Card>
  );
}
