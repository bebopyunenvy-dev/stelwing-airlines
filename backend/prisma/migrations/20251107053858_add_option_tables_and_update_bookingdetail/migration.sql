/*
  Warnings:

  - You are about to drop the column `meal_code` on the `booking_details` table. All the data in the column will be lost.
  - You are about to drop the column `seat_number` on the `booking_details` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `booking_details` DROP COLUMN `meal_code`,
    DROP COLUMN `seat_number`,
    ADD COLUMN `baggage_id` BIGINT NULL,
    ADD COLUMN `meal_id` BIGINT NULL,
    ADD COLUMN `seat_id` BIGINT NULL;

-- CreateTable
CREATE TABLE `seat_options` (
    `seat_id` BIGINT NOT NULL AUTO_INCREMENT,
    `flight_id` BIGINT NOT NULL,
    `seat_number` VARCHAR(5) NOT NULL,
    `cabin_class` VARCHAR(191) NOT NULL,
    `is_available` BOOLEAN NOT NULL DEFAULT true,
    `seat_fee` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `seat_options_flight_id_seat_number_key`(`flight_id`, `seat_number`),
    PRIMARY KEY (`seat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `baggage_options` (
    `baggage_id` BIGINT NOT NULL AUTO_INCREMENT,
    `weight_kg` INTEGER NOT NULL,
    `fee` INTEGER NOT NULL,
    `currency` CHAR(3) NOT NULL DEFAULT 'TWD',

    UNIQUE INDEX `baggage_options_weight_kg_currency_key`(`weight_kg`, `currency`),
    PRIMARY KEY (`baggage_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meal_options` (
    `meal_id` BIGINT NOT NULL AUTO_INCREMENT,
    `meal_code` VARCHAR(10) NOT NULL,
    `meal_name` VARCHAR(100) NOT NULL,
    `meal_type` VARCHAR(30) NULL,
    `meal_fee` INTEGER NOT NULL DEFAULT 0,
    `currency` CHAR(3) NOT NULL DEFAULT 'TWD',
    `meal_image_path` VARCHAR(255) NULL,

    UNIQUE INDEX `meal_options_meal_code_key`(`meal_code`),
    PRIMARY KEY (`meal_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `booking_details_seat_id_idx` ON `booking_details`(`seat_id`);

-- CreateIndex
CREATE INDEX `booking_details_meal_id_idx` ON `booking_details`(`meal_id`);

-- CreateIndex
CREATE INDEX `booking_details_baggage_id_idx` ON `booking_details`(`baggage_id`);

-- AddForeignKey
ALTER TABLE `booking_details` ADD CONSTRAINT `booking_details_seat_id_fkey` FOREIGN KEY (`seat_id`) REFERENCES `seat_options`(`seat_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_details` ADD CONSTRAINT `booking_details_meal_id_fkey` FOREIGN KEY (`meal_id`) REFERENCES `meal_options`(`meal_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_details` ADD CONSTRAINT `booking_details_baggage_id_fkey` FOREIGN KEY (`baggage_id`) REFERENCES `baggage_options`(`baggage_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `seat_options` ADD CONSTRAINT `seat_options_flight_id_fkey` FOREIGN KEY (`flight_id`) REFERENCES `flights`(`flight_id`) ON DELETE CASCADE ON UPDATE CASCADE;
