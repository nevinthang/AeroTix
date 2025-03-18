-- CreateEnum
CREATE TYPE "AgeCategory" AS ENUM ('ADULT', 'CHILD', 'INFANT');

-- CreateEnum
CREATE TYPE "SeatPreference" AS ENUM ('WINDOW', 'MIDDLE', 'AISLE', 'NO_PREFERENCE');

-- CreateTable
CREATE TABLE "Passenger" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "nationality" TEXT NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "passportExpiryDate" TIMESTAMP(3) NOT NULL,
    "ageCategory" "AgeCategory" NOT NULL,
    "checkedBaggage" INTEGER NOT NULL,
    "cabinBaggage" INTEGER NOT NULL,
    "mealPreference" TEXT NOT NULL,
    "seatPreference" "SeatPreference" NOT NULL,
    "specialAssistance" TEXT[],
    "emergencyContactName" TEXT NOT NULL,
    "emergencyContactPhone" TEXT NOT NULL,
    "insurance" BOOLEAN NOT NULL,
    "ticketNumber" TEXT NOT NULL,

    CONSTRAINT "Passenger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_passportNumber_key" ON "Passenger"("passportNumber");

-- AddForeignKey
ALTER TABLE "Passenger" ADD CONSTRAINT "Passenger_ticketNumber_fkey" FOREIGN KEY ("ticketNumber") REFERENCES "Ticket"("ticketNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
