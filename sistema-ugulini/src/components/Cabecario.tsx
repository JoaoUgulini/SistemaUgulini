import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Building2,
  Users,
  Phone,
  LogIn,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/ugulini-logo.png";

const Navigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const isLogged = Boolean(sessionStorage.getItem("token"));

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-warm">
      <div className="flex h-16 items-center justify-between px-4 md:container">
        <Link
          to="/"
          className="flex items-center transition-smooth hover:opacity-80"
        >
          <img
            src={logo}
            alt="Ugulini Contabilidade e Imóveis"
            className="h-12 w-auto"
          />
        </Link>

        <div className="flex items-center space-x-1">
          <Button
            variant={isActive("/") ? "secondary" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Início
            </Link>
          </Button>

          <Button
            variant={isActive("/imoveis") ? "secondary" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/imoveis">
              <Building2 className="mr-2 h-4 w-4" />
              Imóveis
            </Link>
          </Button>

          <Button
            variant={isActive("/sobre") ? "secondary" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/sobre">
              <Users className="mr-2 h-4 w-4" />
              Sobre Nós
            </Link>
          </Button>

          <Button
            variant={isActive("/contato") ? "secondary" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/contato">
              <Phone className="mr-2 h-4 w-4" />
              Contato
            </Link>
          </Button>
        </div>

        {isLogged ? (
          <Button variant="secondary" size="sm" asChild>
            <Link to="/admin/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Painel
            </Link>
          </Button>
        ) : (
          <Button variant="default" size="sm" asChild>
            <Link to="/admin/login">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
