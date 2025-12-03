const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuario.controller");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/cadastrar", async (req, res) => {
  const nome_sobrenome = "Administrador do Sistema";
  const cpf = "11122233344";       // Login
  const senha = "TesteTCC123";     // Senha
  const admim = true;

  const hash = await bcrypt.hash(senha, 10);

  const usuario = await prisma.usuario.create({
    data: {
      nome_sobrenome,
      cpf,
      senha: hash,
      admim
    }
  });

  res.json(usuario);
});

router.post("/login", controller.login);

router.get("/", (req, res) => res.send("Rota usuário OK"));

module.exports = router;
