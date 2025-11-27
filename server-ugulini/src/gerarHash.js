const bcrypt = require("bcrypt");

async function gerarHash() {
  const hash = await bcrypt.hash("Contabil20", 10);
  console.log(hash);
}

gerarHash();
