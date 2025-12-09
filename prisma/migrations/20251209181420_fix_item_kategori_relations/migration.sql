/*
  Warnings:

  - You are about to drop the `itemcategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `itemcategory` DROP FOREIGN KEY `ItemCategory_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `itemcategory` DROP FOREIGN KEY `ItemCategory_itemId_fkey`;

-- DropTable
DROP TABLE `itemcategory`;
