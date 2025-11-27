const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuario.controller");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ROTA TEMPORÁRIA PARA RESETAR A SENHA (REMOVER DEPOIS)
router.get("/resetarSenha", async (req, res) => {
  try {
    // HASH DA SENHA NOVA → Contabil20
    const hash = "$2a$10$xysPA0cdf.NC11FL8coQTOFnPE.N65f.hvIjpzKfUFRq4YYeCob16";

    await prisma.usuario.update({
      where: { cpf: "03032541069" },
      data: { senha: hash }
    });

    res.send("Senha resetada com sucesso!");
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao resetar senha: " + error.message);
  }
});

// ROTA DE LOGIN
router.post("/login", controller.login);

// OUTRAS ROTAS (se existirem)
router.get("/", (req, res) => res.send("Rota usuário OK"));

module.exports = router;
