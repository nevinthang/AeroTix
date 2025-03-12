import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

const prisma = new PrismaClient();

interface PassengerData {
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiryDate: string;
  ageCategory: 'ADULT' | 'CHILD' | 'INFANT';
  checkedBaggage: number;
  cabinBaggage: number;
  mealPreference: string;
  seatPreference: 'WINDOW' | 'MIDDLE' | 'AISLE' | 'NO_PREFERENCE';
  specialAssistance: string[];
  emergencyContactName: string;
  emergencyContactPhone: string;
  insurance: boolean;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { flightNumber, userId, passengers } = body as {
      flightNumber: string;
      userId: string;
      passengers: PassengerData[];
    };

    if (!flightNumber || !userId || !passengers || passengers.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const flight = await prisma.flight.findUnique({
      where: { flightNumber },
    });

    if (!flight) {
      return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
    }

    const ticket = await prisma.ticket.create({
      data: {
        flightNumber: flight.flightNumber,
        userId,
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
          }))
        }
      },
      include: {
        passengers: true,
        user: true,
        flight: true
      }
    });

    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 });
  }
}
