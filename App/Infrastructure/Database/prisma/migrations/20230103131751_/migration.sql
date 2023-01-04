/*
  Warnings:

  - The primary key for the `Todo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Todo` DROP FOREIGN KEY `Todo_userId_fkey`;

-- AlterTable
ALTER TABLE `Todo` DROP PRIMARY KEY,
    MODIFY `todoId` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`todoId`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userId`);

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
