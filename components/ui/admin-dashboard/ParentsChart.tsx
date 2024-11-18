"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";

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
import { LargeSkeleton } from "@/components/AdminChartDialog";

const chartConfig = {
  desktop: {
    label: "Active",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ParentsChart() {
  // fetching the neccessary information here
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-students-charts"],
    queryFn: async () => {
      const response = await fetch("/api/charts/admin-parents-charts");
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
    <Card className=" mb-6">
      <CardHeader>
        <CardTitle className="text-[18px]">Parents</CardTitle>
        <CardDescription>
          Showing total parents for the last 12 months
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="active"
              type="linear"
              fill="red"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Progressive chart of parents
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - December 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
