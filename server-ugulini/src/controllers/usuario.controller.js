const service = require("../services/usuario.service");

module.exports = {
  async login(req, res) {
    try {
      const { cpf, password } = req.body;
      const result = await service.login(cpf, password);

      if (!result.ok) {
        return res.status(400).json({ error: result.error });
      }

      res.json(result);
    } catch (error) {
      console.error("Erro no usuario.controller.login:", error);
      res.status(500).json({ error: "Erro interno no login" });
    }
  },
};
