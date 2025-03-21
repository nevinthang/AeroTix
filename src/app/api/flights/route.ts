import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Search for flights with detailed filters
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    // Extract search parameters
    const from = url.searchParams.get("from"); // departureCode
    const to = url.searchParams.get("to"); // arrivalCode
    const date = url.searchParams.get("date"); // departureDate
    const passengers = parseInt(url.searchParams.get("passengers") || "1");
    const airline = url.searchParams.get("airline");

    // Build the query filters with proper type
    const filters: Prisma.FlightWhereInput = {};

    if (from) filters.departureCode = from;
    if (to) filters.arrivalCode = to;

    if (date) {
      const searchDate = new Date(date);
      const nextDay = new Date(searchDate);
      nextDay.setDate(nextDay.getDate() + 1);

      filters.departureDate = {
        gte: searchDate,
        lt: nextDay,
      };
    }

    if (airline) filters.airline = airline;

    // Ensure enough available seats
    filters.availableSeats = { gte: passengers };

    const flights = await prisma.flight.findMany({
      where: filters,
      orderBy: [{ departureDate: "asc" }, { price: "asc" }],
    });

    return Response.json(flights);
  } catch (error) {
    console.error("Error searching flights:", error);
    return Response.json(
      { error: "Failed to search flights" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log(body);

    const newFlight = await prisma.flight.create({
      data: {
        flightNumber: body.flightNumber,
        departure: body.departure,
        departureCode: body.departureCode,
        arrival: body.arrival,
        arrivalCode: body.arrivalCode,
        departureDate: body.departureDate,
        departureHour: body.departureHour,
        duration: body.duration,
        arrivalDate: body.arrivalDate,
        arrivalHour: body.arrivalHour,
        airline: body.airline,
        aircraft: body.aircraft,
        category: body.category,
        price: body.price,
        seatCapacity: body.seatCapacity,
        availableSeats: body.availableSeats,
      },
    });

    return Response.json(newFlight, { status: 201 });
  } catch (error) {
    console.error("Error creating flight:", error);
    return Response.json({ error: "Failed to create flight" }, { status: 500 });
  }
}
