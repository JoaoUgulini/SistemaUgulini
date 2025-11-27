import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Building2, Plus, LogOut, Home } from "lucide-react";
import logo from "@/assets/ugulini-logo.png";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");           
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/admin/dashboard" className="flex items-center transition-smooth hover:opacity-80">
              <img src={logo} alt="Ugulini Admin" className="h-12 w-auto" />
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              <Button
                variant={isActive("/admin/dashboard") ? "secondary" : "ghost"}
                size="sm"
                asChild
              >
                <Link to="/admin/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button
                variant={isActive("/admin/imoveis") ? "secondary" : "ghost"}
                size="sm"
                asChild
              >
                <Link to="/admin/imoveis">
                  <Building2 className="mr-2 h-4 w-4" />
                  Imóveis
                </Link>
              </Button>
              <Button
                variant={isActive("/admin/imoveis/novo") ? "secondary" : "ghost"}
                size="sm"
                asChild
              >
                <Link to="/admin/imoveis/novo">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Imóvel
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Ver Site
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </nav>

      <main className="container py-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
