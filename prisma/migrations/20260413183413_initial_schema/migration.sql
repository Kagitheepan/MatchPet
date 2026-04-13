-- CreateTable
CREATE TABLE `UserProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
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
CREATE TABLE `Adoption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `animalExternalId` VARCHAR(191) NOT NULL,
    `animalName` VARCHAR(191) NOT NULL,
    `animalImage` VARCHAR(191) NULL,
    `refugeId` INTEGER NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `hasUnreadUser` BOOLEAN NOT NULL DEFAULT false,
    `hasUnreadRefuge` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adoptionId` INTEGER NOT NULL,
    `senderType` ENUM('USER', 'REFUGE') NOT NULL,
    `senderId` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Message_adoptionId_idx`(`adoptionId`),
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
    `email_refuge` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `verificationCode` VARCHAR(191) NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Refuge_email_refuge_key`(`email_refuge`),
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
ALTER TABLE `Adoption` ADD CONSTRAINT `Adoption_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adoption` ADD CONSTRAINT `Adoption_refugeId_fkey` FOREIGN KEY (`refugeId`) REFERENCES `Refuge`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_adoptionId_fkey` FOREIGN KEY (`adoptionId`) REFERENCES `Adoption`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Animal` ADD CONSTRAINT `Animal_refugeId_fkey` FOREIGN KEY (`refugeId`) REFERENCES `Refuge`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
