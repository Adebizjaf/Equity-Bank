import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export type TransferType = "internal" | "external" | "bill" | "p2p";

const baseSchema = z.object({
  from: z.string().min(1, "Select a source account"),
  amount: z
    .string()
    .refine((v) => Number(v) > 0, { message: "Enter a valid amount" }),
  note: z.string().max(140).optional().default(""),
  schedule: z.boolean().default(false),
  date: z.string().optional(),
});

const schemas: Record<TransferType, z.ZodTypeAny> = {
  internal: baseSchema.extend({ to: z.string().min(1, "Select a destination account") }),
  external: baseSchema.extend({
    recipientName: z.string().min(2, "Enter recipient name"),
    recipientAccount: z.string().min(6, "Enter account number"),
    bank: z.string().min(2, "Select bank"),
  }),
  bill: baseSchema.extend({
    biller: z.string().min(1, "Select a biller"),
    reference: z.string().min(2, "Enter reference / account"),
  }),
  p2p: baseSchema.extend({
    handle: z.string().min(3, "Enter phone or email"),
  }),
};

const accounts = [
  { id: "CHK-3421", label: "Checking ••3421 ($2,430.18)" },
  { id: "SVG-7710", label: "Savings ••7710 ($11,800.00)" },
];

const banks = ["Equity Bank", "Chase", "Bank of America", "Wells Fargo", "Citi"];
const billers = ["Electric Co.", "Water Utility", "Internet Provider", "Mobile Carrier"];

export default function TransferForm({ type }: { type: TransferType }) {
  const form = useForm<z.infer<typeof schemas[typeof type]>>({
    resolver: zodResolver(schemas[type]),
    defaultValues: { schedule: false } as any,
  });

  const onSubmit = form.handleSubmit((values) => {
    const pretty = JSON.stringify({ type, ...values }, null, 2);
    toast.success("Payment scheduled", {
      description: `Your ${type} payment was created successfully.`,
    });
    // eslint-disable-next-line no-console
    console.log("PAYMENT_REQUEST", pretty);
    form.reset({ schedule: false } as any);
  });

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="from" as={"from" as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From account</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map((a) => (
                          <SelectItem key={a.id} value={a.id}>{a.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {type === "internal" && (
              <FormField
                control={form.control}
                name="to" as={"to" as any}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To account</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.map((a) => (
                            <SelectItem key={a.id} value={a.id}>{a.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {type === "external" && (
              <>
                <FormField
                  control={form.control}
                  name="recipientName" as={"recipientName" as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipientAccount" as={"recipientAccount" as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account number</FormLabel>
                      <FormControl>
                        <Input placeholder="000123456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bank" as={"bank" as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select bank" />
                          </SelectTrigger>
                          <SelectContent>
                            {banks.map((b) => (
                              <SelectItem key={b} value={b}>{b}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {type === "bill" && (
              <>
                <FormField
                  control={form.control}
                  name="biller" as={"biller" as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biller</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select biller" />
                          </SelectTrigger>
                          <SelectContent>
                            {billers.map((b) => (
                              <SelectItem key={b} value={b}>{b}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reference" as={"reference" as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference / Account</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 001-3344-5566" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {type === "p2p" && (
              <FormField
                control={form.control}
                name="handle" as={"handle" as any}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient (email or phone)</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormDescription>We’ll notify the recipient to accept the transfer.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="amount" as={"amount" as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" min={0} placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date" as={"date" as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>Leave empty to send now.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note" as={"note" as any}
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Optional note" rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="schedule" as={"schedule" as any}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-md border p-3 sm:col-span-2">
                  <div>
                    <FormLabel>Make this recurring</FormLabel>
                    <FormDescription>Enable to schedule as a repeating payment.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="sm:col-span-2 flex items-center justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => form.reset({ schedule: false } as any)}>Clear</Button>
              <Button type="submit" className="bg-brand hover:bg-brand/90">Submit</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
