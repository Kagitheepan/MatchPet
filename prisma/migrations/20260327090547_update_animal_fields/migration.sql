-- AlterTable
ALTER TABLE `Animal` ADD COLUMN `isHousetrained` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isMixedBreed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isSpayedNeutered` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isVaccinated` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'Available';
