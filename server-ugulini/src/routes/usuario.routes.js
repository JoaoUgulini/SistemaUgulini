const controller = require("../controllers/usuario.controller");
const auth = require("../middlewares/auth");
module.exports = router;
const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuario.controller");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ROTA TEMPORÁRIA PARA RESETAR SENHA
router.get("/resetarSenha", async (req, res) => {
  try {
    const hash = "$2a$10$xysPA0cdf.NC11FL8coQTOFnPE.N65f.hvIjpzKfUFRq4YYeCob16";

    await prisma.usuario.update({
      where: { cpf: "03032541069" },
      data: { senha: hash }
    });

    res.send("Senha resetada com sucesso!");
  } catch (err) {
    res.status(500).send("Erro: " + err.message);
  }
});

// ROTAS ORIGINAIS
router.post("/login", controller.login);

module.exports = router;
