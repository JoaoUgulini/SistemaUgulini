const nodemailer = require("nodemailer");
require("dotenv").config();

exports.enviarEmailContato = async ({
  nome,
  email,
  telefone,
  assunto,
  mensagem,
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Site Imobiliária" <${process.env.EMAIL_USER}>`,
    to: "joaomiguelugulini@gmail.com",
    replyTo: email,
    subject: `Contato do Site: ${assunto}`,
    html: `
      <h2>Novo contato recebido</h2>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefone:</strong> ${telefone}</p>
      <p><strong>Assunto:</strong> ${assunto}</p>
      <p><strong>Mensagem:</strong><br/>${mensagem}</p>
    `,
  });
};
