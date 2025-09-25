import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import * as Recharts from "recharts";

const data = [
  { date: "Jan", value: 12500, deposits: 500 },
  { date: "Feb", value: 13200, deposits: 500 },
  { date: "Mar", value: 13850, deposits: 500 },
  { date: "Apr", value: 14220, deposits: 500 },
  { date: "May", value: 15110, deposits: 500 },
  { date: "Jun", value: 15840, deposits: 500 },
];

export default function PortfolioChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Portfolio Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="h-[260px]"
          config={{
            value: { label: "Value", color: "hsl(var(--brand))" },
            deposits: {
              label: "Deposits",
              color: "hsl(var(--muted-foreground))",
            },
          }}
        >
          <Recharts.AreaChart data={data}>
            <Recharts.CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Recharts.XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <Recharts.YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Recharts.Area
              dataKey="value"
              type="monotone"
              stroke="hsl(var(--brand))"
              fill="hsl(var(--brand)/.25)"
            />
            <Recharts.Area
              dataKey="deposits"
              type="monotone"
              stroke="hsl(var(--muted-foreground))"
              fill="hsl(var(--muted-foreground)/.15)"
            />
          </Recharts.AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
