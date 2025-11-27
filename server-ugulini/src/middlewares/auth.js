const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ error: "Token inválido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      nome: decoded.nome,
      admin: decoded.admin,
    };

    next();
  } catch (error) {
    console.error("Erro no auth.js:", error);
    return res.status(401).json({ error: "Token expirado ou inválido" });
  }
};
