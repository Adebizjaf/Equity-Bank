import Layout from "@/components/Layout";
import PortfolioChart from "@/features/investments/PortfolioChart";
import AllocationDonut from "@/features/investments/AllocationDonut";
import QuickTradeForm from "@/features/investments/QuickTradeForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const positions = [
  { sym: "AAPL", name: "Apple Inc.", qty: 12, price: 212.4, pl: 124.5 },
  { sym: "MSFT", name: "Microsoft", qty: 8, price: 420.2, pl: 86.2 },
  { sym: "SPY", name: "S&P 500 ETF", qty: 5, price: 545.7, pl: -34.9 },
  { sym: "TSLA", name: "Tesla", qty: 2, price: 248.1, pl: 12.1 },
];

export default function Investments() {
  return (
    <Layout>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Investments
            </h1>
            <p className="mt-2 text-muted-foreground">
              Portfolio overview, allocation, and quick trading.
            </p>
          </div>
          <PortfolioChart />

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Positions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead className="text-right">P/L</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {positions.map((p) => {
                    const value = p.qty * p.price;
                    return (
                      <TableRow key={p.sym}>
                        <TableCell className="font-medium">{p.sym}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {p.name}
                        </TableCell>
                        <TableCell className="text-right">{p.qty}</TableCell>
                        <TableCell className="text-right">
                          ${p.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          ${value.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={
                              p.pl >= 0
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-destructive"
                            }
                          >
                            {p.pl >= 0 ? "+" : "-"}${Math.abs(p.pl).toFixed(2)}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <AllocationDonut />
          <QuickTradeForm />

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Watchlist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">AAPL</span>
                <span>$212.40</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">MSFT</span>
                <span>$420.20</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">SPY</span>
                <span>$545.70</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
