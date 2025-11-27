export interface Imovel {
  id: number;
  valor: number | null;
  nome_sobrenome: string;
  telefone?: string;
  tipo?: string;
  finalidade?: string;
  status_imovel?: string;
  medida_frente?: number;
  medida_lateral?: number;
  area_total?: number;
  quartos?: number;
  banheiros?: number;
  vagas_garagem?: number;
  descricao?: string;
  data_cadastro?: string;
  endereco?: {
    cidade?: string;
    bairro?: string;
    logradouro?: string;
    numero?: string;
  };
  fotos?: {
    id: number;
    path_foto: string;
  }[];
}
