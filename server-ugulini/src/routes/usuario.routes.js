const { Router } = require("express");
const controller = require("../controllers/usuario.controller");
const auth = require("../middlewares/auth");

const router = Router();

//router.post("/login", controller.login); 
router.get("/login", (req, res) => {
  res.send("A rota /usuario/login está funcionando, mas use POST para logar.");
});

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


module.exports = router;
