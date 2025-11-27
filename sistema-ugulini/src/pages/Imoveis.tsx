import { useEffect, useState } from "react";
import Cabecario from "@/components/Cabecario";
import Rodape from "@/components/Rodape";
import Filtro from "@/components/Filtro";
import ImoveisCard from "@/components/ImoveisCard";
import { api } from "@/services/api";

interface Imovel {
  id: number;
  valor: number;
  nome_sobrenome: string;
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

const Imoveis = () => {
  const [Imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen flex flex-col">
      <Cabecario />

      <section className="bg-card border-b border-border py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Nossos Imóveis</h1>
          <p className="text-xl text-muted-foreground">
            Encontre o imóvel perfeito para você em Jaguari e região
          </p>
        </div>
      </section>

      <Filtro onSearch={buscarImoveis} />

      <section className="py-12 flex-1">
        <div className="container">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              {loading
                ? "Carregando..."
                : `${Imoveis.length} imóveis encontrados`}
            </p>
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground">
              Carregando imóveis...
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Imoveis.map((imovel) => (
                <ImoveisCard
                  key={imovel.id}
                  id={String(imovel.id)}
                  titulo={imovel.descricao}
                  localizacao={`${imovel.endereco.bairro}, ${imovel.endereco.cidade}`}
                  valor={formataValor(imovel.valor)}
                  finalidade={
                    imovel.finalidade === "Venda" ? "Venda" : "Aluguel"
                  }
                  image={imovel.fotos?.[0]?.path_foto ?? "/placeholder.jpg"}
                  quarto={imovel.quartos || 0}
                  banheiro={imovel.banheiros || 0}
                  vagas={imovel.vagas_garagem || 0}
                  area={imovel.area_total || 0}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Rodape />
    </div>
  );
};

export default Imoveis;
