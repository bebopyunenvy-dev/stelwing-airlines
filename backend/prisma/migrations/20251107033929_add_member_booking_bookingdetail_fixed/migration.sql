-- CreateTable
CREATE TABLE `members` (
    `member_id` BIGINT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `gender` ENUM('male', 'female', 'other') NOT NULL,
    `birth_date` DATETIME(3) NULL,
    `phone` VARCHAR(20) NOT NULL,
    `address` VARCHAR(255) NULL,
    `avatar_id` BIGINT NULL,
    `level` ENUM('basic', 'silver', 'gold', 'vip') NOT NULL DEFAULT 'basic',
    `points` INTEGER NOT NULL DEFAULT 0,
    `register_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_login` DATETIME(3) NULL,
    `status` ENUM('active', 'suspended', 'deleted') NOT NULL DEFAULT 'active',
    `remark` TEXT NULL,

    UNIQUE INDEX `members_email_key`(`email`),
    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookings` (
    `booking_id` BIGINT NOT NULL AUTO_INCREMENT,
    `pnr` VARCHAR(6) NOT NULL,
    `member_id` BIGINT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NULL,
    `nationality` CHAR(2) NULL,
    `passport_no` VARCHAR(191) NULL,
    `cabin_class` VARCHAR(191) NOT NULL,
    `currency` CHAR(3) NOT NULL,
    `total_amount` DECIMAL(10, 2) NOT NULL,
    `payment_status` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `bookings_pnr_key`(`pnr`),
    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking_details` (
    `detail_id` BIGINT NOT NULL AUTO_INCREMENT,
    `booking_id` BIGINT NOT NULL,
    `flight_id` BIGINT NOT NULL,
    `trip_type` VARCHAR(191) NULL,
    `seat_number` VARCHAR(5) NULL,
    `meal_code` VARCHAR(10) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `booking_details_booking_id_idx`(`booking_id`),
    INDEX `booking_details_flight_id_idx`(`flight_id`),
    PRIMARY KEY (`detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `members`(`member_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_details` ADD CONSTRAINT `booking_details_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`booking_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_details` ADD CONSTRAINT `booking_details_flight_id_fkey` FOREIGN KEY (`flight_id`) REFERENCES `flights`(`flight_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
