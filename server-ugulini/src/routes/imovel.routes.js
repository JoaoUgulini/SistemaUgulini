const { Router } = require("express");
const controller = require("../controllers/imovel.controller");
const upload = require("../config/multer");
const router = Router();

// Rota TEMPORÁRIA para deletar um imóvel por ID 
router.get("/deletar/:id", async (req, res) => {
  try {
    const { PrismaClient } = require("@prisma/client");
    const prisma = new PrismaClient();

    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).send("ID inválido.");
    }

    await prisma.fotos.deleteMany({ where: { id_imovel: id } });

    const deletado = await prisma.imovel.delete({ where: { id } });

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

router.post("/", upload.array("fotos", 15), controller.create);
router.put("/:id", upload.array("fotos", 15), controller.update);

router.get("/", controller.list);

router.get("/:id", controller.getById);

module.exports = router;
