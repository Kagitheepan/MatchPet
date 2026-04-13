/*
  Warnings:

  - You are about to drop the column `isHousetrained` on the `animal` table. All the data in the column will be lost.
  - You are about to drop the column `isMixedBreed` on the `animal` table. All the data in the column will be lost.
  - You are about to drop the column `isSpayedNeutered` on the `animal` table. All the data in the column will be lost.
  - You are about to drop the column `isVaccinated` on the `animal` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `animal` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `refuge` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email_refuge]` on the table `Refuge` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email_refuge` to the `Refuge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `animal` DROP COLUMN `isHousetrained`,
    DROP COLUMN `isMixedBreed`,
    DROP COLUMN `isSpayedNeutered`,
    DROP COLUMN `isVaccinated`,
    DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `refuge` DROP COLUMN `email`,
    ADD COLUMN `email_refuge` VARCHAR(191) NOT NULL,
    ADD COLUMN `isVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `verificationCode` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `userprofile` ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    MODIFY `location` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Adoption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `animalExternalId` VARCHAR(191) NOT NULL,
    `animalName` VARCHAR(191) NOT NULL,
    `animalImage` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Refuge_email_refuge_key` ON `Refuge`(`email_refuge`);

-- AddForeignKey
ALTER TABLE `Adoption` ADD CONSTRAINT `Adoption_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
