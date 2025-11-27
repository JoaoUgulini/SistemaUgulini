import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Imoveis from "./pages/Imoveis";
import ImoveisDetalhes from "./pages/ImoveisDetalhes";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Error404 from "./pages/Error404";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import PropertiesList from "./pages/admin/imoveisList";
import PropertyForm from "./pages/admin/ImovelForm";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/imoveis" element={<Imoveis />} />
                    <Route path="/imoveis/:id" element={<ImoveisDetalhes />} />
                    <Route path="/sobre" element={<Sobre />} />
                    <Route path="/contato" element={<Contato />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<Login />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/imoveis" element={<PropertiesList />} />
                    <Route path="/admin/imoveis/novo" element={<PropertyForm />} />
                    <Route path="/admin/imoveis/:id/editar" element={<PropertyForm />} />

                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
