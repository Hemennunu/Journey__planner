import { Link, NavLink, useNavigate } from "react-router-dom";
import { Train, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
      isActive ? "text-primary bg-accent" : "text-foreground/70 hover:text-primary hover:bg-accent/50"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-elegant">
            <Train className="h-5 w-5 text-primary-foreground" />
          </div>
          <span>RailGo</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/search" className={linkClass}>Search</NavLink>
          {user && <NavLink to="/tickets" className={linkClass}>My Tickets</NavLink>}
          {user && <NavLink to="/profile" className={linkClass}>Profile</NavLink>}
        </div>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">Hi, {user.name.split(" ")[0]}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>Login</Button>
              <Button size="sm" onClick={() => navigate("/register")}>Sign up</Button>
            </>
          )}
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-3 flex flex-col gap-1">
            <NavLink to="/search" className={linkClass} onClick={() => setOpen(false)}>Search</NavLink>
            {user && <NavLink to="/tickets" className={linkClass} onClick={() => setOpen(false)}>My Tickets</NavLink>}
            {user && <NavLink to="/profile" className={linkClass} onClick={() => setOpen(false)}>Profile</NavLink>}
            {user ? (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="justify-start">
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => { setOpen(false); navigate("/login"); }}>Login</Button>
                <Button size="sm" onClick={() => { setOpen(false); navigate("/register"); }}>Sign up</Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
