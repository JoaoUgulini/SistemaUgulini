const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuario.controller");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/login", controller.login);

router.get("/", (req, res) => res.send("Rota usuário OK"));

module.exports = router;
