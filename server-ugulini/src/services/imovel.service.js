const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const r2 = require("../config/r2");
const { PutObjectCommand } = require("@aws-sdk/client-s3");


module.exports = {
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
          valor: new Prisma.Decimal(data.valor),

          nome_sobrenome_prop: data.nome_sobrenome_prop,
          telefone_prop: data.telefone-prop,

          tipo: data.tipo,
          finalidade: data.finalidade,
          status_imovel: data.status_imovel || "Disponível",
          medida_frente: data.medida_frente ? new Prisma.Decimal(data.medida_frente) : null,
          medida_lateral: data.medida_lateral ? new Prisma.Decimal(data.medida_lateral) : null,
          area_total: data.area_total ? new Prisma.Decimal(data.area_total) : null,
          quartos: Number(data.quartos) || 0,
          banheiros: Number(data.banheiros) || 0,
          vagas_garagem: Number(data.vagas_garagem) || 0,
          descricao: data.descricao || null,
          id_endereco: endereco.id,
        },
      });

      if (files && files.length > 0) {
  const fotosURLs = [];

  for (const file of files) {
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}-${file.originalname.replace(/\s+/g, "-")}`;

    await r2.send(new PutObjectCommand({
      Bucket: process.env.CF_R2_BUCKET,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));

    const publicUrl = `${process.env.CF_R2_PUBLIC_URL}/${fileName}`;
    fotosURLs.push(publicUrl);
  }

  await prisma.fotos.createMany({
    data: fotosURLs.map((url) => ({
      id_imovel: imovel.id,
      path_foto: url,
    })),
  });
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
          valor: new Prisma.Decimal(data.valor),

          nome_sobrenome_prop: data.nome_sobrenome_prop,
          telefone_prop: data.telefone_prop,

          tipo: data.tipo,
          finalidade: data.finalidade,
          status_imovel: data.status_imovel,
          medida_frente: data.medida_frente ? new Prisma.Decimal(data.medida_frente) : null,
          medida_lateral: data.medida_lateral ? new Prisma.Decimal(data.medida_lateral) : null,
          area_total: data.area_total ? new Prisma.Decimal(data.area_total) : null,
          quartos: Number(data.quartos),
          banheiros: Number(data.banheiros),
          vagas_garagem: Number(data.vagas_garagem),
          descricao: data.descricao,
        },
      });

      if (files && files.length > 0) {
  const fotosURLs = [];

  for (const file of files) {
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}-${file.originalname.replace(/\s+/g, "-")}`;

    await r2.send(new PutObjectCommand({
      Bucket: process.env.CF_R2_BUCKET,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));

    const publicUrl = `${process.env.CF_R2_PUBLIC_URL}/${fileName}`;
    fotosURLs.push(publicUrl);
  }

  await prisma.fotos.createMany({
    data: fotosURLs.map((url) => ({
      id_imovel: BigInt(id),
      path_foto: url,
    })),
  });
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

  async filter(f) {
    const where = { AND: [] };

    const isValid = (v) =>
      v !== undefined && v !== null && String(v).trim() !== "" && v !== "all";

    if (isValid(f.cidade)) {
      where.AND.push({
        endereco: { is: { cidade: f.cidade } },
      });
    }

    if (isValid(f.bairro)) {
      where.AND.push({
        endereco: { is: { bairro: f.bairro } },
      });
    }

    if (isValid(f.negocio)) {
      where.AND.push({
        finalidade: f.negocio.toLowerCase(),
      });
    }

    if (isValid(f.tipoImovel)) {
      where.AND.push({
        tipo: f.tipoImovel.toLowerCase(),
      });
    }

    if (isValid(f.quartos)) {
      where.AND.push({
        quartos: { gte: Number(f.quartos) },
      });
    }

    if (isValid(f.banheiros)) {
      where.AND.push({
        banheiros: { gte: Number(f.banheiros) },
      });
    }

    if (isValid(f.vagas)) {
      where.AND.push({
        vagas_garagem: { gte: Number(f.vagas) },
      });
    }

    if (isValid(f.area)) {
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
      include: {
        endereco: true,
        fotos: true,
      },
    });
  },

  async getCidades() {
    return prisma.endereco.findMany({
      distinct: ["cidade"],
      select: { cidade: true },
      where: { cidade: { not: null } },
    });
  },

  async getBairros(cidade) {
    return prisma.endereco.findMany({
      distinct: ["bairro"],
      select: { bairro: true },
      where: {
        AND: [
          { cidade: { equals: cidade } },
          { bairro: { not: null } },
        ],
      },
    });
  },
};
