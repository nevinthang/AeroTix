// app/flights/page.tsx
"use client";

import { useEffect, useState } from 'react';
import FlightCard from '@/components/card/airplane_card'; // Adjust path as needed

interface Flight {
  id: string;
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
  logoUrl?: string;
}

export default function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch('/api/flights');
        
        if (!response.ok) {
          throw new Error('Failed to fetch flights');
        }
        
        const data = await response.json();
        setFlights(data);
      } catch (err) {
        setError('Unable to load flights. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Available Flights</h1>
      <div className="space-y-6">
        {flights.length > 0 ? (
          flights.map(flight => (
            <FlightCard key={flight.id} flight={flight} />
          ))
        ) : (
          <p className="text-center text-gray-500 p-8">No flights available</p>
        )}
      </div>
    </div>
  );
}