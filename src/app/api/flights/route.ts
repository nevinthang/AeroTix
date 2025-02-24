import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

// GET - Get all flights
export async function GET() {
  try {
    const flights = await prisma.flight.findMany()
    return NextResponse.json(flights)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch flights' }, { status: 500 })
  }
}

// POST - Create a new flight
export async function POST(request: Request) {
  try {
    const data = await request.json()
    const flight = await prisma.flight.create({
      data
    })
    return NextResponse.json(flight, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create flight' }, { status: 500 })
  }
}
