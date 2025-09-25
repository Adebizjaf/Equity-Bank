import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { CreditCard, Home, Landmark, Shield, Wallet, ChartPie, HandCoins, MessageSquare } from "lucide-react";
import { ReactNode } from "react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: Landmark },
  { to: "/payments", label: "Payments", icon: HandCoins },
  { to: "/security", label: "Security", icon: Shield },
  { to: "/investments", label: "Investments", icon: ChartPie },
  { to: "/loans", label: "Loans", icon: Wallet },
  { to: "/support", label: "Support", icon: MessageSquare },
];

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Header />
      <main className="container py-8">
        {children ?? <Outlet />}
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-brand to-brand-gold" />
          <span className="text-lg font-bold tracking-tight">
            Equity <span className="text-brand">Bank</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground",
                  isActive && "bg-accent text-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" /> {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:inline-flex">Log in</Button>
          <Button className="bg-brand hover:bg-brand/90">Open account</Button>
          <Avatar className="h-8 w-8">
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-gradient-to-br from-brand to-brand-gold" />
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Equity Bank. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link to="/security" className="hover:text-foreground">Security</Link>
          <Link to="/support" className="hover:text-foreground">Support</Link>
          <Link to="/cards" className="hover:text-foreground">Cards</Link>
          <a href="#accessibility" className="hover:text-foreground">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}
