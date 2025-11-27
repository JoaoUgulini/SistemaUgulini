import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/ugulini-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <img src={logo} alt="Ugulini Contabilidade e Imóveis" className="h-16 w-auto" />
            <p className="text-sm text-muted-foreground">
              Tradição em contabilidade e imóveis em Jaguari/RS. Modernizando com tecnologia,
              mantendo os valores de ética e confiança que nos definem.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <div className="space-y-3">
              <a 
                href="https://wa.me/555532551436" 
                className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-smooth link-soft"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="h-4 w-4" />
                <span>(55) 3255-1436</span>
              </a>
              <a 
                href="mailto:ugulini@yahoo.com.br" 
                className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-smooth link-soft"
              >
                <Mail className="h-4 w-4" />
                <span>ugulini@yahoo.com.br</span>
              </a>
              <div className="flex items-start space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Rua Prefeito Ervandil Reghelin, 395 - Centro<br />Jaguari/RS - CEP 97760-000</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-smooth link-soft">
                Início
              </Link>
              <Link to="/imoveis" className="text-sm text-muted-foreground hover:text-primary transition-smooth link-soft">
                Imóveis
              </Link>
              <Link to="/sobre" className="text-sm text-muted-foreground hover:text-primary transition-smooth link-soft">
                Sobre Nós
              </Link>
              <Link to="/contato" className="text-sm text-muted-foreground hover:text-primary transition-smooth link-soft">
                Contato
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Ugulini Contabilidade e Imóveis. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
