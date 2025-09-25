import Layout from "@/components/Layout";
import Chat from "@/features/support/Chat";
import TicketForm from "@/features/support/TicketForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, Mail, Shield } from "lucide-react";

export default function Support() {
  return (
    <Layout>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Support</h1>
            <p className="mt-2 text-muted-foreground">Live chat, secure messaging, and help resources.</p>
          </div>
          <Chat />

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Help Center</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="a1">
                  <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                  <AccordionContent>
                    Go to Security → Password Management and follow the steps. You'll confirm via email/SMS.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="a2">
                  <AccordionTrigger>Why is my transfer pending?</AccordionTrigger>
                  <AccordionContent>
                    External transfers may take 1–3 business days. Large amounts can trigger manual review for safety.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="a3">
                  <AccordionTrigger>How do virtual cards work?</AccordionTrigger>
                  <AccordionContent>
                    Create cards in Cards → Manage. Set limits, freeze/unfreeze, and delete anytime. Numbers are unique per card.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <TicketForm />

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand" /> +1 (800) 555‑0139 — 24/7</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand" /> support@equitybank.app</p>
              <p className="flex items-center gap-2"><Shield className="h-4 w-4 text-brand" /> All communications are encrypted.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
