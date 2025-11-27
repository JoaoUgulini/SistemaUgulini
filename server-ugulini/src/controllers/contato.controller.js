const { enviarEmailContato } = require("../services/email.service");

exports.receberContato = async (req, res) => {
  try {
    await enviarEmailContato(req.body);
    res.json({ sucesso: true });
  } catch (erro) {
    console.error("Erro ao enviar e-mail:", erro);
    res.status(500).json({ sucesso: false });
  }
};
