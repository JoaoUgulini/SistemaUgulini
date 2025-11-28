// src/services/imovel.service.js
const { PrismaClient, Prisma } = require("@prisma/client");
const r2 = require("../config/r2");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");
const prisma = new PrismaClient();

function gerarNomeArquivo(originalname) {
  const ext = originalname.split(".").pop();
  const nome = crypto.randomBytes(16).toString("hex");
  return `${nome}.${ext}`;
}

module.exports = {
  // ===============================
  // LISTAR TODOS
  // ===============================
  async list() {
    try {
      return await prisma.imovel.findMany({
        include: {
          endereco: true,
          fotos: true,
        },
      });
    } catch (error) {
      console.error("Erro no service.list():", error);
      throw error;
    }
  },

  // ===============================
  // BUSCAR POR ID
  // ===============================
  async getById(id) {
    try {
      return await prisma.imovel.findUnique({
        where: { id: BigInt(id) },
        include: {
          endereco: true,
          fotos: true,
        },
      });
    } catch (error) {
      console.error("Erro no service.getById():", error);
      throw error;
    }
  },

  // ===============================
  // CRIAR IMÓVEL
  // ===============================
  async create(data, files = []) {
    try {
      const endereco = await prisma.endereco.create({
        data: {
          cep: data.cep || null,
          logradouro: data.logradouro,
          numero: data.numero || null,
          complemento: data.complemento || null,
          bairro: data.bairro,
          cidade: data.cidade,
          estado: data.estado,
        },
      });

      const imovel = await prisma.imovel.create({
        data: {
          valor: data.valor ? new Prisma.Decimal(data.valor) : null,

          nome_sobrenome_prop: data.nome_sobrenome_prop || null,
          telefone_prop: data.telefone_prop || null,

          tipo: data.tipo,
          finalidade: data.finalidade,
          status_imovel: data.status_imovel || "Disponível",

          medida_frente: data.medida_frente
            ? new Prisma.Decimal(data.medida_frente)
            : null,
          medida_lateral: data.medida_lateral
            ? new Prisma.Decimal(data.medida_lateral)
            : null,
          area_total: data.area_total
            ? new Prisma.Decimal(data.area_total)
            : null,

          quartos: data.quartos ? Number(data.quartos) : null,
          banheiros: data.banheiros ? Number(data.banheiros) : null,
          vagas_garagem: data.vagas_garagem ? Number(data.vagas_garagem) : null,

          descricao: data.descricao || null,

          id_endereco: endereco.id,
        },
      });

      if (files && files.length > 0) {
        const uploads = [];

        for (const file of files) {
          const nomeArquivo = gerarNomeArquivo(file.originalname);

          await r2.send(
            new PutObjectCommand({
              Bucket: process.env.CF_R2_BUCKET,
              Key: nomeArquivo,
              Body: file.buffer,
              ContentType: file.mimetype,
            })
          );

          uploads.push({
            id_imovel: imovel.id,
            path_foto: `${process.env.CF_R2_PUBLIC_URL}/${nomeArquivo}`,
          });
        }

        await prisma.fotos.createMany({ data: uploads });
      }

      return await prisma.imovel.findUnique({
        where: { id: imovel.id },
        include: { endereco: true, fotos: true },
      });
    } catch (error) {
      console.error("Erro no service.create:", error);
      throw error;
    }
  },

  // ===============================
  // ATUALIZAR IMÓVEL
  // ===============================
  async update(id, data, files = []) {
    try {
      const imovelExistente = await prisma.imovel.findUnique({
        where: { id: BigInt(id) },
      });

      if (!imovelExistente) throw new Error("Imóvel não encontrado");

      await prisma.endereco.update({
        where: { id: imovelExistente.id_endereco },
        data: {
          cep: data.cep || null,
          logradouro: data.logradouro,
          numero: data.numero || null,
          complemento: data.complemento || null,
          bairro: data.bairro,
          cidade: data.cidade,
          estado: data.estado,
        },
      });

      await prisma.imovel.update({
        where: { id: BigInt(id) },
        data: {
          valor: data.valor ? new Prisma.Decimal(data.valor) : null,

          nome_sobrenome_prop: data.nome_sobrenome_prop || null,
          telefone_prop: data.telefone_prop || null,

          tipo: data.tipo,
          finalidade: data.finalidade,
          status_imovel: data.status_imovel,

          medida_frente: data.medida_frente
            ? new Prisma.Decimal(data.medida_frente)
            : null,
          medida_lateral: data.medida_lateral
            ? new Prisma.Decimal(data.medida_lateral)
            : null,
          area_total: data.area_total
            ? new Prisma.Decimal(data.area_total)
            : null,

          quartos: data.quartos ? Number(data.quartos) : null,
          banheiros: data.banheiros ? Number(data.banheiros) : null,
          vagas_garagem: data.vagas_garagem ? Number(data.vagas_garagem) : null,

          descricao: data.descricao,
        },
      });

      if (files && files.length > 0) {
        const uploads = [];

        for (const file of files) {
          const nomeArquivo = gerarNomeArquivo(file.originalname);

          await r2.send(
            new PutObjectCommand({
              Bucket: process.env.CF_R2_BUCKET,
              Key: nomeArquivo,
              Body: file.buffer,
              ContentType: file.mimetype,
            })
          );

          uploads.push({
            id_imovel: BigInt(id),
            path_foto: `${process.env.CF_R2_PUBLIC_URL}/${nomeArquivo}`,
          });
        }

        await prisma.fotos.createMany({ data: uploads });
      }

      return await prisma.imovel.findUnique({
        where: { id: BigInt(id) },
        include: { endereco: true, fotos: true },
      });
    } catch (error) {
      console.error("Erro no service.update:", error);
      throw error;
    }
  },

  // ===============================
  // FILTRAR IMÓVEIS
  // ===============================
  async filter(f) {
    const where = { AND: [] };

    const valid = (v) =>
      v !== undefined && v !== null && String(v).trim() !== "" && v !== "all";

    if (valid(f.cidade)) {
      where.AND.push({
        endereco: { is: { cidade: f.cidade } },
      });
    }

    if (valid(f.bairro)) {
      where.AND.push({
        endereco: { is: { bairro: f.bairro } },
      });
    }

    if (valid(f.negocio)) {
      where.AND.push({ finalidade: f.negocio.toLowerCase() });
    }

    if (valid(f.tipoImovel)) {
      where.AND.push({ tipo: f.tipoImovel.toLowerCase() });
    }

    if (valid(f.quartos)) {
      where.AND.push({ quartos: { gte: Number(f.quartos) } });
    }

    if (valid(f.banheiros)) {
      where.AND.push({ banheiros: { gte: Number(f.banheiros) } });
    }

    if (valid(f.vagas)) {
      where.AND.push({ vagas_garagem: { gte: Number(f.vagas) } });
    }

    if (valid(f.area)) {
      if (f.area.includes("-")) {
        const [min, max] = f.area.split("-");
        where.AND.push({
          area_total: {
            gte: new Prisma.Decimal(min),
            lte: new Prisma.Decimal(max),
          },
        });
      } else {
        const min = f.area.replace("+", "");
        where.AND.push({
          area_total: { gte: new Prisma.Decimal(min) },
        });
      }
    }

    return prisma.imovel.findMany({
      where,
      include: { endereco: true, fotos: true },
    });
  },

  // ===============================
  // LISTAR CIDADES
  // ===============================
  async getCidades() {
    return prisma.endereco.findMany({
      distinct: ["cidade"],
      select: { cidade: true },
      where: { cidade: { not: null } },
    });
  },

  // ===============================
  // LISTAR BAIRROS
  // ===============================
  async getBairros(cidade) {
    return prisma.endereco.findMany({
      distinct: ["bairro"],
      select: { bairro: true },
      where: {
        AND: [{ cidade: { equals: cidade } }, { bairro: { not: null } }],
      },
    });
  },
};
