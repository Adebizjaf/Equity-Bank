import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShieldCheck, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { id: string; from: "agent" | "you"; text: string; at: string };

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "m1",
      from: "agent",
      text: "Hi Adebisi! You're connected to Equity Support. How can we help today?",
      at: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      areaRef.current?.scrollTo({
        top: areaRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, [messages.length]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const at = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), from: "you", text, at },
    ]);
    setInput("");
    // Simulated agent reply
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          from: "agent",
          text: "Thanks! We received your message. A specialist will follow up shortly.",
          at: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 900);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-brand" /> Secure Chat
        </CardTitle>
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5 text-brand" /> 24/7 Support
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-[340px] pr-3" ref={areaRef as any}>
          <div className="space-y-3 py-4">
            {messages.map((m) => (
              <Bubble key={m.id} from={m.from} text={m.text} at={m.at} />
            ))}
          </div>
        </ScrollArea>
        <div className="mt-3 flex gap-2">
          <Input
            placeholder="Type your message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
          />
          <Button
            onClick={send}
            className="bg-brand hover:bg-brand/90"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          All messages are encrypted in transit. Never share passwords or full
          card numbers.
        </p>
      </CardContent>
    </Card>
  );
}

function Bubble({
  from,
  text,
  at,
}: {
  from: Msg["from"];
  text: string;
  at: string;
}) {
  const mine = from === "you";
  return (
    <div
      className={cn(
        "flex items-end gap-2",
        mine ? "justify-end" : "justify-start",
      )}
    >
      {!mine && (
        <div className="h-7 w-7 rounded-full bg-brand/15 flex items-center justify-center text-[10px] font-medium text-brand">
          EQ
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-3 py-2 text-sm",
          mine ? "bg-brand text-white" : "bg-muted",
        )}
      >
        {text}
      </div>
      <span className="text-[10px] text-muted-foreground">{at}</span>
      {mine && (
        <div className="h-7 w-7 rounded-full bg-accent flex items-center justify-center text-[10px] font-medium">
          You
        </div>
      )}
    </div>
  );
}
