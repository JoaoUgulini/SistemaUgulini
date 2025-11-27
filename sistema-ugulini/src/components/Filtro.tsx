import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import api from "@/services/api";

const Filtro = ({ onSearch }: { onSearch: (filters: any) => void }) => {
  const [cidade, setCidade] = useState("all");
  const [bairro, setBairro] = useState("all");

  const [negocio, setNegocio] = useState("all");
  const [tipoImovel, setTipoImovel] = useState("all");
  const [quartos, setQuartos] = useState("all");
  const [banheiros, setBanheiros] = useState("all");
  const [vagas, setVagas] = useState("all");
  const [area, setArea] = useState("all");

  const [cidades, setCidades] = useState<any[]>([]);
  const [bairros, setBairros] = useState<any[]>([]);

  useEffect(() => {
    api.get("/imoveis/cidades").then((res) => {
      setCidades(res.data);
    });
  }, []);

  useEffect(() => {
    if (cidade !== "all") {
      api.get(`/imoveis/bairros?cidade=${cidade}`).then((res) => {
        setBairros(res.data);
      });
    } else {
      setBairros([]);
      setBairro("all");
    }
  }, [cidade]);

  const enviarFiltros = () => {
    onSearch({
      cidade,
      bairro,
      negocio,
      tipoImovel,
      quartos,
      banheiros,
      vagas,
      area,
    });
  };

  return (
    <section className="bg-background py-8 border-b border-border">
      <div className="container space-y-4">
        <div className="grid gap-4 md:grid-cols-4">
          <Select onValueChange={setCidade}>
            <SelectTrigger>
              <SelectValue placeholder="Cidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Cidades</SelectItem>

              {cidades.map((c, index) => (
                <SelectItem key={index} value={c.cidade}>
                  {c.cidade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setBairro} disabled={cidade === "all"}>
            <SelectTrigger>
              <SelectValue placeholder="Bairro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Bairros</SelectItem>

              {bairros.map((b, index) => (
                <SelectItem key={index} value={b.bairro}>
                  {b.bairro}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setNegocio}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de Negócio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="venda">Venda</SelectItem>
              <SelectItem value="aluguel">Aluguel</SelectItem>
            </SelectContent>
          </Select>

          <Button className="w-full" onClick={enviarFiltros}>
            <Search className="mr-2 h-4 w-4" />
            Buscar
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <Select onValueChange={setTipoImovel}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de Imóvel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="comercial">Comercial</SelectItem>
              <SelectItem value="chacara">Chácara</SelectItem>
              <SelectItem value="terreno">Terreno</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setQuartos}>
            <SelectTrigger>
              <SelectValue placeholder="Quartos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="1">1+ Quarto</SelectItem>
              <SelectItem value="2">2+ Quartos</SelectItem>
              <SelectItem value="3">3+ Quartos</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setBanheiros}>
            <SelectTrigger>
              <SelectValue placeholder="Banheiros" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="1">1+ Banheiro</SelectItem>
              <SelectItem value="2">2+ Banheiros</SelectItem>
              <SelectItem value="3">3+ Banheiros</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setVagas}>
            <SelectTrigger>
              <SelectValue placeholder="Vagas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="1">1+ Vaga</SelectItem>
              <SelectItem value="2">2+ Vagas</SelectItem>
              <SelectItem value="3">3+ Vagas</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setArea}>
            <SelectTrigger>
              <SelectValue placeholder="Área Total" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="0-100">Até 100 m²</SelectItem>
              <SelectItem value="100-200">100 - 200 m²</SelectItem>
              <SelectItem value="200-300">200 - 300 m²</SelectItem>
              <SelectItem value="300+">Acima de 300 m²</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
};

export default Filtro;
