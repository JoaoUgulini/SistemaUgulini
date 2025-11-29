const service = require("../services/imovel.service");
const { Prisma } = require("@prisma/client");

module.exports = {
  async list(req, res) {
    try {
      const imoveis = await service.list();
      res.json(imoveis);
    } catch (error) {
      console.error("Erro no controller.list:", error);
      res.status(500).json({ error: "Erro ao listar imóveis" });
    }
  },

  async getById(req, res) {
    try {
      const id = BigInt(req.params.id);
      const imovel = await service.getById(id);

      if (!imovel) {
        return res.status(404).json({ error: "Imóvel não encontrado" });
      }

      res.json(imovel);
    } catch (error) {
      console.error("ERRO REAL NO GET /imoveis/:id =>", error);
      res
        .status(500)
        .json({ error: "Erro ao buscar imóvel", detalhe: error.message });
    }
  },
  async create(req, res) {
    try {
      const data = req.body;
      const files = req.files;

      const novo = await service.create(data, files);
      res.status(201).json(novo);
    } catch (error) {
      console.error("Erro no controller.create:", error);
      res.status(500).json({ error: "Erro ao criar imóvel" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const files = req.files;

      const atualizado = await service.update(id, data, files);
      res.json(atualizado);
    } catch (error) {
      console.error("Erro no controller.update:", error);
      res.status(500).json({ error: "Erro ao atualizar imóvel" });
    }
  },

  async filter(req, res) {
    try {
      const data = await service.filter(req.query);
      res.json(data);
    } catch (err) {
      console.error("Erro no controller.filter:", err);
      res.status(500).json({
        error: "Erro ao filtrar imóveis",
        details: err.message,
      });
    }
  },

  async getCidades(req, res) {
    try {
      const cidades = await service.getCidades();
      res.json(cidades);
    } catch (err) {
      console.error("Erro no controller.getCidades:", err);
      res
        .status(500)
        .json({ error: "Erro ao buscar cidades", detalhe: err.message });
    }
  },

  async getBairros(req, res) {
    try {
      const { cidade } = req.query;
      const bairros = await service.getBairros(cidade);
      res.json(bairros);
    } catch (err) {
      console.error("ERRO REAL getBairros:", err);
      res
        .status(500)
        .json({ error: "Erro ao buscar bairros", detalhe: err.message });
    }
  },
};
