-- DropForeignKey
ALTER TABLE `adoption` DROP FOREIGN KEY `Adoption_userId_fkey`;

-- DropForeignKey
ALTER TABLE `animal` DROP FOREIGN KEY `Animal_refugeId_fkey`;

-- DropIndex
DROP INDEX `Adoption_userId_fkey` ON `adoption`;

-- DropIndex
DROP INDEX `Animal_refugeId_fkey` ON `animal`;

-- AlterTable
ALTER TABLE `adoption` ADD COLUMN `hasUnreadRefuge` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `hasUnreadUser` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `refugeId` INTEGER NULL;

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

-- AddForeignKey
ALTER TABLE `Adoption` ADD CONSTRAINT `Adoption_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adoption` ADD CONSTRAINT `Adoption_refugeId_fkey` FOREIGN KEY (`refugeId`) REFERENCES `Refuge`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_adoptionId_fkey` FOREIGN KEY (`adoptionId`) REFERENCES `Adoption`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Animal` ADD CONSTRAINT `Animal_refugeId_fkey` FOREIGN KEY (`refugeId`) REFERENCES `Refuge`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
