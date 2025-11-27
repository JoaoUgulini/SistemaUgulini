const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async login(cpf, password) {
    try {
      const user = await prisma.usuario.findFirst({
        where: { cpf: cpf },
      });

      if (!user) {
        return { ok: false, error: "Usuário não encontrado" };
      }

      const senhaOk = await bcrypt.compare(password, user.senha);

      if (!senhaOk) {
        return { ok: false, error: "Senha incorreta" };
      }

      const token = jwt.sign(
        {
          id: user.id,
          nome: user.nome_sobrenome,
          admin: user.admin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
      );

      return {
        ok: true,
        token,
        user: {
          id: user.id,
          nome: user.nome_sobrenome,
          admin: user.admin,
        },
      };
    } catch (error) {
      console.error("Erro no usuario.service.login:", error);
      throw error;
    }
  },
};
