const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuario.controller");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/resetarSenha", async (req, res) => {
  try {
    const hash = "$2a$10$guy/SZ8O3eDpz2zL9wyaVO11FfyiGyMX7QHL5EM6vJ1zQ./qjkHCq";

    await prisma.usuario.update({
      where: { id: 1 }, 
      data: { senha: hash }
    });

    res.send("Senha resetada com sucesso!");
  } catch (err) {
    res.status(500).send("Erro ao resetar senha: " + err.message);
  }
});

// ROTA DE LOGIN
router.post("/login", controller.login);

// OUTRAS ROTAS (se existirem)
router.get("/", (req, res) => res.send("Rota usuário OK"));

module.exports = router;
