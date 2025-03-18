/*
  Warnings:

  - Added the required column `totalAmount` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MembershipTier" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM');

-- DropIndex
DROP INDEX "Passenger_passportNumber_key";

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "totalAmount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "membershipTier" "MembershipTier" NOT NULL DEFAULT 'SILVER';
