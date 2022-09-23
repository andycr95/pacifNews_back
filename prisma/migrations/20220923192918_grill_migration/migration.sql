/*
  Warnings:

  - You are about to alter the column `title` on the `Article` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(191)`.
  - You are about to alter the column `urlToImage` on the `Article` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Article` MODIFY `title` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `urlToImage` VARCHAR(191) NULL,
    MODIFY `content` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Grill` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `urlToFile` VARCHAR(500) NULL,
    `publishedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
