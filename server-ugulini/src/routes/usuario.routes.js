const { Router } = require("express");
const controller = require("../controllers/usuario.controller");
const auth = require("../middlewares/auth");

const router = Router();

router.post("/login", controller.login); 


router.get("/testdb", async (req, res) => {
  try {
    const { PrismaClient } = require("@prisma/client");
    const prisma = new PrismaClient();

    const users = await prisma.usuario.findMany();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

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


module.exports = router;
