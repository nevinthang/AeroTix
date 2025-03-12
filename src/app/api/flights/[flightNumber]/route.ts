import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  context: { params: { flightNumber?: string } } // Pastikan params ada di context
) {
  try {
    const { flightNumber } = await context.params; // Gunakan await untuk params

    if (!flightNumber) {
      return NextResponse.json(
        { error: "Missing flight number" },
        { status: 400 }
      );
    }

    const flight = await prisma.flight.findUnique({
      where: { flightNumber },
    });

    if (!flight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

    return NextResponse.json(flight);
  } catch (error) {
    console.error("Error fetching flight:", error);
    return NextResponse.json(
      { error: "Failed to fetch flight details" },
      { status: 500 }
    );
  }
}
