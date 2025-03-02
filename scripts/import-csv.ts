// scripts/import-csv.ts
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');

// Define the Flight interface to match your schema
interface Flight {
  id?: string;
  airline: string;
  source: string;
  destination: string;
  route: string;
  depTime: string;
  arrivalTime: string;
  duration: string;
  totalStops: number;
  additionalInfo?: string;
  price: string;
  date: string;
}

// Create a raw data interface for the CSV data
interface RawFlightData {
  airline: string;
  source: string;
  destination: string;
  route: string;
  depTime: string;
  arrivalTime: string;
  duration: string;
  totalStops: string; // Will be a string in CSV
  additionalInfo?: string;
  price: string;
  date: string;
  [key: string]: any; // For any additional fields
}

const prisma = new PrismaClient();

async function importCSV(): Promise<void> {
  const flights: Flight[] = [];
  
  fs.createReadStream(path.join(process.cwd(), 'data', 'flights.csv'))
    .pipe(csv())
    .on('data', (data: RawFlightData) => {
      flights.push({
        ...data,
        totalStops: parseInt(data.totalStops, 10) || 0 // Provide fallback to avoid NaN
      });
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