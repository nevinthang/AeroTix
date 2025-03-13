import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  context: { params: { flightNumber?: string } }
) {
  try {
    const { flightNumber } = context.params; // No need for await here

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

export async function POST(
  request: Request,
  context: { params: { flightNumber?: string } }
) {
  try {
    const body = await request.json();
    
    // Create a new flight
    const flight = await prisma.flight.create({
      data: body,
    });

    return NextResponse.json(flight, { status: 201 });
  } catch (error) {
    console.error("Error creating flight:", error);
    return NextResponse.json(
      { error: "Failed to create flight" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: { flightNumber?: string } }
) {
  try {
    const { flightNumber } = context.params;
    const body = await request.json();

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

    // Update flight
    const updatedFlight = await prisma.flight.update({
      where: { flightNumber },
      data: body,
    });

    return NextResponse.json(updatedFlight);
  } catch (error) {
    console.error("Error updating flight:", error);
    return NextResponse.json(
      { error: "Failed to update flight" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: { flightNumber?: string } }
) {
  try {
    const { flightNumber } = context.params;

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

    // Delete the flight
    await prisma.flight.delete({
      where: { flightNumber },
    });

    return NextResponse.json(
      { message: "Flight deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting flight:", error);
    return NextResponse.json(
      { error: "Failed to delete flight" },
      { status: 500 }
    );
  }
}