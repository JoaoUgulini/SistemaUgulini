// src/routes/imovel.routes.js
const { Router } = require("express");
const controller = require("../controllers/imovel.controller");
const upload = require("../config/multer");

const router = Router();

router.get("/cidades", controller.getCidades);
router.get("/bairros", controller.getBairros);

router.get("/filter", controller.filter);
router.get("/", controller.list);
router.get("/:id", controller.getById);

router.post("/", upload.array("photos", 15), controller.create);

router.put("/:id", upload.array("photos", 15), controller.update);

module.exports = router;
