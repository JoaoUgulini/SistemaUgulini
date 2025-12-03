const { Router } = require("express");
const controller = require("../controllers/imovel.controller");
const upload = require("../config/multer");
const router = Router();

/**
 * 🔧 ROTAS DE AJUSTE — SEMPRE NO TOPO
 */
router.get("/ajustar/banheiro-para-banheiros", async (req, res) => {
  try {
    const { PrismaClient } = require("@prisma/client");
    const prisma = new PrismaClient();

    await prisma.$executeRawUnsafe(`
      ALTER TABLE imovel
      CHANGE COLUMN banheiro banheiros INT NULL;
    `);

    res.send("Coluna renomeada!");
  } catch (err) {
    res.status(500).send("Erro: " + err.message);
  }
});

/**
 * 🔥 ROTA TEMPORÁRIA PARA DELETAR IMÓVEL POR ID
 */
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

/**
 * 🌎 ROTAS DE LISTAGEM/FILTRO
 */
router.get("/cidades", controller.getCidades);
router.get("/bairros", controller.getBairros);
router.get("/filter", controller.filter);

/**
 * 🖼️ ROTAS DE CRIAÇÃO/EDIÇÃO — AQUI VAI A CORREÇÃO DO NOME "photos"
 * O FRONT ENVIA "photos", ENTÃO O MULTER TEM QUE RECEBER "photos"
 */
router.post("/", upload.array("fotos", 15), controller.create);
router.put("/:id", upload.array("fotos", 15), controller.update);

/**
 * 🔍 ROTA DE LISTAR TODOS
 */
router.get("/", controller.list);

/**
 * 🚨 SEMPRE POR ÚLTIMO — ROTA DINÂMICA
 */
router.get("/:id", controller.getById);

module.exports = router;
