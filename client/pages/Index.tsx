import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Link } from "react-router-dom";
import { Activity, Banknote, CreditCard, Lock, PiggyBank, ShieldCheck, Smartphone, TrendingUp, Users } from "lucide-react";
import Layout from "@/components/Layout";
import * as Recharts from "recharts";

const spendingData = [
  { month: "Jan", spend: 820 },
  { month: "Feb", spend: 640 },
  { month: "Mar", spend: 950 },
  { month: "Apr", spend: 720 },
  { month: "May", spend: 880 },
  { month: "Jun", spend: 1030 },
];

export default function Index() {
  return (
    <Layout>
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-brand/10 via-background to-brand-gold/10 p-8 md:p-12">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-brand" /> Bank-grade security
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Modern online banking for everyday life
            </h1>
            <p className="mt-4 text-muted-foreground">
              Manage accounts, transfer money, pay bills, and grow your wealth with a personalized, secure experience.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/dashboard"><Button className="bg-brand hover:bg-brand/90">Open Dashboard</Button></Link>
              <Button variant="outline">Compare accounts</Button>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-muted-foreground sm:max-w-md">
              <li className="flex items-center gap-2"><Lock className="h-4 w-4 text-brand" /> Secure login & alerts</li>
              <li className="flex items-center gap-2"><Users className="h-4 w-4 text-brand" /> P2P payments</li>
              <li className="flex items-center gap-2"><Smartphone className="h-4 w-4 text-brand" /> Device management</li>
              <li className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-brand" /> Virtual cards</li>
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-brand/20 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-brand-gold/30 blur-3xl" />
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="backdrop-blur supports-[backdrop-filter]:bg-background/70">
                <CardHeader>
                  <CardTitle className="text-base">Total Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$14,230.18</div>
                  <p className="mt-1 text-sm text-brand">+4.6% this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Spending</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    className="h-[120px]"
                    config={{ spend: { label: "Spend", color: "hsl(var(--brand))" } }}
                  >
                    <Recharts.AreaChart data={spendingData}>
                      <Recharts.CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <Recharts.XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                      <Recharts.YAxis hide />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                      <Recharts.Area dataKey="spend" type="monotone" stroke="hsl(var(--brand))" fill="hsl(var(--brand)/.2)" />
                    </Recharts.AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="divide-y">
                    {[
                      { name: "Groceries", amount: -86.23 },
                      { name: "Salary", amount: 2400.0 },
                      { name: "Utilities", amount: -120.5 },
                    ].map((t, i) => (
                      <li key={i} className="flex items-center justify-between py-2 text-sm">
                        <span className="text-muted-foreground">{t.name}</span>
                        <span className={t.amount < 0 ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"}>
                          {t.amount < 0 ? "-" : "+"}${Math.abs(t.amount).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">Everything you need in one place</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
          Core account management, payments and transfers, security controls, support, cards, budgeting, savings goals, loans, and investing.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Feature icon={Activity} title="Account Dashboard" desc="Balances, transactions, e‑statements, and account details at a glance." />
          <Feature icon={Banknote} title="Payments & Transfers" desc="Internal/external transfers, bill pay, and P2P payments." />
          <Feature icon={ShieldCheck} title="Security" desc="Secure login, password management, alerts, and device control." />
          <Feature icon={CreditCard} title="Cards" desc="Virtual debit/credit cards with real‑time controls." />
          <Feature icon={PiggyBank} title="Personal Finance" desc="Spending analytics, budgeting tools, and savings goals." />
          <Feature icon={TrendingUp} title="Loans & Investing" desc="Loan applications, portfolio overview, and online trading." />
        </div>
        <div className="mt-8 flex justify-center">
          <Link to="/dashboard"><Button size="lg" className="bg-brand hover:bg-brand/90">Get started</Button></Link>
        </div>
      </section>
    </Layout>
  );
}

function Feature({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-3">
        <div className="rounded-md bg-brand/10 p-2 text-brand"><Icon className="h-5 w-5" /></div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  );
}
