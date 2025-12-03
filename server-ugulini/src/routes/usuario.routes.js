const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuario.controller");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/criarAdmin", async (req, res) => {
  try {
    const { PrismaClient } = require("@prisma/client");
    const prisma = new PrismaClient();

    const cpf = "11122233344";

    // verifica se já existe
    const existente = await prisma.usuario.findFirst({
      where: { cpf }
    });

    if (existente) {
      return res.send("Usuário já existe na base de dados.");
    }

    const novo = await prisma.usuario.create({
      data: {
        nome_sobrenome: "Administrador do Sistema",
        cpf: cpf,
        senha: "$2a$10$I7/a67bGnokKsHzqVdGVteqqJOmFVsjf3ABrRppO7VyVUwfEYzzLG",
        admin: true,
        data_cadastro: new Date()
      }
    });

    res.send("Administrador criado com sucesso! ID: " + novo.id);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar administrador: " + error.message);
  }
});

router.post("/login", controller.login);

router.get("/", (req, res) => res.send("Rota usuário OK"));

module.exports = router;
