"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import FlightBookingDetail from "./flight_detail";
import { AlertCircle, Loader2, PlaneTakeoff } from "lucide-react";
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
    if (!params?.flightNumber) return;

    let isMounted = true;

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
      isMounted = false;
    };
  }, [params?.flightNumber]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
        <div className="p-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-xl flex flex-col items-center">
          <Loader2 className="h-16 w-16 animate-spin text-indigo-300 mb-6" />
          <p className="text-xl font-medium tracking-wide text-indigo-100">
            Preparing Your Flight Details
          </p>
          <div className="mt-4 w-48 h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-400 rounded-full animate-pulse"
              style={{ width: "70%" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
        <div className="p-8 rounded-lg bg-slate-100 backdrop-blur-md border shadow-xl max-w-lg mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-red-500/20 rounded-full">
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-red-500">
              Unable to Load Flight
            </h2>
          </div>
          <p className="text-red-500 mb-6">{error}</p>
          <button className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!flightData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
        <div className="p-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-xl max-w-lg mx-auto text-center">
          <div className="mb-6 p-4 bg-yellow-500/20 rounded-full inline-block">
            <PlaneTakeoff className="h-10 w-10 text-yellow-300" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Flight Not Found</h2>
          <p className="text-gray-300 mb-6">
            We couldn't locate the flight details you're looking for. The flight
            may have been rescheduled or canceled.
          </p>
          <div className="flex gap-4">
            <button className="flex-1 py-3 bg-transparent border border-white/30 hover:bg-white/10 rounded-lg font-medium transition-colors">
              Go Back
            </button>
            <button className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors">
              Search Flights
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 py-12 px-4">
      <div className="max-w-6xl mx-auto pt-20">
        <div className="p-6 lg:p-8 rounded-xl bg-white backdrop-blur-md border border-white/20 shadow-xl">
          <FlightBookingDetail flight={flightData} />
        </div>
      </div>
    </div>
  );
}
