"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import FlightBookingDetail from "./flight_detail";
import { Loader2 } from "lucide-react";
import axios from "axios";

// Pastikan tipe Flight sudah terdefinisi
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
  category: Category;
  price: number;
  seatCapacity: number;
  availableSeats: number;
}
type Category = "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST_CLASS";

export default function FlightBookingPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [flightData, setFlightData] = useState<Flight | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!params?.flightNumber) return; // Cegah fetch jika belum tersedia

    let isMounted = true; // Gunakan flag untuk menghindari state update setelah unmount

    const fetchFlightData = async () => {
      try {
        const flightNumber =
          typeof params.flightNumber === "string" ? params.flightNumber : "";
        const flightRes = await axios.get(`/api/flights/${flightNumber}`);

        if (isMounted) {
          setFlightData(flightRes.data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load flight details");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFlightData();

    return () => {
      isMounted = false; // Cleanup effect jika komponen unmount
    };
  }, [params?.flightNumber]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mb-4" />
        <p className="text-lg text-indigo-800 animate-pulse">
          Loading flight details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-500">
        <h2 className="text-2xl font-bold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Pastikan flightData ada sebelum me-render FlightBookingDetail
  if (!flightData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-lg text-red-500">Flight details not found.</p>
      </div>
    );
  }

  return <FlightBookingDetail flight={flightData} />;
}
