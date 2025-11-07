import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music2 } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass">
      <nav className="container-custom flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Music2 className="h-6 w-6 text-primary" />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Voice2Music
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-accent/10 px-3 py-2 rounded-lg"
          >
            Home
          </Link>
          <Link
            to="/features"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-accent/10 px-3 py-2 rounded-lg"
          >
            Features
          </Link>
          <Link
            to="/about"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-accent/10 px-3 py-2 rounded-lg"
          >
            About
          </Link>
          <Link
            to="/pricing"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-accent/10 px-3 py-2 rounded-lg"
          >
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/auth">Login</Link>
          </Button>
          <Button size="sm" className="glow-effect" asChild>
            <Link to="/auth">Sign Up</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
