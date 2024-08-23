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
  mobile: {
    label: "desktop",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig
export function StudentsChart() {
  return (
    <Card className=" mt-12 mb-6">
      <CardHeader>
        <CardTitle className="text-[18px]">Students</CardTitle>
        <CardDescription>
          Showing total students for the last 12 months
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                 
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="active"
              type="natural"
              fill="red"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
             
            />
            <Area
              dataKey="passive"
              type="natural"
              fill="green"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
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
