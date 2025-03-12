import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  passportNumber: string;
  dateOfBirth: string;
  seatNumber: string | null;
}

interface Airport {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
}

interface Flight {
  id: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: Airport;
  arrivalAirport: Airport;
}

interface Ticket {
  id: string;
  flightId: string;
  userId: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  flight: Flight;
  passengers: Passenger[];
}

export default function BookingConfirmation() {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    const fetchLatestTicket = async () => {
      try {
        const response = await axios.get<Ticket>('/api/user/latest-ticket');
        setTicket(response.data);
      } catch (err) {
        console.error('Error fetching ticket:', err);
        setError('Unable to load booking details. Please check your account.');
      }
    };

    fetchLatestTicket();
  }, [session, router]);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
        <Link href="/dashboard">Go to Dashboard</Link>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div>
        <h1>No Booking Found</h1>
        <p>We couldn't find your recent booking information.</p>
        <Link href="/flights">Search Flights</Link>
      </div>
    );
  }

  const departureDate = new Date(ticket.flight.departureTime).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div>
      <h1>Booking Confirmed!</h1>
      <p>Your flight has been successfully booked.</p>

      <h2>Flight Details</h2>
      <p>Flight Number: {ticket.flight.flightNumber}</p>
      <p>Date: {departureDate}</p>
      <p>Departure: {ticket.flight.departureAirport.name} ({ticket.flight.departureAirport.code})</p>
      <p>Arrival: {ticket.flight.arrivalAirport.name} ({ticket.flight.arrivalAirport.code})</p>

      <h2>Passengers</h2>
      <ul>
        {ticket.passengers.map((p) => (
          <li key={p.id}>{p.firstName} {p.lastName} - {p.seatNumber || 'Not assigned'}</li>
        ))}
      </ul>

      <h2>Payment Summary</h2>
      <p>Total Paid: ${ticket.totalPrice.toFixed(2)}</p>
      <p>Status: {ticket.status}</p>

      <Link href="/dashboard">Go to Dashboard</Link>
      <button onClick={() => window.print()}>Print Itinerary</button>
    </div>
  );
}
