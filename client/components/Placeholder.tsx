import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Placeholder({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {description ? (
        <p className="mt-3 text-muted-foreground">{description}</p>
      ) : null}
      <div className="mt-6 flex items-center justify-center gap-3">
        <Link to="/dashboard"><Button className="bg-brand hover:bg-brand/90">Go to Dashboard</Button></Link>
        <Link to="/"><Button variant="outline">Back home</Button></Link>
      </div>
    </div>
  );
}
