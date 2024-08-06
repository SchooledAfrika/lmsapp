"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { month: "Jan", active: 186, passive: 80 },
    { month: "Feb", active: 305, passive: 200 },
    { month: "Mar", active: 237, passive: 120 },
    { month: "Apr", active: 73, passive: 190 },
    { month: "May", active: 209, passive: 130 },
    { month: "Jun", active: 214, passive: 140 },
    { month: "Jul", active: 186, passive: 80 },
    { month: "Aug", active: 305, passive: 200 },
    { month: "Sep", active: 237, passive: 120 },
    { month: "Oct", active: 73, passive: 190 },
    { month: "Nov", active: 209, passive: 130 },
    { month: "Dec", active: 214, passive: 140 },
]

const chartConfig = {
  desktop: {
    label: "Active",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Passive",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function TeachersChart() {
  return (
    <Card className="mt-12 mb-6">
      <CardHeader>
        <CardTitle className="text-[18px]">Teachers</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
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
            <Bar dataKey="active" fill="green" radius={4} />
            <Bar dataKey="passive" fill="red" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 12 months
        </div>
      </CardFooter>
    </Card>
  )
}
