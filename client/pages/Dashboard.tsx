import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import * as Recharts from "recharts";

const series = [
  { month: "Jan", spending: 520, income: 2200 },
  { month: "Feb", spending: 680, income: 2100 },
  { month: "Mar", spending: 740, income: 2300 },
  { month: "Apr", spending: 610, income: 2350 },
  { month: "May", spending: 820, income: 2450 },
  { month: "Jun", spending: 770, income: 2400 },
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Overview</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-3">
              <Stat label="Total Balance" value="$14,230.18" trend="▲ 4.6%" />
              <Stat label="Monthly Spend" value="$820.00" trend="—" />
              <Stat label="Savings Goals" value="3 Active" trend="+1" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Spending vs Income</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                className="h-[260px]"
                config={{ spending: { label: "Spending", color: "hsl(var(--destructive))" }, income: { label: "Income", color: "hsl(var(--brand))" } }}
              >
                <Recharts.AreaChart data={series}>
                  <Recharts.CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <Recharts.XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <Recharts.YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Recharts.Area dataKey="spending" type="monotone" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive)/.25)" />
                  <Recharts.Area dataKey="income" type="monotone" stroke="hsl(var(--brand))" fill="hsl(var(--brand)/.25)" />
                </Recharts.AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {[
                  { name: "Spotify Subscription", amount: -9.99, time: "Today" },
                  { name: "Electric Bill", amount: -120.5, time: "Yesterday" },
                  { name: "Salary", amount: 2400, time: "Jul 01" },
                  { name: "Coffee Shop", amount: -4.75, time: "Jun 29" },
                ].map((t, i) => (
                  <li key={i} className="flex items-center justify-between py-3 text-sm">
                    <div>
                      <p className="font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.time}</p>
                    </div>
                    <span className={t.amount < 0 ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"}>
                      {t.amount < 0 ? "-" : "+"}${Math.abs(t.amount).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Transfer</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Input placeholder="Recipient (name or account)" />
              <Input placeholder="Amount" type="number" />
              <Input placeholder="Note (optional)" />
              <Button className="bg-brand hover:bg-brand/90">Send</Button>
              <p className="text-xs text-muted-foreground">Internal and external transfers supported. P2P available.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-xl bg-gradient-to-br from-brand to-brand-gold p-4 text-white">
                <div className="text-xs opacity-90">Virtual Debit</div>
                <div className="mt-2 text-lg font-semibold tracking-widest">**** 8421</div>
                <div className="mt-6 text-xs opacity-90">Active · Limits enabled</div>
              </div>
              <Button variant="outline" className="w-full">Manage Cards</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Password last updated 32 days ago</p>
              <p>• 2FA enabled · Email + Authenticator</p>
              <p>• 1 trusted device · 1 active session</p>
              <Button variant="outline" className="mt-2 w-full">Review Settings</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

function Stat({ label, value, trend }: { label: string; value: string; trend?: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      {trend ? <p className="mt-1 text-xs text-brand">{trend}</p> : null}
    </div>
  );
}
