import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import Filtro from "@/components/Filtro";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import api from "@/services/api";

interface Imovel {
  id: number;
  valor: number;
  tipo: string;
  descricao: string;
  finalidade: string;
  area_total: number;
  quartos: number | null;
  banheiros: number | null;
  vagas_garagem: number | null;
  endereco: {
    bairro: string;
    cidade: string;
  };
  fotos: { path_foto: string }[];
}

const ImoveisList = () => {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = api.defaults.baseURL;

  useEffect(() => {
    const loadImoveis = async () => {
      try {
        const response = await api.get("/imoveis");
        setImoveis(response.data);
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      } finally {
        setLoading(false);
      }
    };

    loadImoveis();
  }, []);

  const formataValor = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const buscarImoveis = async (filters: any) => {
    setLoading(true);

    try {
      const params = new URLSearchParams(filters);
      const response = await api.get(`/imoveis/filter?${params.toString()}`);
      setImoveis(response.data);
    } catch (error) {
      console.error("Erro ao filtrar imóveis:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gerenciar Imóveis</h1>
            <p className="text-muted-foreground">
              {loading ? "Carregando..." : `${imoveis.length} imóveis cadastrados`}
            </p>
          </div>

          <Button asChild>
            <Link to="/admin/imoveis/novo">Adicionar Imóvel</Link>
          </Button>
        </div>

        <Filtro onSearch={buscarImoveis} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {imoveis.map((property) => (
            <Card key={property.id} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={
                    property.fotos?.[0]?.path_foto
                      ? property.fotos[0].path_foto
                      : "/placeholder.jpg"
                  }
                  }
                alt={property.descricao}
                className="h-full w-full object-cover"
                />

                <Badge className="absolute top-3 right-3">
                  {property.tipo}
                </Badge>
              </div>

              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                    {property.descricao}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {property.endereco.bairro}, {property.endereco.cidade}
                  </p>
                  <p className="text-lg font-bold text-primary mt-2">
                    {formataValor(property.valor)}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  <Badge
                    variant={property.finalidade === "Venda" ? "default" : "secondary"}
                  >
                    {property.finalidade}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link to={`/imoveis/${property.id}`}>
                      <Eye className="mr-1 h-3 w-3" />
                      Ver
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link to={`/admin/imoveis/${property.id}/editar`}>
                      <Edit className="mr-1 h-3 w-3" />
                      Editar
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ImoveisList;
