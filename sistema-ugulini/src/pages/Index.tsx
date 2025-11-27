import { useEffect, useState } from "react";
import Cabecario from "@/components/Cabecario";
import Rodape from "@/components/Rodape";
import ImoveisCard from "@/components/ImoveisCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ArrowRight,
  Award,
  Users,
  Home as HomeIcon,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import heroBg from "@/assets/hero-bg.jpeg";
import { api } from "@/services/api";

interface Imovel {
  id: number;
  valor: number;
  nome_sobrenome: string;
  tipo: string;
  descricao: string;
  finalidade: "Venda" | "Aluguel";
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

const Index = () => {
  const [featured, setFeatured] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [cidades, setCidades] = useState<{ cidade: string }[]>([]);
const [bairros, setBairros] = useState<{ bairro: string }[]>([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [bairroSelecionado, setBairroSelecionado] = useState("");

  const formataValor = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const buscar = () => {
  const params = new URLSearchParams();

  if (cidadeSelecionada) params.append("cidade", cidadeSelecionada);
  if (bairroSelecionado) params.append("bairro", bairroSelecionado);

  window.location.href = `/imoveis?${params.toString()}`;
};

  useEffect(() => {
  api.get("/imoveis/cidades").then((res) => {
    console.log("RETORNO DAS CIDADES:", res.data);
    {console.log("TIPO CIDADES:", cidades)}
    setCidades(res.data);
  });
}, []);


  useEffect(() => {
    if (!cidadeSelecionada) {
      setBairros([]);
      return;
    }


    api.get(`/imoveis/bairros?cidade=${cidadeSelecionada}`).then((res) => {
      setBairros(res.data || []);
    });
  }, [cidadeSelecionada]);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const response = await api.get("/imoveis");
        setFeatured(response.data.slice(0, 3));
      } catch (err) {
        console.error("Erro ao carregar imóveis:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecario />

      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-accent/90" />
        </div>

        <div className="container relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white ">
            Seu Lar, Nossa Missão
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Tradição em contabilidade e imóveis desde 1999 em Jaguari/RS
          </p>

          <div className="max-w-2xl mx-auto bg-card/95 backdrop-blur rounded-lg p-4 shadow-lg">
            <div className="flex flex-col md:flex-row gap-3 text-black">

  {/* CIDADE */}
<Select onValueChange={setCidadeSelecionada}>
  <SelectTrigger className="flex-1 bg-white">
    <SelectValue placeholder="Selecione a cidade" />
  </SelectTrigger>
  <SelectContent>
    {cidades.map((item) => (
      <SelectItem key={item.cidade} value={item.cidade}>
        {item.cidade}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

{/* BAIRRO */}
<Select
  disabled={!cidadeSelecionada}
  onValueChange={setBairroSelecionado}
>
  <SelectTrigger className="flex-1 bg-white">
    <SelectValue placeholder="Selecione o bairro" />
  </SelectTrigger>
  <SelectContent>
    {bairros.map((item) => (
      <SelectItem key={item.bairro} value={item.bairro}>
        {item.bairro}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

  {/* BOTÃO BUSCAR */}
  <Button onClick={buscar} size="lg" className="px-8">
    <Search className="mr-2 h-4 w-4" />
    Buscar
  </Button>

</div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Imóveis em Destaque</h2>
              <p className="text-muted-foreground">
                Confira nossas melhores oportunidades desta semana
              </p>
            </div>

            <Button variant="outline" asChild className="hidden md:flex">
              <a href="/imoveis">
                Ver Todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {loading ? (
            <p>Carregando...</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((imovel) => (
                <ImoveisCard
                  key={imovel.id}
                  id={String(imovel.id)}
                  titulo={imovel.descricao}
                  localizacao={`${imovel.endereco.bairro}, ${imovel.endereco.cidade}`}
                  valor={formataValor(imovel.valor)}
                  finalidade={imovel.finalidade}
                  image={imovel.fotos?.[0]?.path_foto}
                  banheiro={imovel.quartos || 0}
                  quarto={imovel.banheiros || 0}
                  area={imovel.area_total || 0}
                />
              ))}
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild className="w-full">
              <a href="/imoveis">
                Ver Todos os Imóveis
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Por Que Escolher a Ugulini?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Tradição e Confiança</h3>
              <p className="text-muted-foreground">
                Mais de 26 anos de experiência servindo a comunidade de Jaguari
                com ética e transparência.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Atendimento Familiar</h3>
              <p className="text-muted-foreground">
                Uma empresa familiar que trata cada cliente como parte da nossa
                família.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <HomeIcon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Conhecimento Local</h3>
              <p className="text-muted-foreground">
                Profundo conhecimento do mercado imobiliário e contábil da
                região.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Pronto para Encontrar Seu Próximo Imóvel?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Entre em contato conosco e descubra como podemos ajudar você
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="/imoveis">Ver Imóveis</a>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a href="/contato">Falar com Corretor</a>
            </Button>
          </div>
        </div>
      </section>

      <Rodape />
    </div>
  );
};

export default Index;
