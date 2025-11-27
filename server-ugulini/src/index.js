const express = require("express");
const cors = require("cors");
const path = require("path");

require("./middlewares/bigint.js");
require("dotenv").config();

const imovelRoutes = require("./routes/imovel.routes.js");
const contatoRoutes = require("./routes/contato.routes.js");
const usuarioRoutes = require("./routes/usuario.routes.js");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API rodando"));

app.use("/imoveis", imovelRoutes);
app.use("/contato", contatoRoutes);
app.use("/usuario", usuarioRoutes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.listen(3001, () => console.log("Server running on port 3001"));
