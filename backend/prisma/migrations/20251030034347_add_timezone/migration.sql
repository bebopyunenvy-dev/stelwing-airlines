/*
  Warnings:

  - Added the required column `end_timezone` to the `plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_timezone` to the `plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `plan` ADD COLUMN `end_timezone` VARCHAR(191) NOT NULL,
    ADD COLUMN `start_timezone` VARCHAR(191) NOT NULL;
