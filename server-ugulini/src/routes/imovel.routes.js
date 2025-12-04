const { Router } = require("express");
const controller = require("../controllers/imovel.controller");
const upload = require("../config/multer");
const router = Router();

router.get("/cidades", controller.getCidades);
router.get("/bairros", controller.getBairros);
router.get("/filter", controller.filter);

router.post("/", upload.array("fotos", 15), controller.create);
router.put("/:id", upload.array("fotos", 15), controller.update);
router.patch("/inativar/:id", controller.inativar);

router.get("/", controller.list);

router.get("/:id", controller.getById);

module.exports = router;
