import Cabecario from "@/components/Cabecario";
import Rodape from "@/components/Rodape";
import { Card } from "@/components/ui/card";
import { Award, Heart, Shield, TrendingUp } from "lucide-react";
import sobreBg from "@/assets/about-bg.jpeg";

const Sobre = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Cabecario />
      
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${sobreBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80" />
        </div>
        
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Nossa História</h1>
          <p className="text-xl md:text-2xl opacity-95">
            26 anos de tradição e confiança em Jaguari
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Uma Trajetória de Dedicação</h2>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Fundada em 1999 pela família Ugulini, nossa empresa nasceu do desejo de oferecer serviços 
              contábeis e imobiliários de qualidade para a comunidade de Jaguari e região. O que começou 
              como um pequeno escritório familiar cresceu ao longo dos anos, mantendo sempre os mesmos 
              valores que nos trouxeram até aqui: <strong className="text-foreground">ética, transparência e compromisso</strong> com 
              nossos clientes.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Durante mais de 26 anos, acompanhamos o crescimento de Jaguari e de seus moradores. 
              Ajudamos famílias a encontrarem o lar dos seus sonhos, empresários a estabelecerem seus 
              negócios e inúmeros clientes a manterem suas contabilidades em ordem. Cada cliente que 
              passa por nossas portas se torna parte da nossa história.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Hoje, entramos na era digital sem perder nossa essência. Esta plataforma online representa 
              nossa modernização, mas mantém o atendimento humanizado e personalizado que sempre foi nossa 
              marca registrada. Continuamos sendo aquela empresa familiar que você conhece e confia, agora 
              com ferramentas modernas para servir você ainda melhor.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Valores</h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            <Card className="p-6 text-center space-y-4 shadow-warm">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Ética</h3>
              <p className="text-muted-foreground">
                Conduzimos nossos negócios com integridade e transparência absoluta.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 shadow-warm">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Compromisso</h3>
              <p className="text-muted-foreground">
                Cada cliente é tratado como parte da nossa família, com dedicação total.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 shadow-warm">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Excelência</h3>
              <p className="text-muted-foreground">
                Buscamos sempre oferecer o melhor serviço, superando expectativas.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 shadow-warm">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Inovação</h3>
              <p className="text-muted-foreground">
                Modernizamos constantemente para atender melhor nossos clientes.
              </p>
            </Card>
          </div>
        </div>
      </section>
      <Rodape />
    </div>
  );
};

export default Sobre;
