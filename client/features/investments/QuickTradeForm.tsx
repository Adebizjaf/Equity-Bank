import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

const symbols = [
  { sym: "AAPL", name: "Apple Inc." },
  { sym: "MSFT", name: "Microsoft" },
  { sym: "GOOGL", name: "Alphabet" },
  { sym: "TSLA", name: "Tesla" },
  { sym: "SPY", name: "S&P 500 ETF" },
];

export default function QuickTradeForm() {
  const [symbol, setSymbol] = useState<string | undefined>();
  const [side, setSide] = useState("buy");
  const [qty, setQty] = useState(1);

  const submit = () => {
    if (!symbol || qty <= 0) {
      toast.error("Select a symbol and quantity");
      return;
    }
    toast.success("Order placed", { description: `${side.toUpperCase()} ${qty} ${symbol} (market)` });
    setQty(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Quick Trade</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Select value={symbol} onValueChange={setSymbol}>
          <SelectTrigger>
            <SelectValue placeholder="Symbol" />
          </SelectTrigger>
          <SelectContent>
            {symbols.map((s) => (
              <SelectItem key={s.sym} value={s.sym}>{s.sym} — {s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="grid grid-cols-2 gap-3">
          <Select value={side} onValueChange={setSide}>
            <SelectTrigger>
              <SelectValue placeholder="Side" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buy">Buy</SelectItem>
              <SelectItem value="sell">Sell</SelectItem>
            </SelectContent>
          </Select>
          <Input type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} placeholder="Qty" />
        </div>

        <Button onClick={submit} className="bg-brand hover:bg-brand/90">Place order</Button>
        <p className="text-xs text-muted-foreground">Simulated orders for demo. Connect a broker API to trade live.</p>
      </CardContent>
    </Card>
  );
}
