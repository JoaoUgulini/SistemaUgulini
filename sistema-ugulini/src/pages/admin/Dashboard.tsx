import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [imoveisRecentes, setImoveisRecentes] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/imoveis");
        const ordered = response.data.reverse().slice(0, 3);
        setImoveisRecentes(ordered);
      } catch (error) {
        console.error("Erro ao carregar imóveis:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do sistema de gerenciamento de imóveis
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Imóveis Recentes</CardTitle>
          </CardHeader>

          <CardContent>
            {imoveisRecentes.length === 0 ? (
              <p className="text-muted-foreground">Nenhum imóvel cadastrado.</p>
            ) : (
              <div className="space-y-4">
                {imoveisRecentes.map((imovel: any) => (
                  <div
                    key={imovel.id}
                    onClick={() => navigate(`/imoveis/${imovel.id}`)}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-smooth cursor-pointer"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">
                        {imovel.tipo} — {imovel.finalidade}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {imovel.endereco?.bairro}, {imovel.endereco?.cidade}/{imovel.endereco?.estado}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Proprietário: {imovel.nome_sobrenome}
                      </p>
                    </div>

                    <div className="text-right space-y-1">
                      <p className="font-semibold text-primary">
                        R$ {imovel.valor}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {imovel.status_imovel}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
