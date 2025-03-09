const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');

interface Flight {
  flightNumber: string;
  departure: string;
  departureCode: string;
  arrival: string;
  arrivalCode: string;
  departureDate: Date;
  departureHour: Date;
  duration: number; 
  arrivalDate: Date;
  arrivalHour: Date;
  airline: string;
  aircraft: string;
  category: string;
  price: number;
  seatCapacity: number;
  availableSeats: number;
}

interface RawFlightData {
  FlightNumber: string;
  Departure: string;
  DepartureCode: string;
  Arrival: string;
  ArrivalCode: string;
  DepartureDate: string;
  DepartureHour: string;
  Duration: string;
  ArrivalDate: string;
  ArrivalHour: string;
  Airline: string;
  Aircraft: string;
  Category: string;
  Price: string;
  SeatCapacity: string;
  AvailableSeats: string;
  [key: string]: any;
}

function mapCategory(category: string): 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST_CLASS' {
  switch (category.toUpperCase()) {
    case 'ECONOMY':
      return 'ECONOMY';
    case 'PREMIUM_ECONOMY':
      return 'PREMIUM_ECONOMY';
    case 'BUSINESS':
      return 'BUSINESS';
    case 'FIRST_CLASS':
      return 'FIRST_CLASS';
    default:
      throw new Error(`Invalid category: ${category}`);
  }
}


const prisma = new PrismaClient();

async function importCSV(): Promise<void> {
  const flights: Flight[] = [];

  fs.createReadStream(path.join(process.cwd(), 'data', 'flight_data.csv'))
    .pipe(csv())
    .on('data', (data: RawFlightData) => {
      try {
        flights.push({
          flightNumber: data.FlightNumber,
          departure: data.Departure,
          departureCode: data.DepartureCode,
          arrival: data.Arrival,
          arrivalCode: data.ArrivalCode,
          departureDate: new Date(data.DepartureDate),
          departureHour: new Date(`1970-01-01T${data.DepartureHour}`),
          duration: parseInt(data.Duration, 10) || 0,
          arrivalDate: new Date(data.ArrivalDate),
          arrivalHour: new Date(`1970-01-01T${data.ArrivalHour}`),
          airline: data.Airline,
          aircraft: data.Aircraft,
          category: mapCategory(data.Category),
          price: parseFloat(data.Price),
          seatCapacity: parseInt(data.SeatCapacity, 10) || 0,
          availableSeats: parseInt(data.AvailableSeats, 10) || 0
        });
      } catch (error) {
        console.error('Invalid data format:', data);
      }
    })
    .on('end', async () => {
      try {
        console.log(`Found ${flights.length} flights to import`);

        for (const flight of flights) {
          await prisma.flight.create({
            data: flight
          });
        }

        console.log(`Successfully imported ${flights.length} flights`);
        await prisma.$disconnect();
        process.exit(0);
      } catch (error: any) {
        console.error('Error importing data:', error.message);
        await prisma.$disconnect();
        process.exit(1);
      }
    })
    .on('error', (error: Error) => {
      console.error('Error reading CSV:', error.message);
      process.exit(1);
    });
}

importCSV();
