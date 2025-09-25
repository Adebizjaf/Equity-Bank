import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransferForm from "@/features/payments/TransferForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Payments() {
  return (
    <Layout>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Payments & Transfers</h1>
            <p className="mt-2 text-muted-foreground">Send money internally or externally, pay bills, or transfer to friends with P2P.</p>
          </div>

          <Tabs defaultValue="internal" className="w-full">
            <TabsList className="bg-muted/60">
              <TabsTrigger value="internal">Internal</TabsTrigger>
              <TabsTrigger value="external">External</TabsTrigger>
              <TabsTrigger value="bill">Bill Pay</TabsTrigger>
              <TabsTrigger value="p2p">P2P</TabsTrigger>
            </TabsList>
            <TabsContent value="internal"><TransferForm type="internal" /></TabsContent>
            <TabsContent value="external"><TransferForm type="external" /></TabsContent>
            <TabsContent value="bill"><TransferForm type="bill" /></TabsContent>
            <TabsContent value="p2p"><TransferForm type="p2p" /></TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recipient</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Electric Co.", amount: -120.5 },
                    { name: "John Doe", amount: -86.23 },
                    { name: "Savings", amount: -300.0 },
                  ].map((p, i) => (
                    <TableRow key={i}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell className="text-right { }">
                        <span className={p.amount < 0 ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"}>
                          {p.amount < 0 ? "-" : "+"}${Math.abs(p.amount).toFixed(2)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Saved Beneficiaries</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3 text-sm text-muted-foreground">
                <li>John Doe ••••6789 — Chase</li>
                <li>Jane Smith ••••4421 — Bank of America</li>
                <li>Electric Co. — Ref 8842</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
