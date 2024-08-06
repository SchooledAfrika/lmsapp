"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

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
  active: {
    label: "Active",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function SchoolsChart() {
  return (
    <Card className=" mb-6">
      <CardHeader>
        <CardTitle className="text-[18px]">Schools</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="active" hide />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="active" fill="green" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total schools for the last 12 months
        </div>
      </CardFooter>
    </Card>
  )
}
