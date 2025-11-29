const API_URL = import.meta.env.VITE_API_BASE_URL;

export const enviarContato = async (dados: any) => {
  return fetch(`${API_URL}/api/contato`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  }).then((res) => res.json());
};
