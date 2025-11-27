const { Router } = require("express");
const controller = require("../controllers/usuario.controller");
const auth = require("../middlewares/auth");

const router = Router();

//router.post("/login", controller.login); 
router.get("/login", (req, res) => {
  res.send("A rota /usuario/login está funcionando, mas use POST para logar.");
});

module.exports = router;
