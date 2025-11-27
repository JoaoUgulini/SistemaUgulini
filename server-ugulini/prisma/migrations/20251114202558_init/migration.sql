-- CreateTable
CREATE TABLE `usuario` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome_sobrenome` VARCHAR(255) NOT NULL,
    `cpf` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `admin` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `endereco` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(8) NULL,
    `logradouro` VARCHAR(255) NULL,
    `numero` VARCHAR(10) NULL,
    `complemento` VARCHAR(255) NULL,
    `bairro` VARCHAR(100) NULL,
    `cidade` VARCHAR(100) NULL,
    `estado` CHAR(2) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imovel` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `valor` DECIMAL(12, 2) NULL,
    `nome_sobrenome` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(15) NULL,
    `tipo` VARCHAR(55) NULL,
    `finalidade` VARCHAR(55) NULL,
    `status_imovel` VARCHAR(55) NULL,
    `medida_frente` DECIMAL(10, 2) NULL,
    `medida_lateral` DECIMAL(10, 2) NULL,
    `area_total` DECIMAL(10, 2) NULL,
    `quartos` INTEGER NULL,
    `banheiros` INTEGER NULL,
    `vagas_garagem` INTEGER NULL,
    `descricao` TEXT NULL,
    `data_cadastro` DATE NULL,
    `id_endereco` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fotos_imovel` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `path_foto` VARCHAR(255) NULL,
    `id_imovel` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `imovel` ADD CONSTRAINT `imovel_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `endereco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fotos_imovel` ADD CONSTRAINT `fotos_imovel_id_imovel_fkey` FOREIGN KEY (`id_imovel`) REFERENCES `imovel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
