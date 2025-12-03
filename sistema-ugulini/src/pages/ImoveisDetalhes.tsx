import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cabecario from "@/components/Cabecario";
import Rodape from "@/components/Rodape";
import ImoveisMap from "@/components/ImoveisMap";
import { api } from "@/services/api";
import { geocodeEndereco } from "@/services/geocode";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Phone,
  Mail,
  ArrowLeft,
  Car,
  Home,
} from "lucide-react";

interface Imovel {
  id: number | string;
  tipo: string;
  finalidade: string;
  valor: number | string;
  area_total?: number | null;
  medida_frente?: number | null;
  medida_lateral?: number | null;
  quartos?: number | null;
  banheiros?: number | null;
  vagas_garagem?: number | null;
  descricao?: string | null;
  nome_sobrenome?: string | null;
  telefone?: string | null;
  endereco?: {
    logradouro?: string | null;
    numero?: string | null;
    bairro?: string | null;
    cidade?: string | null;
    estado?: string | null;
    cep?: string | null;
    complemento?: string | null;
  } | null;
  fotos?: { path_foto: string }[];
}

const ImoveisDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imovel, setImovel] = useState<Imovel | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/imoveis/${id}`);
        setImovel(res.data);

        if (res.data.endereco) {
          const addr = [
            res.data.endereco.logradouro,
            res.data.endereco.numero,
            res.data.endereco.bairro,
            res.data.endereco.cidade,
            "Rio Grande do Sul",
            res.data.endereco.cep,
            "Brasil",
          ]
            .filter(Boolean)
            .join(", ");

          const location = await geocodeEndereco(addr);
          if (location) setCoords(location);
        }
      } catch (e) {
        console.error("Erro ao buscar imóvel:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!imovel) {
    return (
      <div className="min-h-screen flex flex-col">
        <Cabecario />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Imóvel não encontrado</h1>
            <Button onClick={() => navigate("/imoveis")}>Voltar</Button>
          </div>
        </div>
        <Rodape />
      </div>
    );
  }

  const formataValor = (v?: number | string) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(v ?? 0));

  const enderecoCompleto = imovel.endereco
    ? `${imovel.endereco.logradouro ?? ""}${imovel.endereco.numero ? ", " + imovel.endereco.numero : ""}`
    : "";

  const cidadeEstado = imovel.endereco
    ? `${imovel.endereco.bairro ?? ""}, ${imovel.endereco.cidade ?? ""}/${imovel.endereco.estado ?? ""}`
    : "";

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecario />
      <main className="flex-1 py-8">
        <div className="container">
          <Button variant="ghost" onClick={() => navigate("/imoveis")} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  {imovel.fotos && imovel.fotos.length > 0 ? (
                    <Carousel className="w-full">
                      <CarouselContent>
                        {imovel.fotos.map((foto, index) => (
                          <CarouselItem key={index} className="flex justify-center">
                            <img
                              src={foto.path_foto}
                              alt={`Foto ${index + 1}`}
                              className="w-full h-[400px] md:h-[500px] object-cover rounded-lg"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  ) : (
                    <div className="aspect-video bg-muted flex items-center justify-center rounded-lg">
                      <Home className="w-16 h-16" />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-6">
                  <h1 className="text-3xl font-bold">{imovel.tipo}</h1>

                  <p className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" /> {cidadeEstado}
                  </p>

                  <Badge>{imovel.finalidade}</Badge>

                  <Separator className={undefined} />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imovel.quartos !== undefined && (
                      <div className="p-4 border rounded-lg flex items-center gap-3">
                        <Bed /> <span className="font-semibold">{imovel.quartos ?? "-"}</span>
                      </div>
                    )}

                    {imovel.banheiros !== undefined && (
                      <div className="p-4 border rounded-lg flex items-center gap-3">
                        <Bath /> <span className="font-semibold">{imovel.banheiros ?? "-"}</span>
                      </div>
                    )}

                    {imovel.vagas_garagem !== undefined && (
                      <div className="p-4 border rounded-lg flex items-center gap-3">
                        <Car /> <span className="font-semibold">{imovel.vagas_garagem ?? "-"}</span>
                      </div>
                    )}

                    {imovel.area_total !== undefined && (
                      <div className="p-4 border rounded-lg flex items-center gap-3">
                        <Maximize /> <span className="font-semibold">{imovel.area_total ?? "-"} m²</span>
                      </div>
                    )}
                  </div>

                  {token && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg flex flex-col">
                          <span className="text-sm text-muted-foreground">Proprietário</span>
                          <span className="font-semibold">
                            {imovel.nome_sobrenome || "Não informado"}
                          </span>
                        </div>

                        <div className="p-4 border rounded-lg flex flex-col">
                          <span className="text-sm text-muted-foreground">Telefone</span>
                          <span className="font-semibold">
                            {imovel.telefone || "Sem telefone"}
                          </span>
                        </div>
                      </div>

                      <Separator className={undefined} />
                    </>
                  )}

                  {imovel.descricao && (
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Descrição</h2>
                      <p className="text-muted-foreground">{imovel.descricao}</p>
                    </div>
                  )}

                  <Separator className={undefined} />

                  {imovel.endereco && (
                    <>
                      <h2 className="text-xl font-semibold mb-2">Endereço</h2>
                      <p>{enderecoCompleto}</p>
                      <p className="text-muted-foreground">{cidadeEstado}</p>
                    </>
                  )}

                  <Separator className={undefined} />

                  {coords ? (
                    <ImoveisMap lat={coords.lat} lng={coords.lng} />
                  ) : (
                    <div className="p-4 border rounded-lg">
                      <p className="text-muted-foreground">
                        Não foi possível localizar o endereço com precisão.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <p className="text-sm">Valor</p>
                    <p className="text-3xl font-bold text-primary">{formataValor(imovel.valor)}</p>
                  </div>

                  <Separator className={undefined} />

                  <Button className="w-full" size="lg" asChild>
                    <a href="https://wa.me/555532551436" target="_blank">
                      <Phone className="mr-2 h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>

                  <Button variant="secondary" className="w-full" size="lg" asChild>
                    <a href="tel:+555532551436">
                      <Phone className="mr-2 h-4 w-4" /> (55) 3255-1436
                    </a>
                  </Button>

                  <Button variant="outline" className="w-full" size="lg" asChild>
                    <a href="mailto:ugulini@yahoo.com.br">
                      <Mail className="mr-2 h-4 w-4" /> E-mail
                    </a>
                  </Button>

                  <Separator className={undefined} />

                  <div className="text-xs text-center text-muted-foreground">
                    CRECI/RS 25.883j • Ugulini Contabilidade e Imóveis
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Rodape />
    </div>
  );
};

export default ImoveisDetalhes;
