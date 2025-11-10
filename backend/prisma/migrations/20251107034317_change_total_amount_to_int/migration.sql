/*
  Warnings:

  - You are about to alter the column `total_amount` on the `bookings` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Int`.

*/
-- AlterTable
ALTER TABLE `bookings` MODIFY `total_amount` INTEGER NOT NULL;
