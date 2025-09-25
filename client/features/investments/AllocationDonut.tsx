import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import * as Recharts from "recharts";

const allocation = [
  { name: "Stocks", value: 55, fill: "hsl(var(--brand))" },
  { name: "Bonds", value: 20, fill: "hsl(var(--accent-foreground)/.6)" },
  { name: "Cash", value: 10, fill: "hsl(var(--muted-foreground)/.5)" },
  { name: "ETFs", value: 10, fill: "hsl(var(--brand-gold))" },
  { name: "Crypto", value: 5, fill: "hsl(var(--destructive))" },
];

export default function AllocationDonut() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[240px]" config={{}}>
          <Recharts.PieChart>
            <Recharts.Pie
              data={allocation}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              strokeWidth={6}
            >
              {allocation.map((a, i) => (
                <Recharts.Cell key={i} fill={a.fill} />
              ))}
            </Recharts.Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </Recharts.PieChart>
        </ChartContainer>
        <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          {allocation.map((a, i) => (
            <li key={i} className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-sm"
                style={{ background: a.fill }}
              />
              {a.name} — {a.value}%
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
