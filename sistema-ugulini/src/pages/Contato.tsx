import Navigation from "@/components/Cabecario";
import Footer from "@/components/Rodape";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { enviarContato } from "@/services/contato";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formulario = e.target as HTMLFormElement;

    const dados = {
      nome: (formulario.elements.namedItem("nome") as HTMLInputElement).value,
      email: (formulario.elements.namedItem("email") as HTMLInputElement).value,
      telefone: (formulario.elements.namedItem("telefone") as HTMLInputElement)
        .value,
      assunto: (formulario.elements.namedItem("assunto") as HTMLInputElement)
        .value,
      mensagem: (
        formulario.elements.namedItem("mensagem") as HTMLTextAreaElement
      ).value,
    };

    try {
      const resultado = await enviarContato(dados);

      if (resultado.sucesso) {
        toast({
          title: "Mensagem enviada!",
          description: "Retornaremos em breve.",
        });
        formulario.reset();
      } else {
        toast({
          title: "Erro ao enviar mensagem",
          description: "Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } catch (erro) {
      toast({
        title: "Erro no servidor",
        description: "Não foi possível enviar sua mensagem.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header */}
      <section className="bg-card border-b border-border py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Entre em Contato</h1>
          <p className="text-xl text-muted-foreground">
            Estamos aqui para ajudar você. Fale conosco!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 flex-1">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Form */}
            <Card className="lg:col-span-2 p-8 shadow-warm">
              <h2 className="text-2xl font-bold mb-6">Envie sua Mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome Completo</label>
                    <Input name="nome" placeholder="Seu nome" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">E-mail</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Telefone</label>
                    <Input
                      name="telefone"
                      placeholder="(55) 99999-9999"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Assunto</label>
                    <Input
                      name="assunto"
                      placeholder="Como podemos ajudar?"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Mensagem</label>
                  <Textarea
                    name="mensagem"
                    placeholder="Conte-nos mais sobre o que você precisa..."
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto">
                  Enviar Mensagem
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="p-6 space-y-6 shadow-warm">
                <h2 className="text-2xl font-bold">Informações de Contato</h2>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Telefone</p>
                      <a
                        href="tel:+555532551436"
                        className="text-muted-foreground hover:text-primary transition-smooth"
                      >
                        (55) 3255-1436
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">E-mail</p>
                      <a
                        href="mailto:ugulini@yahoo.com.br"
                        className="text-muted-foreground hover:text-primary transition-smooth"
                      >
                        ugulini@yahoo.com.br
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Endereço</p>
                      <p className="text-muted-foreground">
                        Rua Prefeito Ervandil Reghelin, 395 - Centro
                        <br />
                        Jaguari/RS - CEP 97760-000
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Horário de Atendimento</p>
                      <p className="text-muted-foreground">
                        Segunda a Sexta: 08h30 às 17h30
                        <br />
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-primary text-primary-foreground shadow-warm">
                <h3 className="text-xl font-bold mb-3 text-white">WhatsApp</h3>
                <p className="mb-4 opacity-90">
                  Prefere conversar pelo WhatsApp? Clique no botão abaixo!
                </p>
                <Button variant="secondary" className="w-full" asChild>
                  <a
                    href="https://wa.me/555532551436"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Abrir WhatsApp
                  </a>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
