import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

interface PassengerData {
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiryDate: string;
  ageCategory: "ADULT" | "CHILD" | "INFANT";
  checkedBaggage: number;
  cabinBaggage: number;
  mealPreference: string;
  seatPreference: "WINDOW" | "MIDDLE" | "AISLE" | "NO_PREFERENCE";
  specialAssistance: string[];
  emergencyContactName: string;
  emergencyContactPhone: string;
  insurance: boolean;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { flightNumber, userId, passengers, totalPrice } = body as {
      flightNumber: string;
      userId: string;
      passengers: PassengerData[];
      totalPrice: number;
    };

    if (!flightNumber || !userId || !passengers || passengers.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const flight = await prisma.flight.findUnique({
      where: { flightNumber },
    });

    if (!flight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

    if (flight.availableSeats < passengers.length) {
      return NextResponse.json(
        {
          error: "Not enough seats available for this booking",
        },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const updatedFlight = await tx.flight.update({
        where: { flightNumber },
        data: {
          availableSeats: flight.availableSeats - passengers.length,
        },
      });

      const ticket = await tx.ticket.create({
        data: {
          flightNumber,
          userId,
          totalAmount: totalPrice,
          passengers: {
            create: passengers.map((passenger: PassengerData) => ({
              title: passenger.title,
              firstName: passenger.firstName,
              lastName: passenger.lastName,
              dateOfBirth: new Date(passenger.dateOfBirth),
              nationality: passenger.nationality,
              passportNumber: passenger.passportNumber,
              passportExpiryDate: new Date(passenger.passportExpiryDate),
              ageCategory: passenger.ageCategory,
              checkedBaggage: passenger.checkedBaggage,
              cabinBaggage: passenger.cabinBaggage,
              mealPreference: passenger.mealPreference,
              seatPreference: passenger.seatPreference,
              specialAssistance: passenger.specialAssistance,
              emergencyContactName: passenger.emergencyContactName,
              emergencyContactPhone: passenger.emergencyContactPhone,
              insurance: passenger.insurance,
            })),
          },
        },
        include: {
          passengers: true,
          user: true,
          flight: true,
        },
      });

      return ticket;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json(
      {
        error: "Failed to create ticket",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const tickets = await prisma.ticket.findMany({
      where: {
        userId: userId,
      },
      include: {
        passengers: true,
      },
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}
