import React from "react";
import AirplaneCard from "@/components/airplane_card"; // Pastikan path ini benar

// Sample flight data
const flights = [
  {
    id: "FL123",
    airline: "Delta",
    dateofJourney: "2023-04-15",
    source: "JFK",
    destination: "LAX",
    depTime: "14:30",
    arrivalTime: "17:45",
    duration: "3h 15m",
    totalStops: 0,
    additionalInfo: "Meal included",
    price: "$250",
  },
  {
    id: "FL124",
    airline: "United",
    dateofJourney: "2023-04-16",
    source: "SFO",
    destination: "ORD",
    depTime: "09:00",
    arrivalTime: "15:30",
    duration: "4h 30m",
    totalStops: 1,
    additionalInfo: "Free Wi-Fi",
    price: "$320",
  },
];

// Hero Section Component
const HeroSection: React.FC = () => (
  <div className="bg-primary text-white py-20 text-center">
    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans">
      Book Your Next Journey
    </h1>
    <p className="text-lg md:text-xl mb-8 font-sans">
      Discover flights tailored to your needs.
    </p>
    <button className="bg-secondary text-white px-6 py-3 rounded-full font-semibold font-sans">
      Explore Flights
    </button>
  </div>
);

// Search and Filter Component
const SearchFilter: React.FC = () => (
  <div className="bg-background p-6 rounded-lg shadow-md mb-8">
    <div className="flex flex-col md:flex-row flex-wrap gap-4">
      <input
        type="text"
        placeholder="From"
        className="flex-1 p-2 border border-bluelight rounded text-text font-sans focus:outline-none focus:ring-2 focus:ring-secondary"
      />
      <input
        type="text"
        placeholder="To"
        className="flex-1 p-2 border border-bluelight rounded text-text font-sans focus:outline-none focus:ring-2 focus:ring-secondary"
      />
      <input
        type="date"
        className="flex-1 p-2 border border-bluelight rounded text-text font-sans focus:outline-none focus:ring-2 focus:ring-secondary"
      />
      <input
        type="date"
        className="flex-1 p-2 border border-bluelight rounded text-text font-sans focus:outline-none focus:ring-2 focus:ring-secondary"
      />
      <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition duration-300 font-sans">
        Search Flights
      </button>
    </div>
    <div className="mt-4 flex flex-col md:flex-row gap-4">
      <select className="p-2 border border-bluelight rounded text-text font-sans focus:outline-none focus:ring-2 focus:ring-secondary">
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
      </select>
      <select className="p-2 border border-bluelight rounded text-text font-sans focus:outline-none focus:ring-2 focus:ring-secondary">
        <option>Stops: Any</option>
        <option>Stops: Non-stop</option>
        <option>Stops: 1 Stop</option>
      </select>
      <select className="p-2 border border-bluelight rounded text-text font-sans focus:outline-none focus:ring-2 focus:ring-secondary">
        <option>Airlines: All</option>
        <option>Airlines: Delta</option>
        <option>Airlines: United</option>
      </select>
    </div>
  </div>
);

// Flight Listings Component
const FlightListings: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {flights.map((flight) => (
      <div key={flight.id}>
        <AirplaneCard {...flight} />
      </div>
    ))}
  </div>
);

// Main Booking Page Component
const BookingPage: React.FC = () => {
  return (
    <div className="font-sans bg-background min-h-screen">
      <HeroSection />
      <div className="container mx-auto py-8 px-4">
        <SearchFilter />
        <FlightListings />
      </div>
    </div>
  );
};

export default BookingPage;
