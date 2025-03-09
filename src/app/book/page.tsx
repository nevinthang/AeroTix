"use client";

import { useState, useEffect } from "react";

import {
  Globe,
  Clock,
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  Plane,
  Search,
  ArrowLeftRight,
} from "lucide-react";
import { format } from "date-fns";
import Button from "@/components/ui/button";
import Cloud from "@/components/ui/cloud";
import HeroBookCard from "@/components/card/hero_book_card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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

interface HookProps {
  flights: Flight[];
  setFlights: React.Dispatch<React.SetStateAction<Flight[]>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  searched: boolean;
  setSearched: React.Dispatch<React.SetStateAction<boolean>>;
}

const FlightHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [planePosition, setPlanePosition] = useState(0);

  useEffect(() => {
    setIsLoaded(true);

    const interval = setInterval(() => {
      setPlanePosition((prev) => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
      {/* Background elements with animation */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className={`absolute h-32 w-32 rounded-full bg-white blur-3xl opacity-30 -top-10 left-1/4 transition-all duration-1000 ease-in-out ${
              isLoaded ? "scale-100" : "scale-0"
            }`}
          ></div>
          <div
            className={`absolute h-32 w-32 rounded-full bg-blue-300 blur-3xl opacity-30 top-32 right-1/3 transition-all duration-1000 delay-300 ease-in-out ${
              isLoaded ? "scale-100" : "scale-0"
            }`}
          ></div>
          <div
            className={`absolute h-32 w-32 rounded-full bg-purple-300 blur-3xl opacity-30 bottom-10 right-1/4 transition-all duration-1000 delay-500 ease-in-out ${
              isLoaded ? "scale-100" : "scale-0"
            }`}
          ></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 py-20 md:py-28 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content with fade-in animation */}
          <div
            className={`w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0 transition-all duration-1000 ease-out ${
              isLoaded
                ? "opacity-100 transform-none"
                : "opacity-0 -translate-y-8"
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              <span className="block overflow-hidden">
                <span
                  className={`block transition-transform duration-1000 delay-300 ${
                    isLoaded ? "transform-none" : "translate-y-full"
                  }`}
                >
                  Explore the World
                </span>
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-purple-200 block overflow-hidden">
                <span
                  className={`block transition-transform duration-1000 delay-500 ${
                    isLoaded ? "transform-none" : "translate-y-full"
                  }`}
                >
                  Without Limits
                </span>
              </span>
            </h1>

            <p
              className={`text-xl text-blue-100 mb-8 max-w-lg mx-auto md:mx-0 transition-all duration-1000 delay-700 ${
                isLoaded
                  ? "opacity-100 transform-none"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Discover incredible destinations with our unbeatable flight deals.
              Your dream journey is just a click away.
            </p>

            <div
              className={`transition-all duration-1000 delay-1000 ${
                isLoaded
                  ? "opacity-100 transform-none"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Button text="Start Exploring" showArrow />
            </div>
          </div>

          {/* Image Elements with animations */}
          <div
            className={`w-full md:w-1/2 relative transition-all duration-1000 delay-500 ${
              isLoaded
                ? "opacity-100 transform-none"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative h-96 w-full">
              {/* Main plane image with glow and movement */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <div className="absolute top-5 right-0 w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-20 blur-xl animate-pulse"></div>
                  <div
                    className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full opacity-20 blur-xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>

                  {/* Animated plane */}
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `translate(-50%, -50%) translateY(${
                        Math.sin(planePosition * 0.05) * 10
                      }px)`,
                    }}
                  >
                    <div className="relative">
                      <div className="w-64 h-64 rounded-full bg-white opacity-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      <Plane
                        size={120}
                        className="text-white transform rotate-45"
                        style={{
                          filter:
                            "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
                        }}
                      />
                    </div>
                  </div>

                  {/* Animated cloud elements */}
                  <Cloud
                    className="absolute top-10 left-10 w-20 h-8 bg-white opacity-40 rounded-full blur-sm"
                    delay={0}
                    duration={10}
                  />
                  <Cloud
                    className="absolute top-16 left-5 w-16 h-6 bg-white opacity-30 rounded-full blur-sm"
                    delay={2}
                    duration={19}
                  />
                  <Cloud
                    className="absolute bottom-20 right-20 w-24 h-8 bg-white opacity-40 rounded-full blur-sm"
                    delay={1}
                    duration={17}
                  />
                  <Cloud
                    className="absolute bottom-28 right-12 w-16 h-6 bg-white opacity-30 rounded-full blur-sm"
                    delay={3}
                    duration={19}
                  />
                </div>
              </div>

              {/* Animated destination cards */}
              <HeroBookCard
                code="JFK"
                city="New York"
                label="Popular Destination"
                className="absolute -bottom-6 left-0"
                delay={1200}
              />

              <HeroBookCard
                code="HND"
                city="Tokyo"
                label="Trending Now"
                className="absolute -top-4 right-12"
                delay={1500}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Curved bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-12 fill-gray-50"
        >
          <path d="M0,96L80,80C160,64,320,32,480,21.3C640,11,800,21,960,42.7C1120,64,1280,96,1360,112L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>

      {/* Add CSS animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-10px) translateX(10px);
          }
          50% {
            transform: translateY(0px) translateX(20px);
          }
          75% {
            transform: translateY(10px) translateX(10px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }

        .animate-float {
          animation-name: float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

const FlightSearchForm: React.FC<HookProps> = ({
  setFlights,
  loading,
  setLoading,
  setError,
  setSearched,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
    passengers: 1,
    airline: "",
  });

  // Sample data
  const airports = [
    { code: "CGK", name: "Jakarta" },
    { code: "JFK", name: "New York" },
    { code: "DXB", name: "Dubai" },
    { code: "MAD", name: "Madrid" },
    { code: "HND", name: "Tokyo" },
    { code: "LHR", name: "London" },
    { code: "SYD", name: "Sydney" },
  ];

  const airlines = [
    { code: "AA", name: "American Airlines" },
    { code: "DL", name: "Delta Air Lines" },
    { code: "UA", name: "United Airlines" },
    { code: "BA", name: "British Airways" },
    { code: "LH", name: "Lufthansa" },
    { code: "EK", name: "Emirates" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  const searchFlights = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const queryString = new URLSearchParams({
        from: searchParams.from,
        to: searchParams.to,
        date: searchParams.date,
        passengers: searchParams.passengers.toString(),
        ...(searchParams.airline && { airline: searchParams.airline }),
      }).toString();

      const response = await fetch(`/api/flights?${queryString}`);

      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }

      const data = await response.json();
      setFlights(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching flights:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 -mt-6">
      <div
        className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-xl p-0 transform transition-all duration-500 ease-out overflow-hidden"
        style={{
          transform: isFormVisible ? "translateY(0)" : "translateY(20px)",
          opacity: isFormVisible ? 1 : 0,
        }}
      >
        {/* Decorative elements */}
        <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-blue-500 opacity-10 blur-xl"></div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-purple-500 opacity-10 blur-xl"></div>

        {/* Accent bar with gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-blue-500 to-purple-500"></div>

        {/* Header with custom pattern */}
        <div className="relative pt-8 px-8 pb-4 border-b border-purple-100">
          <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Discover Your Journey
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Find the perfect flight for your adventure
          </p>

          <div className="absolute right-0 top-0 h-12 w-full">
            <svg
              viewBox="0 0 1440 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <path
                d="M0 48H1440V0C1380 16 1320 32 1260 32C1200 32 1140 16 1080 0C1020 16 960 32 900 32C840 32 780 16 720 0C660 16 600 32 540 32C480 32 420 16 360 0C300 16 240 32 180 32C120 32 60 16 0 0V48Z"
                fill="rgba(219, 234, 254, 0.3)"
              />
            </svg>
          </div>
        </div>

        <form onSubmit={searchFlights} className="p-8 pt-10">
          {/* Origin-Destination Group with special styling */}
          <div className="relative mb-12">
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-2 h-16 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {/* Departure */}
              <div className="relative">
                <div className="absolute -top-6 left-0 bg-blue-100 px-3 py-1 rounded-t-md shadow-sm">
                  <label className="flex items-center gap-1 text-sm font-medium text-blue-500">
                    <MapPin size={14} className="text-blue-500" />
                    DEPARTURE
                  </label>
                </div>
                <select
                  name="from"
                  value={searchParams.from}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-blue-50 border-0 focus:ring-2 focus:ring-blue-300 text-lg font-medium rounded-md transition-all duration-300"
                  required
                >
                  <option value="">Select departure airport</option>
                  {airports.map((airport) => (
                    <option key={`from-${airport.code}`} value={airport.code}>
                      {airport.name} ({airport.code})
                    </option>
                  ))}
                </select>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-200 to-blue-400"></div>
              </div>

              {/* Arrow icon in the middle */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:shadow-xl transition-all group">
                  <ArrowLeftRight
                    size={18}
                    className="group-hover:rotate-180 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Arrival */}
              <div className="relative">
                <div className="absolute -top-6 left-0 bg-purple-100 px-3 py-1 rounded-t-md shadow-sm">
                  <label className="flex items-center gap-1 text-sm font-medium text-purple-500">
                    <MapPin size={14} className="text-purple-500" />
                    ARRIVAL
                  </label>
                </div>
                <select
                  name="to"
                  value={searchParams.to}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-purple-50 border-0 focus:ring-2 focus:ring-purple-300 text-lg font-medium rounded-md transition-all duration-300"
                  required
                >
                  <option value="">Select arrival airport</option>
                  {airports.map((airport) => (
                    <option key={`to-${airport.code}`} value={airport.code}>
                      {airport.name} ({airport.code})
                    </option>
                  ))}
                </select>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-200 to-purple-400"></div>
              </div>
            </div>
          </div>

          {/* Additional fields with staggered layout and glass morphism effect */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {/* Date with offset position */}
            <div className="relative lg:translate-y-4 group">
              <div className="absolute -top-6 left-0 bg-blue-100 px-3 py-1 rounded-t-md shadow-sm">
                <label className="flex items-center gap-1 text-sm font-medium text-blue-500">
                  <Calendar size={14} className="text-blue-500" />
                  DEPARTURE DATE
                </label>
              </div>
              <div className="relative overflow-hidden rounded-md bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                <input
                  type="date"
                  name="date"
                  value={searchParams.date}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-transparent border-0 focus:ring-2 focus:ring-blue-300 z-10 relative"
                  required
                />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-300 to-blue-500"></div>
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-200 rounded-full opacity-20 transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              </div>
            </div>

            {/* Passengers with a highlight treatment */}
            <div className="relative group">
              <div className="absolute -top-6 left-0 bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 rounded-t-md shadow-sm">
                <label className="flex items-center gap-1 text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  <Users size={14} className="text-purple-400" />
                  TRAVELERS
                </label>
              </div>
              <div className="relative overflow-hidden rounded-md bg-gradient-to-r from-blue-50 to-purple-50 group-hover:from-blue-100 group-hover:to-purple-100 transition-colors duration-300">
                <input
                  type="number"
                  name="passengers"
                  value={searchParams.passengers}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className="w-full p-4 bg-transparent border-0 focus:ring-2 focus:ring-purple-300 z-10 relative"
                  required
                />
                <div className="absolute inset-y-0 right-4 flex items-center gap-1 text-gray-400">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-blue-300"></div>
                    <div className="w-6 h-6 rounded-full bg-purple-300"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-300 to-purple-500"></div>
              </div>
            </div>

            {/* Airline with offset position in opposite direction */}
            <div className="relative lg:-translate-y-4 group">
              <div className="absolute -top-6 left-0 bg-purple-100 px-3 py-1 rounded-t-md shadow-sm">
                <label className="flex items-center gap-1 text-sm font-medium text-purple-500">
                  <Plane size={14} className="text-purple-500" />
                  AIRLINE PREFERENCE
                </label>
              </div>
              <div className="relative overflow-hidden rounded-md bg-purple-50 group-hover:bg-purple-100 transition-colors duration-300">
                <select
                  name="airline"
                  value={searchParams.airline}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-transparent border-0 focus:ring-2 focus:ring-purple-300 z-10 relative"
                >
                  <option value="">Any airline</option>
                  {airlines.map((airline) => (
                    <option key={airline.code} value={airline.code}>
                      {airline.name}
                    </option>
                  ))}
                </select>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-300 to-purple-500"></div>
                <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-purple-200 rounded-full opacity-20 transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              </div>
            </div>
          </div>

          <div className="mt-12 relative">
            <div className="flex justify-end">
              <button
                type="submit"
                className="relative overflow-hidden group rounded-md"
                disabled={loading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative px-8 py-4 text-white font-medium flex items-center gap-3 z-10">
                  {loading ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Finding Flights...</span>
                    </>
                  ) : (
                    <>
                      <Search
                        size={18}
                        className="group-hover:rotate-90 transition-transform duration-500"
                      />
                      <span>Discover Flights</span>
                      <div className="w-6 h-px bg-white group-hover:w-12 transition-all duration-300"></div>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute left-0 bottom-0 w-1/4 h-px bg-gradient-to-r from-blue-200 to-transparent"></div>

            {/* Small decorative airplane */}
            <div className="absolute left-1/4 bottom-10 text-blue-300 transform -rotate-45 opacity-30">
              <Plane size={20} />
            </div>
          </div>

          {/* Additional decorative element */}
          <div className="absolute right-8 bottom-8 text-purple-300 opacity-30">
            <div className="w-32 h-32 rounded-full border border-dashed border-purple-300 flex items-center justify-center">
              <Globe size={24} className="animate-pulse" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const Result: React.FC<HookProps> = ({ flights, loading, error, searched }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function formatDuration(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  function formatDateTime(dateStr: Date, timeStr: Date) {
    const date = new Date(dateStr);
    const time = new Date(timeStr);

    return {
      date: format(date, "EEE, MMM d"),
      time: format(time, "h:mm a"),
    };
  }

  
  const handleSelectFlight = () => {
    if (!session) {
      router.push("/auth"); 
      return;
    }
    router.push("/flights"); // Redirect to flight selection
  };

  return (
    /* Results Section */
    <div className="container mx-auto px-4 mt-8">
      {error && (
        <div
          className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4 shadow-sm opacity-0 animate-fadeIn"
          style={{ animation: "fadeIn 0.3s ease-out forwards" }}
        >
          {error}
        </div>
      )}

      {searched && !loading && flights.length === 0 && !error && (
        <div
          className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg shadow-sm opacity-0 animate-fadeIn"
          style={{ animation: "fadeIn 0.3s ease-out forwards" }}
        >
          No flights found matching your criteria. Try adjusting your search
          parameters.
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 border-b-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Plane size={20} className="text-purple-500" />
            </div>
          </div>
        </div>
      )}

      {flights.length > 0 && (
        <div
          className="space-y-6 opacity-0 animate-fadeIn"
          style={{ animation: "fadeIn 0.5s ease-out forwards" }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Available Flights
            </h2>
            <div className="text-gray-600 px-4 py-1 bg-white rounded-full shadow-sm">
              {flights.length} flights found
            </div>
          </div>

          <div className="space-y-4">
            {flights.map((flight, index) => {
              const departure = formatDateTime(
                flight.departureDate,
                flight.departureHour
              );
              const arrival = formatDateTime(
                flight.arrivalDate,
                flight.arrivalHour
              );

              return (
                <div
                  key={flight.flightNumber}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 opacity-0 transition-all duration-500 hover:shadow-lg hover:translate-y-px"
                  style={{
                    animation: `fadeSlideUp 0.5s ease-out ${
                      index * 0.1
                    }s forwards`,
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-4">
                    {/* Airline Info */}
                    <div className="p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-100">
                      <div>
                        <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                          {flight.airline}
                        </span>
                        <p className="text-gray-500">{flight.flightNumber}</p>
                      </div>
                      <div className="mt-2 text-sm text-gray-500 flex items-center">
                        <Plane size={14} className="mr-1 text-blue-500" />
                        {flight.aircraft}
                      </div>
                    </div>

                    {/* Flight Times */}
                    <div className="p-6 md:col-span-2 border-b md:border-b-0 md:border-r border-gray-100">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <p className="text-2xl font-bold">{departure.time}</p>
                          <p className="text-sm text-gray-500">
                            {departure.date}
                          </p>
                          <p className="font-medium mt-1 text-blue-500">
                            {flight.departure}{" "}
                            <span className="text-gray-500">
                              ({flight.departureCode})
                            </span>
                          </p>
                        </div>

                        <div className="flex flex-col items-center px-4">
                          <div className="text-gray-400 text-sm flex items-center">
                            <Clock size={14} className="mr-1 text-purple-500" />
                            {formatDuration(flight.duration)}
                          </div>
                          <div className="relative py-4">
                            <div className="w-32 h-px bg-gradient-to-r from-blue-500 to-purple-500 my-1"></div>
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"></div>
                            <Plane
                              size={16}
                              className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-purple-400"
                            />
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-purple-500"></div>
                          </div>
                          <div className="text-gray-400 text-xs uppercase tracking-wider font-medium">
                            Direct
                          </div>
                        </div>

                        <div className="flex-1 text-right">
                          <p className="text-2xl font-bold">{arrival.time}</p>
                          <p className="text-sm text-gray-500">
                            {arrival.date}
                          </p>
                          <p className="font-medium mt-1 text-purple-500">
                            {flight.arrival}{" "}
                            <span className="text-gray-500">
                              ({flight.arrivalCode})
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Price and Booking */}
                    <div className="p-6 bg-gray-50 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100">
                      <div>
                        <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                          ${flight.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">per passenger</p>
                      </div>

                      <div className="mt-4">
                        <div className="text-sm text-gray-600 mb-2 flex items-center">
                          <Users size={14} className="mr-1 text-blue-500" />
                          <span className="font-medium">
                            {flight.availableSeats}
                          </span>{" "}
                          seats left
                        </div>
                        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-102 active:scale-98 flex items-center justify-center">
                          Select Flight
                          <ArrowRight size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .transform.hover\\:scale-103:hover {
          transform: scale(1.03);
        }

        .transform.active\\:scale-98:active {
          transform: scale(0.98);
        }

        .transform.hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default function FlightBookingPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen pb-12 overflow-x-hidden">
      <FlightHero />
      <FlightSearchForm
        flights={flights}
        setFlights={setFlights}
        error={error}
        setError={setError}
        loading={loading}
        setLoading={setLoading}
        searched={searched}
        setSearched={setSearched}
      />
      <Result
        flights={flights}
        setFlights={setFlights}
        error={error}
        setError={setError}
        loading={loading}
        setLoading={setLoading}
        searched={searched}
        setSearched={setSearched}
      />

      {/* Floating help button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-lg hover:shadow-indigo-200 transition-all duration-300 transform hover:scale-110 active:scale-95 z-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      </button>
    </div>
  );
}
