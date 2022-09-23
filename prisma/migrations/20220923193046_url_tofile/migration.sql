/*
  Warnings:

  - You are about to alter the column `urlToFile` on the `Grill` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Grill` MODIFY `urlToFile` VARCHAR(191) NULL;
