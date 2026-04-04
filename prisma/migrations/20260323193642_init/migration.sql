-- CreateTable
CREATE TABLE `UserProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `location` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `searchRadius` INTEGER NOT NULL DEFAULT 30,
    `hasGarden` BOOLEAN NOT NULL DEFAULT false,
    `hasChildren` BOOLEAN NOT NULL DEFAULT false,
    `hasOtherPets` BOOLEAN NOT NULL DEFAULT false,
    `timeFree` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserProfile_email_key`(`email`),
    INDEX `UserProfile_latitude_longitude_idx`(`latitude`, `longitude`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Refuge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `postalCode` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Refuge_latitude_longitude_idx`(`latitude`, `longitude`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Animal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `externalId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `species` VARCHAR(191) NOT NULL,
    `breed` VARCHAR(191) NULL,
    `age` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `size` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `photos` JSON NULL,
    `goodWithChildren` BOOLEAN NOT NULL DEFAULT false,
    `goodWithDogs` BOOLEAN NOT NULL DEFAULT false,
    `goodWithCats` BOOLEAN NOT NULL DEFAULT false,
    `needsGarden` BOOLEAN NOT NULL DEFAULT false,
    `energyLevel` VARCHAR(191) NULL,
    `refugeId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Animal_externalId_key`(`externalId`),
    INDEX `Animal_species_breed_idx`(`species`, `breed`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Animal` ADD CONSTRAINT `Animal_refugeId_fkey` FOREIGN KEY (`refugeId`) REFERENCES `Refuge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
