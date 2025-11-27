import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Maximize, Car } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "@/services/api";

interface PropertyCardProps {
  id: string;
  image: string;
  titulo: string;
  localizacao: string;
  valor: string;
  finalidade: "Venda" | "Aluguel";
  quarto?: number;
  banheiro?: number;
  vagas?: number;
  area?: number;
}

const PropertyCard = ({
  id,
  image,
  titulo: titulo,
  localizacao: localizacao,
  valor: valor,
  finalidade: finalidade,
  quarto: quartos,
  banheiro: banheiros,
  vagas,
  area,
}: PropertyCardProps) => {

  const API_URL = api.defaults.baseURL;

  return (
    <Link to={`/imoveis/${id}`}>
      <Card className="overflow-hidden transition-smooth hover:shadow-warm group cursor-pointer hover-lift hover:ring-1 hover:ring-primary/10">
        <div className="relative h-48 overflow-hidden">
          <img
            src={`${API_URL}${image}`}
            alt={titulo}
            className="h-full w-full object-cover transition-smooth group-hover:scale-110"
          />
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground shadow-sm rounded-full px-3 py-1 text-sm font-medium">
            {finalidade}
          </Badge>
        </div>

        <div className="p-5 space-y-3">
          <div>
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{titulo}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              {localizacao}
            </div>
          </div>

          {(quartos || banheiros || vagas || area) && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {quartos && (
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  {quartos}
                </div>
              )}
              {banheiros && (
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  {banheiros}
                </div>
              )}
              {vagas && (
                <div className="flex items-center gap-1">
                  <Car className="h-4 w-4" />
                  {vagas}
                </div>
              )}
              {area && (
                <div className="flex items-center gap-1">
                  <Maximize className="h-4 w-4" />
                  {area}m²
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-xl font-bold text-primary">{valor}</span>
            <Button size="sm" variant="default" className="hover-lift">
              Ver Detalhes
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default PropertyCard;
