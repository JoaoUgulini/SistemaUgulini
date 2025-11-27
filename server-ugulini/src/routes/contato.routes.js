const { Router } = require("express");
const controller = require("../controllers/contato.controller.js");

const router = Router();

router.post("/contato", controller.receberContato);

module.exports = router;
