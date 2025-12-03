import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { api } from "@/services/api";

const ImovelForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const API_URL = api.defaults.baseURL;

  const [tipo, setTipo] = useState("");
  const [finalidade, setFinalidade] = useState("");
  const [valor, setValor] = useState("");
  const [nomeSobrenome, setNomeSobrenome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [descricao, setDescricao] = useState("");

  const [medidaFrente, setmedidaFrente] = useState("");
  const [medidaLateral, setmedidaLateral] = useState("");
  const [totalArea, setTotalArea] = useState("");
  const [quartos, setQuartos] = useState("");
  const [banheiros, setBanheiros] = useState("");
  const [garagem, setGaragem] = useState("");

  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("Jaguari");
  const [estado, setEstado] = useState("RS");
  const [cep, setCep] = useState("");

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [existingPhotos, setExistingPhotos] = useState<string[]>([]);

  const calculateTotalArea = (front: string, side: string) => {
    const f = parseFloat(front);
    const s = parseFloat(side);
    if (!isNaN(f) && !isNaN(s) && f > 0 && s > 0) {
      setTotalArea((f * s).toFixed(2));
    } else {
      setTotalArea("");
    }
  };

  const handlemedidaFrente = (e: any) => {
    setmedidaFrente(e.target.value);
    calculateTotalArea(e.target.value, medidaLateral);
  };

  const handlemedidaLateral = (e: any) => {
    setmedidaLateral(e.target.value);
    calculateTotalArea(medidaFrente, e.target.value);
  };

  useEffect(() => {
    if (!isEditing) return;

    async function loadImovel() {
      try {
        const res = await api.get(`/imoveis/${id}`);
        const im = res.data;

        setTipo(im.tipo);
        setFinalidade(im.finalidade);
        setValor(im.valor);
        setNomeSobrenome(im.nome_sobrenome);
        setTelefone(im.telefone);
        setDescricao(im.descricao || "");

        setmedidaFrente(im.medida_frente || "");
        setmedidaLateral(im.medida_lateral || "");
        setTotalArea(im.area_total || "");
        setQuartos(im.quartos || "");
        setBanheiros(im.banheiros || "");
        setGaragem(im.vagas_garagem || "");

        if (im.endereco) {
          setLogradouro(im.endereco.logradouro);
          setNumero(im.endereco.numero);
          setBairro(im.endereco.bairro);
          setComplemento(im.endereco.complemento || "");
          setCidade(im.endereco.cidade);
          setEstado(im.endereco.estado);
          setCep(im.endereco.cep || "");
        }

        if (im.fotos && im.fotos.length > 0) {
          setExistingPhotos(im.fotos.map((f: any) => f.path_foto));
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadImovel();
  }, [id, isEditing]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const selectedFiles = Array.from(fileList);
    const preview = selectedFiles.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...selectedFiles]);
    setPreviewImages((prev) => [...prev, ...preview]);

    e.target.value = "";
  };

  const removePreview = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const buildFormData = () => {
    const form = new FormData();

    form.append("tipo", tipo);
    form.append("finalidade", finalidade);
    form.append("valor", valor);
    form.append("nome_sobrenome", nomeSobrenome);
    form.append("telefone", telefone);
    form.append("descricao", descricao);

    form.append("medida_frente", medidaFrente);
    form.append("medida_lateral", medidaLateral);
    form.append("area_total", totalArea);
    form.append("quartos", quartos);
    form.append("banheiros", banheiros);
    form.append("vagas_garagem", garagem);

    form.append("logradouro", logradouro);
    form.append("numero", numero);
    form.append("bairro", bairro);
    form.append("complemento", complemento);
    form.append("cidade", cidade);
    form.append("estado", estado);
    form.append("cep", cep);

    images.forEach((f) => form.append("fotos", f));

    return form;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const form = buildFormData();

      if (isEditing) {
        await api.put(`/imoveis/${id}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/imoveis", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      navigate("/admin/imoveis");
    } catch (error: any) {
      console.error(error);
      alert("Erro ao salvar o imóvel.");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {isEditing ? "Editar Imóvel" : "Novo Imóvel"}
          </h1>
          <p className="text-muted-foreground">
            Preencha os dados do imóvel abaixo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Input
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    placeholder="Casa, Apto..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Finalidade</Label>
                  <Select value={finalidade} onValueChange={setFinalidade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Venda">Venda</SelectItem>
                      <SelectItem value="Aluguel">Aluguel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Valor</Label>
                <Input
                  type="number"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  placeholder="450000"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Proprietário</Label>
                  <Input
                    value={nomeSobrenome}
                    onChange={(e) => setNomeSobrenome(e.target.value)}
                    placeholder="Nome"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="55 (XX) XXXXX-XXXX"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea
                  rows={4}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descrição completa..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Características</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label>Quartos</Label>
                  <Input
                    type="number"
                    value={quartos}
                    onChange={(e) => setQuartos(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Banheiros</Label>
                  <Input
                    type="number"
                    value={banheiros}
                    onChange={(e) => setBanheiros(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Garagem</Label>
                  <Input
                    type="number"
                    value={garagem}
                    onChange={(e) => setGaragem(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Medida Frente (m)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={medidaFrente}
                    onChange={handlemedidaFrente}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Medida Lateral (m)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={medidaLateral}
                    onChange={handlemedidaLateral}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Área Total (m²)</Label>
                  <Input value={totalArea} readOnly className="bg-muted" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Endereço</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2 md:col-span-2">
                  <Label>Logradouro</Label>
                  <Input
                    value={logradouro}
                    onChange={(e) => setLogradouro(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Número</Label>
                  <Input
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Bairro</Label>
                  <Input
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Complemento</Label>
                  <Input
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Cidade</Label>
                  <Input
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Input
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>CEP</Label>
                  <Input value={cep} onChange={(e) => setCep(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fotos do Imóvel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition">
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <label htmlFor="images" className="cursor-pointer">
                  <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Clique para fazer upload ou arraste as imagens aqui
                  </p>
                </label>
              </div>

              {isEditing && existingPhotos.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Fotos existentes</h3>
                  <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                    {existingPhotos.map((url, index) => (
                      <img
                        key={index}
                        src={`${API_URL}${url}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                </div>
              )}

              {previewImages.length > 0 && (
                <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                  {previewImages.map((src, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={src}
                        className="rounded-lg w-full h-32 object-cover"
                      />

                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 h-6 w-6"
                        onClick={() => removePreview(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>

                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                          Principal
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/imoveis")}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {isEditing ? "Salvar Alterações" : "Criar Imóvel"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ImovelForm;
