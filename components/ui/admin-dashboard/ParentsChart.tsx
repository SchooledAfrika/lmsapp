"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
} satisfies ChartConfig

export function ParentsChart() {
  return (
    <Card className=" mb-6">
      <CardHeader>
        <CardTitle className="text-[18px]">Parents</CardTitle>
        <CardDescription>
          Showing total parents for the last 12 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
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
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - December 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
