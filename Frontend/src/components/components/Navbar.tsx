import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils"; // ShadCN utility to handle class merging
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/signup", label: "Signup" },
    { path: "/login", label: "Login" },
  ];

  return (
    <nav className="bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold text-primary tracking-tight hover:opacity-80"
        >
          Basic Login Form
        </Link>

        <div className="flex gap-4 justify-center items-center">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === path
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {label}
            </Link>
          ))}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
