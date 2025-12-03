const { Router } = require("express");
const controller = require("../controllers/imovel.controller");
const upload = require("../config/multer");

const router = Router();

router.get("/remove-unique-fotos", async (req, res) => {
  try {
    await prisma.$executeRawUnsafe(`
      ALTER TABLE fotos DROP INDEX fotos_imovel_id_imovel_fkey;
    `);

    return res.json({ message: "Índice UNIQUE removido com sucesso!" });
  } catch (error) {
    console.error("Erro ao remover UNIQUE:", error);
    return res.status(500).json({ error: "Falha ao remover UNIQUE", detalhes: error });
  }
});

router.get("/indexes", async (req, res) => {
  try {
    const indexes = await prisma.$queryRawUnsafe(`SHOW INDEXES FROM fotos;`);
    return res.json(indexes);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

// ROTA TEMPORÁRIA – DELETAR IMÓVEL POR ID (REMOVER DEPOIS)
router.get("/deletar/:id", async (req, res) => {
  try {
    const { PrismaClient } = require("@prisma/client");
    const prisma = new PrismaClient();

    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).send("ID inválido.");
    }

    // primeiro deleta fotos (se houver)
    await prisma.fotos.deleteMany({
      where: { id_imovel: id }
    });

    // deleta o imóvel
    const deletado = await prisma.imovel.delete({
      where: { id }
    });

    // tenta deletar endereço órfão (se ninguém mais usa)
    const count = await prisma.imovel.count({
      where: { id_endereco: deletado.id_endereco }
    });

    if (count === 0 && deletado.id_endereco) {
      await prisma.endereco.delete({
        where: { id: deletado.id_endereco }
      });
    }

    res.send(`Imóvel ID ${id} deletado com sucesso.`);

  } catch (err) {
    res.status(500).send("Erro ao deletar imóvel: " + err.message);
  }
});

router.get("/cidades", controller.getCidades);
router.get("/bairros", controller.getBairros);

router.get("/filter", controller.filter);
router.get("/", controller.list);
router.get("/:id", controller.getById);

router.post("/", upload.array("fotos", 15), controller.create);

router.put("/:id", upload.array("fotos", 15), controller.update);

module.exports = router;
