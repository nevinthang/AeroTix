"use client";

import { useState, useEffect, useRef } from "react";
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
  Wifi,
  Coffee,
  MonitorSmartphone,
  BaggageClaim,
  Star,
} from "lucide-react";
import { format } from "date-fns";
import Button from "@/components/ui/button";
import Cloud from "@/components/ui/cloud";
import HeroBookCard from "@/components/card/hero_book_card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

// Main Flight Hero Component
const FlightHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [planePosition, setPlanePosition] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);

    const interval = setInterval(() => {
      setPlanePosition((prev) => (prev + 1) % 100);
    }, 50);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Parallax effect calculation
  const parallaxOffset = scrollPosition * 0.3;

   const handleClick = () => {
    // Smooth scroll down by a specific amount
    window.scrollTo({
      top: window.scrollY + 500, // Scroll down 500px
      behavior: 'smooth'
    });
  }


  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white min-h-screen flex items-center"
    >
      {/* Animated gradient orbs with parallax */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 blur-3xl"
          style={{
            transform: `translate3d(${-parallaxOffset * 0.5}px, ${
              -parallaxOffset * 0.2
            }px, 0)`,
          }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-30"
          style={{
            transform: `translate3d(${parallaxOffset * 0.4}px, ${
              parallaxOffset * 0.3
            }px, 0)`,
          }}
        ></div>
        <div
          className="absolute top-2/3 left-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-indigo-400 to-purple-600 blur-3xl opacity-40"
          style={{
            transform: `translate3d(${-parallaxOffset * 0.3}px, ${
              parallaxOffset * 0.4
            }px, 0)`,
          }}
        ></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 py-20 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Content with staggered reveal animation */}
          <div
            className="w-full md:w-1/2 text-center md:text-left"
            style={{
              transform: `translateY(${Math.min(parallaxOffset * 0.2, 20)}px)`,
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 1s ease-out, transform 0.5s ease-out",
            }}
          >
            <div className="overflow-hidden mb-2">
              <span
                className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10"
                style={{
                  transform: isLoaded ? "translateY(0)" : "translateY(100%)",
                  opacity: isLoaded ? 1 : 0,
                  transition: "transform 0.8s ease-out, opacity 0.8s ease-out",
                }}
              >
                Aerotix
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-5">
              <span className="block overflow-hidden h-auto">
                <span
                  className="block"
                  style={{
                    transform: isLoaded ? "translateY(0)" : "translateY(100%)",
                    opacity: isLoaded ? 1 : 0,
                    transition:
                      "transform 0.8s ease-out 0.2s, opacity 0.8s ease-out 0.2s",
                  }}
                >
                  Explore the World
                </span>
              </span>
            </h1>

            <div
              className="h-px w-24 bg-gradient-to-r from-blue-300 to-transparent mb-6 hidden md:block"
              style={{
                transform: isLoaded ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                opacity: isLoaded ? 1 : 0,
                transition:
                  "transform 1s ease-out 0.6s, opacity 1s ease-out 0.6s",
              }}
            ></div>

            <p
              className="text-xl text-blue-100 mb-8 max-w-lgf mx-auto md:mx-0"
              style={{
                transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                opacity: isLoaded ? 1 : 0,
                transition:
                  "transform 0.8s ease-out 0.6s, opacity 0.8s ease-out 0.6s",
              }}
            >
              Discover incredible destinations with our unbeatable flight deals.
              Your dream journey is just a click away.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4"
              style={{
                transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                opacity: isLoaded ? 1 : 0,
                transition:
                  "transform 0.8s ease-out 0.8s, opacity 0.8s ease-out 0.8s",
              }}
            >
              <button className="relative overflow-hidden group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-full font-medium" onClick={handleClick}>
                <span className="relative z-10 flex items-center">
                  Start Exploring
                  <svg
                    className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
                <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              </button>
            </div>

            {/* Destination stats */}
            <div
              className="flex gap-8 mt-12"
              style={{
                transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                opacity: isLoaded ? 1 : 0,
                transition:
                  "transform 0.8s ease-out 1s, opacity 0.8s ease-out 1s",
              }}
            >
              <div>
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                  500+
                </div>
                <div className="text-sm text-blue-200">Destinations</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                  24/7
                </div>
                <div className="text-sm text-blue-200">Support</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                  98%
                </div>
                <div className="text-sm text-blue-200">Happy Travelers</div>
              </div>
            </div>
          </div>

          {/* Interactive Flight Animation Area */}
          <div
            className="w-full md:w-1/2 relative h-96"
            style={{
              transform: `translateY(${Math.min(-parallaxOffset * 0.1, 10)}px)`,
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 1s ease-out 0.5s, transform 0.5s ease-out",
            }}
          >
            {/* 3D Scene Container */}
            <div className="relative h-full w-full perspective-1000">
              {/* Animated Background Elements */}
              <div className="absolute inset-0">
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-600/30 blur-md animate-pulse"
                  style={{ animationDuration: "4s" }}
                ></div>

                {/* Animated Flight Path */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 300"
                >
                  <path
                    d="M50,150 C100,50 300,200 350,100"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="path-animation"
                  />
                  <circle
                    cx="50"
                    cy="150"
                    r="4"
                    fill="white"
                    className="opacity-70"
                  />
                  <circle
                    cx="350"
                    cy="100"
                    r="4"
                    fill="white"
                    className="opacity-70"
                  />
                </svg>

                {/* Cloud Elements */}
                <Cloud
                  className="absolute top-10 left-20 w-24 h-10 bg-white opacity-40 rounded-full blur-sm"
                  delay={0}
                  duration={15}
                  scale={1.2}
                />
                <Cloud
                  className="absolute top-24 left-10 w-20 h-8 bg-white opacity-30 rounded-full blur-sm"
                  delay={1}
                  duration={20}
                  scale={0.9}
                />
                <Cloud
                  className="absolute bottom-20 right-12 w-32 h-12 bg-white opacity-40 rounded-full blur-sm"
                  delay={0.5}
                  duration={18}
                  scale={1.4}
                />
                <Cloud
                  className="absolute bottom-36 right-24 w-20 h-8 bg-white opacity-30 rounded-full blur-sm"
                  delay={2}
                  duration={22}
                  scale={0.8}
                />
              </div>

              {/* Animated Plane with Smooth Motion */}
              <div
                className="absolute"
                style={{
                  left: `${Math.sin(planePosition * 0.03) * 20 + 50}%`,
                  top: `${Math.cos(planePosition * 0.05) * 15 + 45}%`,
                  transform: `translate(-50%, -50%) rotate(${
                    Math.sin(planePosition * 0.02) * 10 + 45
                  }deg)`,
                  transition:
                    "left 0.5s ease-out, top 0.5s ease-out, transform 0.3s ease-out",
                }}
              >
                <div className="relative">
                  {/* Plane Glow Effect */}
                  <div className="absolute -inset-4 bg-blue-400 rounded-full opacity-30 blur-xl animate-pulse"></div>
                  <div className="absolute -inset-2 bg-white rounded-full opacity-50 blur-md"></div>

                  {/* Plane Icon */}
                  <Plane
                    size={60}
                    className="text-white relative z-10"
                    style={{
                      filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))",
                    }}
                  />
                </div>
              </div>

              {/* Flight Path Particles */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-white opacity-70"
                  style={{
                    left: `${
                      Math.sin((planePosition + i * 15) * 0.03) * 20 + 50
                    }%`,
                    top: `${
                      Math.cos((planePosition + i * 15) * 0.05) * 15 + 45
                    }%`,
                    opacity: 0.7 - i * 0.1,
                    transform: "translate(-50%, -50%)",
                  }}
                ></div>
              ))}

              {/* Enhanced Destination Cards */}
              <HeroBookCard
                code="JFK"
                city="New York"
                label="Popular Destination"
                className="absolute -bottom-4 left-4"
                delay={800}
              />

              <HeroBookCard
                code="HND"
                city="Tokyo"
                label="Trending Now"
                className="absolute top-4 right-4"
                delay={1000}
              />

              <HeroBookCard
                code="CDG"
                city="Paris"
                label="Best Deal"
                className="absolute bottom-1/3 right-0"
                delay={1200}
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
          className="w-full h-12 md:h-16 fill-gray-50"
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

        @keyframes path-animation {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .path-animation {
          animation: path-animation 20s linear infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
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
    { code: "AirAsia", name: "AirAsia" },
    { code: "Garuda Indonesia", name: "Garuda Indonesia" },
    { code: "Singapore Airlines", name: "Singapore Airlines" },
    { code: "Qatar Airways", name: "Qatar Airways" },
    { code: "Emirates", name: "Emirates" },
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

  const today = new Date().toISOString().split("T")[0];

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
                <div
                  className="w-14 h-14 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 
      text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer 
      hover:shadow-xl transition-all duration-300 group overflow-hidden relative"
                  onClick={() => {
                    setSearchParams((prev) => ({
                      ...prev,
                      from: prev.to,
                      to: prev.from,
                    }));
                  }}
                >
                  {/* Background Glow on Hover */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 
      opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
                  ></div>

                  {/* Icon Container (Ensures Circle Stays Intact) */}
                  <div className="relative flex items-center justify-center w-full h-full">
                    <div className="flex items-center justify-center transition-transform duration-300">
                      <ArrowLeftRight
                        size={20}
                        className="group-hover:rotate-180 transition-transform duration-500"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>

                  {/* Text (Ensure it stays within the circle) */}
                  <span
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium 
      opacity-0 group-hover:opacity-100 group-hover:bottom-1 transition-all duration-300 text-white"
                  >
                    Swap
                  </span>
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
            <div className="relative group">
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
                  min={today}
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
            <div className="relative group">
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

interface Flight {
  flightNumber: string;
  airline: string;
  aircraft: string;
  departure: string;
  departureCode: string;
  departureDate: Date;
  departureHour: Date;
  arrival: string;
  arrivalCode: string;
  arrivalDate: Date;
  arrivalHour: Date;
  duration: number;
  price: number;
  availableSeats: number;
  amenities?: string[];
  rating?: number;
}

interface HookProps {
  flights: Flight[];
  loading: boolean;
  error: string | null;
  searched: boolean;
}

const FlightResults: React.FC<HookProps> = ({
  flights,
  loading,
  error,
  searched,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [sortOption, setSortOption] = useState<
    "price" | "duration" | "departure"
  >("price");
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);

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

  const handleSelectFlight = (flightNumber: string) => {
    if (!session) {
      router.push("/auth");
      return;
    }
    router.push(`/book/${flightNumber}`);
  };

  // Get unique airlines for filtering
  const airlines = [...new Set(flights.map((flight) => flight.airline))];

  // Filter and sort flights
  const filteredFlights = flights
    .filter(
      (flight) =>
        selectedAirlines.length === 0 ||
        selectedAirlines.includes(flight.airline)
    )
    .sort((a, b) => {
      if (sortOption === "price") return a.price - b.price;
      if (sortOption === "duration") return a.duration - b.duration;
      if (sortOption === "departure") {
        return (
          new Date(a.departureHour).getTime() -
          new Date(b.departureHour).getTime()
        );
      }
      return 0;
    });

  // Function to render amenity icons
  const renderAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi":
        return <Wifi size={16} />;
      case "food":
        return <Coffee size={16} />;
      case "entertainment":
        return <MonitorSmartphone size={16} />;
      case "baggage":
        return <BaggageClaim size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg mb-6 animate-in fade-in duration-300">
          {error}
        </div>
      )}

      {searched && !loading && flights.length === 0 && !error && (
        <div className="bg-warning/10 border border-warning/20 text-warning-foreground p-4 rounded-lg mb-6 animate-in fade-in duration-300">
          No flights found matching your criteria. Try adjusting your search
          parameters.
        </div>
      )}

      {loading ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-32" />
          </div>
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-6 border-b md:border-b-0 md:border-r border-border">
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="p-6 md:col-span-2 border-b md:border-b-0 md:border-r border-border">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <Skeleton className="h-8 w-20 mb-1" />
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-5 w-32" />
                      </div>
                      <div className="flex-1 px-4">
                        <Skeleton className="h-4 w-full mb-4" />
                        <Skeleton className="h-4 w-16 mx-auto" />
                      </div>
                      <div className="flex-1 text-right">
                        <Skeleton className="h-8 w-20 ml-auto mb-1" />
                        <Skeleton className="h-4 w-24 ml-auto mb-2" />
                        <Skeleton className="h-5 w-32 ml-auto" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-muted/30">
                    <Skeleton className="h-10 w-32 mb-2" />
                    <Skeleton className="h-4 w-24 mb-6" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : flights.length > 0 ? (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Available Flights
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* Sort options */}

              {/* Filter by airline */}
              {airlines.length > 1 && (
                <div className="flex items-center gap-2 ml-auto sm:ml-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    Airlines:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {airlines.map((airline) => (
                      <Badge
                        key={airline}
                        variant={
                          selectedAirlines.includes(airline)
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => {
                          if (selectedAirlines.includes(airline)) {
                            setSelectedAirlines(
                              selectedAirlines.filter((a) => a !== airline)
                            );
                          } else {
                            setSelectedAirlines([...selectedAirlines, airline]);
                          }
                        }}
                      >
                        {airline}
                      </Badge>
                    ))}
                    {selectedAirlines.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => setSelectedAirlines([])}
                      >
                        Clear
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <span className="text-sm text-muted-foreground">
                {filteredFlights.length}{" "}
                {filteredFlights.length === 1 ? "flight" : "flights"} found
              </span>
              {sortOption === "price" && filteredFlights.length > 0 && (
                <span className="text-sm font-medium text-primary">
                  Best price: $
                  {Math.min(...filteredFlights.map((f) => f.price)).toFixed(2)}
                </span>
              )}
            </div>

            {filteredFlights.map((flight, index) => {
              const departure = formatDateTime(
                flight.departureDate,
                flight.departureHour
              );
              const arrival = formatDateTime(
                flight.arrivalDate,
                flight.arrivalHour
              );
              const isLowestPrice =
                flight.price ===
                Math.min(...filteredFlights.map((f) => f.price));
              const isShortestDuration =
                flight.duration ===
                Math.min(...filteredFlights.map((f) => f.duration));

              return (
                <Card
                  key={flight.flightNumber}
                  className="overflow-hidden border-border hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-4">
                      {/* Airline Info */}
                      <div className="p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border relative">
                        {isLowestPrice && (
                          <Badge className="absolute -top-1 -left-1 bg-green-500 hover:bg-green-600">
                            Best Price
                          </Badge>
                        )}
                        {isShortestDuration && !isLowestPrice && (
                          <Badge className="absolute -top-1 -left-1 bg-blue-500 hover:bg-blue-600">
                            Fastest
                          </Badge>
                        )}

                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg font-bold text-primary">
                              {flight.airline}
                            </span>
                            {flight.rating && (
                              <div className="flex items-center text-amber-500">
                                <Star size={14} className="fill-current" />
                                <span className="text-xs ml-0.5">
                                  {flight.rating}
                                </span>
                              </div>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {flight.flightNumber}
                          </p>
                        </div>

                        <div className="mt-4 text-sm text-muted-foreground flex items-center">
                          <Plane size={14} className="mr-1 text-primary" />
                          {flight.aircraft}
                        </div>

                        {flight.amenities && flight.amenities.length > 0 && (
                          <div className="mt-3 flex gap-2">
                            <TooltipProvider>
                              {flight.amenities.map((amenity, i) => (
                                <Tooltip key={i}>
                                  <TooltipTrigger asChild>
                                    <div className="p-1.5 bg-muted rounded-md text-muted-foreground">
                                      {renderAmenityIcon(amenity)}
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="capitalize">{amenity}</p>
                                  </TooltipContent>
                                </Tooltip>
                              ))}
                            </TooltipProvider>
                          </div>
                        )}
                      </div>

                      {/* Flight Times */}
                      <div className="p-6 md:col-span-2 border-b md:border-b-0 md:border-r border-border">
                        <div className="flex items-center">
                          <div className="flex-1">
                            <p className="text-2xl font-bold">
                              {departure.time}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {departure.date}
                            </p>
                            <p className="font-medium mt-1 text-primary">
                              {flight.departure}{" "}
                              <span className="text-muted-foreground">
                                ({flight.departureCode})
                              </span>
                            </p>
                          </div>

                          <div className="flex flex-col items-center px-4">
                            <div className="text-muted-foreground text-sm flex items-center">
                              <Clock size={14} className="mr-1 text-primary" />
                              {formatDuration(flight.duration)}
                            </div>
                            <div className="relative py-4">
                              <div className="w-32 h-0.5 bg-gradient-to-r from-primary to-primary/60 my-1"></div>
                              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></div>
                              <Plane
                                size={16}
                                className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-primary/70"
                              />
                              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-primary/70"></div>
                            </div>
                            <div className="text-muted-foreground text-xs uppercase tracking-wider font-medium">
                              Direct
                            </div>
                          </div>

                          <div className="flex-1 text-right">
                            <p className="text-2xl font-bold">{arrival.time}</p>
                            <p className="text-sm text-muted-foreground">
                              {arrival.date}
                            </p>
                            <p className="font-medium mt-1 text-primary/80">
                              {flight.arrival}{" "}
                              <span className="text-muted-foreground">
                                ({flight.arrivalCode})
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Price and Booking */}
                      <div className="p-6 bg-muted/30 flex flex-col justify-between">
                        <div>
                          <p className="text-3xl font-bold text-primary">
                            ${flight.price.toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            per passenger
                          </p>
                        </div>

                        <div className="mt-4">
                          <div className="text-sm text-muted-foreground mb-3 flex items-center">
                            <Users size={14} className="mr-1 text-primary" />
                            <span className="font-medium">
                              {flight.availableSeats}
                            </span>{" "}
                            seats left
                          </div>
                          <Button
                            className="w-full group"
                            onClick={() =>
                              handleSelectFlight(flight.flightNumber)
                            }
                          >
                            Select Flight
                            <ArrowRight
                              size={16}
                              className="ml-1 transition-transform group-hover:translate-x-1"
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ) : null}
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
      <FlightResults
        flights={flights}
        setFlights={setFlights}
        error={error}
        setError={setError}
        loading={loading}
        setLoading={setLoading}
        searched={searched}
        setSearched={setSearched}
      />
    </div>
  );
}
