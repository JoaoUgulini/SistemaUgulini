// src/routes/imovel.routes.js
const { Router } = require("express");
const controller = require("../controllers/imovel.controller");
const upload = require("../config/multer");

const router = Router();

// ROTA TEMPORÁRIA – AJUSTAR TABELA IMOVEL (REMOVER DEPOIS)
router.get("/ajustarCampos", async (req, res) => {
  try {
    const { PrismaClient } = require("@prisma/client");
    const prisma = new PrismaClient();

    await prisma.$executeRawUnsafe(`
      ALTER TABLE imovel 
      CHANGE COLUMN nome_sobrenome_prop nome_sobrenome VARCHAR(255)
    `);

    await prisma.$executeRawUnsafe(`
      ALTER TABLE imovel 
      CHANGE COLUMN telefone_prop telefone VARCHAR(255)
    `);

    res.send("Tabela imovel atualizada com sucesso!");

  } catch (err) {
    res.status(500).send("Erro ao atualizar tabela: " + err.message);
  }
});


router.get("/cidades", controller.getCidades);
router.get("/bairros", controller.getBairros);

router.get("/filter", controller.filter);
router.get("/", controller.list);
router.get("/:id", controller.getById);

router.post("/", upload.array("photos", 15), controller.create);

router.put("/:id", upload.array("photos", 15), controller.update);

module.exports = router;
