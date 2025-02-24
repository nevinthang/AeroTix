import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'
import { prisma } from '../lib/prisma'

async function importCSV() {
  const flights: any[] = []
  
  fs.createReadStream(path.join(process.cwd(), 'data', 'flights.csv'))
    .pipe(csv())
    .on('data', (data: { totalStops: string }) => {
      flights.push({
        ...data,
        totalStops: parseInt(data.totalStops, 10)
      })
    })
    .on('end', async () => {
      try {
        // Import the data in batches
        for (const flight of flights) {
          await prisma.flight.create({
            data: flight
          })
        }
        console.log(`Imported ${flights.length} flights`)
        process.exit(0)
      } catch (error) {
        console.error('Error importing data:', error)
        process.exit(1)
      }
    })
}

importCSV()