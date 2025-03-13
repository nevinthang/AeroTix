// api/flights/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

// GET all flights
export async function GET(
  _: Request,
  { params }: { params: { flightNumber?: string } }
) {
  try {
    // Check if we're requesting a specific flight by flightNumber
    const { flightNumber } = params || {};

    if (flightNumber) {
      // Get a specific flight
      const flight = await prisma.flight.findUnique({
        where: { flightNumber },
      });

      if (!flight) {
        return NextResponse.json(
          { error: "Flight not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(flight);
    } else {
      // Get all flights
      const flights = await prisma.flight.findMany({
        orderBy: {
          departureDate: "asc",
        },
      });

      return NextResponse.json(flights);
    }
  } catch (error) {
    console.error("Error fetching flights:", error);
    return NextResponse.json(
      { error: "Failed to fetch flights" },
      { status: 500 }
    );
  }
}

// CREATE a new flight
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    const flightData = await request.json();

    // Validate flight data
    if (
      !flightData.flightNumber ||
      !flightData.departureTime ||
      !flightData.arrivalTime
    ) {
      return NextResponse.json(
        { error: "Missing required flight information" },
        { status: 400 }
      );
    }

    // Check if flight already exists
    const existingFlight = await prisma.flight.findUnique({
      where: { flightNumber: flightData.flightNumber },
    });

    if (existingFlight) {
      return NextResponse.json(
        { error: "Flight with this number already exists" },
        { status: 409 }
      );
    }

    // Create the flight
    const flight = await prisma.flight.create({
      data: flightData,
    });

    return NextResponse.json(flight, { status: 201 });
  } catch (error) {
    console.error("Error creating flight:", error);
    return NextResponse.json(
      { error: "Failed to create flight", details: (error as any).message },
      { status: 500 }
    );
  }
}

// UPDATE a flight
export async function PUT(
  request: Request,
  { params }: { params: { flightNumber: string } }
) {
  try {
    const { flightNumber } = params;
    const session = await getServerSession(authOptions);

    if (!flightNumber) {
      return NextResponse.json(
        { error: "Missing flight number" },
        { status: 400 }
      );
    }

    // Check if flight exists
    const existingFlight = await prisma.flight.findUnique({
      where: { flightNumber },
    });

    if (!existingFlight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

    const flightData = await request.json();

    // Update the flight
    const updatedFlight = await prisma.flight.update({
      where: { flightNumber },
      data: flightData,
    });

    return NextResponse.json(updatedFlight);
  } catch (error) {
    console.error("Error updating flight:", error);
    return NextResponse.json(
      { error: "Failed to update flight", details: (error as any).message },
      { status: 500 }
    );
  }
}

// DELETE a flight
export async function DELETE(
  _: Request,
  { params }: { params: { flightNumber: string } }
) {
  try {
    const { flightNumber } = params;
    const session = await getServerSession(authOptions);

    if (!flightNumber) {
      return NextResponse.json(
        { error: "Missing flight number" },
        { status: 400 }
      );
    }

    // Check if flight exists
    const existingFlight = await prisma.flight.findUnique({
      where: { flightNumber },
    });

    if (!existingFlight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

    // Check if there are tickets associated with this flight
    const ticketsCount = await prisma.ticket.count({
      where: { flightNumber },
    });

    if (ticketsCount > 0) {
      return NextResponse.json(
        {
          error: "Cannot delete flight with existing tickets",
          ticketsCount,
        },
        { status: 409 }
      );
    }

    // Delete the flight
    await prisma.flight.delete({
      where: { flightNumber },
    });

    return NextResponse.json({
      message: "Flight deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting flight:", error);
    return NextResponse.json(
      { error: "Failed to delete flight", details: (error as any).message },
      { status: 500 }
    );
  }
}

// Add this to handle all methods for flight-specific operations
export const dynamic = "force-dynamic";
