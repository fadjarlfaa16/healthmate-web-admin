"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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

const chartData = [
  { month: "January", userInteractions: 12 },
  { month: "February", userInteractions: 25 },
  { month: "March", userInteractions: 18 },
  { month: "April", userInteractions: 30 },
  { month: "May", userInteractions: 22 },
  { month: "June", userInteractions: 16 },
];

const chartConfig = {
  userInteractions: {
    label: "User Interactions:   ",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function LineCharts() {
  return (
    <Card className="mt-10">
      {/* <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader> */}
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
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
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="userInteractions"
              type="natural"
              stroke="var(--color-userInteractions)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing user interactions for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}

export default LineCharts;
