-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST_CLASS');

-- CreateEnum
CREATE TYPE "Title" AS ENUM ('MR', 'MS', 'MRS');

-- CreateTable
CREATE TABLE "Flight" (
    "flightNumber" TEXT NOT NULL,
    "departure" TEXT NOT NULL,
    "departureCode" TEXT NOT NULL,
    "arrival" TEXT NOT NULL,
    "arrivalCode" TEXT NOT NULL,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "departureHour" TIMESTAMP(3) NOT NULL,
    "duration" TIMESTAMP(3) NOT NULL,
    "arrivalDate" TIMESTAMP(3) NOT NULL,
    "arrivalHour" TIMESTAMP(3) NOT NULL,
    "airline" TEXT NOT NULL,
    "aircraft" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "seatCapacity" INTEGER NOT NULL,
    "availableSeats" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("flightNumber")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "ticketNumber" TEXT NOT NULL,
    "flightNumber" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticketNumber")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" "Title" NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "passport" TEXT,
    "passport_exp" TIMESTAMP(3),
    "loyaltyPoints" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_passport_key" ON "User"("passport");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_flightNumber_fkey" FOREIGN KEY ("flightNumber") REFERENCES "Flight"("flightNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
