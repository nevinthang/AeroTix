import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { useParams } from 'next/navigation'

// GET: Fetch a flight by flightNumber
export async function GET(
  request: NextRequest,
  { params }: { params: { flightNumber: string } }
) {
  try {
    const { flightNumber } = params;

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

// PUT: Update an existing flight
export async function PUT(
  request: NextRequest,
  { params }: { params: { flightNumber: string } }
) {
  try {
    const { flightNumber } = params;
    const body = await request.json();

    const existingFlight = await prisma.flight.findUnique({
      where: { flightNumber },
    });

    if (!existingFlight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

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

// DELETE: Delete a flight
export async function DELETE(
  request: NextRequest,
  { params }: { params: { flightNumber: string } }
) {
  try {
    const { flightNumber } = params;

    const existingFlight = await prisma.flight.findUnique({
      where: { flightNumber },
    });

    if (!existingFlight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

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