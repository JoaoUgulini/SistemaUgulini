const { Router } = require("express");
const controller = require("../controllers/usuario.controller");
const auth = require("../middlewares/auth");

const router = Router();

router.post("/login", controller.login); 

module.exports = router;
