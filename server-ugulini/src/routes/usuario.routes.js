const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuario.controller");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/alterarTabela", async (req, res) => {
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE imovel CHANGE COLUMN venda valor DECIMAL(10,2)`);

    res.send("Tabela imovel atualizada com sucesso!");
  } catch (err) {
    res.status(500).send("Erro ao alterar tabela: " + err.message);
  }
});

// ROTA DE LOGIN
router.post("/login", controller.login);

// OUTRAS ROTAS (se existirem)
router.get("/", (req, res) => res.send("Rota usuário OK"));

module.exports = router;
