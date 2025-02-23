import React from 'react';
import AirplaneCard from '@/components/airplane_card'; // Ensure this path is correct
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaPlane, FaFilter } from 'react-icons/fa';

// Sample flight data
const flights = [
  {
    id: 'FL123',
    airline: 'Delta',
    dateofJourney: '2023-04-15',
    source: 'JFK',
    destination: 'LAX',
    depTime: '14:30',
    arrivalTime: '17:45',
    duration: '3h 15m',
    totalStops: 0,
    additionalInfo: 'Meal included',
    price: '$250',
  },
  {
    id: 'FL124',
    airline: 'United',
    dateofJourney: '2023-04-16',
    source: 'SFO',
    destination: 'ORD',
    depTime: '09:00',
    arrivalTime: '15:30',
    duration: '4h 30m',
    totalStops: 1,
    additionalInfo: 'Free Wi-Fi',
    price: '$320',
  },
];

// Hero Section
const HeroSection: React.FC = () => (
  <div className="relative bg-gradient-to-br from-primary via-secondary to-bluelight text-white py-28 overflow-hidden">
    {/* Background Overlay */}
    <div className="absolute inset-0 bg-black opacity-15" />
    <svg
      className="absolute bottom-0 left-0 w-full h-32 text-background"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill="currentColor"
        d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,213.3C840,203,960,149,1080,149.3C1200,149,1320,203,1380,229.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
      />
    </svg>

    {/* Main Content */}
    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center">
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold font-sans leading-tight mb-6">
          <span className="block text-white">Your</span>
          <span className="block text-bluethin bg-white bg-opacity-20 px-4 py-2 rounded-lg inline-block transform -rotate-2">
            Journey
          </span>
          <span className="block text-white">Begins Now</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl font-sans text-bluethin mb-10 max-w-2xl mx-auto">
          Soar to your next adventure with seamless booking and unbeatable deals.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 flex-col sm:flex-row">
          <button className="relative bg-white text-primary px-8 py-4 rounded-full font-semibold font-sans shadow-lg hover:bg-bluelight hover:shadow-xl transition duration-300 ease-in-out group">
            <span className="relative z-10">Book Now</span>
            <span className="absolute bottom-0 left-1/2 h-1 w-0 bg-secondary transform -translate-x-1/2 group-hover:w-3/4 transition-all duration-300 ease-in-out" />
          </button>
          <button className="bg-transparent border-2 border-bluelight text-white px-6 py-3 rounded-full font-semibold font-sans hover:bg-bluelight hover:text-primary transition duration-300 ease-in-out">
            Explore Destinations
          </button>
        </div>
      </div>

      {/* Creative Element: Floating Plane */}
      <div className="absolute top-10 right-10 hidden md:block">
        <FaPlane className="text-bluethin text-5xl opacity-50 transform rotate-45" />
      </div>
    </div>

    {/* Decorative Line */}
    <div className="absolute top-1/4 left-0 w-1/3 h-1 bg-bluelight opacity-30 transform -skew-y-12" />
  </div>
);

// Search and Filter
const SearchFilter: React.FC = () => (
  <div className="container mx-auto px-4 -mt-16 relative z-20">
    <div className="bg-white p-6 rounded-xl shadow-xl border border-bluelight">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative">
          <FaPlaneDeparture className="absolute top-1/2 left-3 transform -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="From"
            className="w-full pl-10 p-3 border border-bluelight rounded-lg text-text font-sans focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition duration-200 ease-in-out"
          />
        </div>
        <div className="relative">
          <FaPlaneArrival className="absolute top-1/2 left-3 transform -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="To"
            className="w-full pl-10 p-3 border border-bluelight rounded-lg text-text font-sans focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition duration-200 ease-in-out"
          />
        </div>
        <div className="relative">
          <FaCalendarAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-secondary" />
          <input
            type="date"
            className="w-full pl-10 p-3 border border-bluelight rounded-lg text-text font-sans focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition duration-200 ease-in-out"
          />
        </div>
        <div className="relative">
          <FaCalendarAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-secondary" />
          <input
            type="date"
            className="w-full pl-10 p-3 border border-bluelight rounded-lg text-text font-sans focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition duration-200 ease-in-out"
          />
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold font-sans hover:bg-secondary hover:shadow-md transition duration-300 ease-in-out">
          Search Flights
        </button>
      </div>
      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <select className="p-3 border border-bluelight rounded-lg text-text font-sans focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition duration-200 ease-in-out">
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
        <select className="p-3 border border-bluelight rounded-lg text-text font-sans focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition duration-200 ease-in-out">
          <option>Stops: Any</option>
          <option>Stops: Non-stop</option>
          <option>Stops: 1 Stop</option>
        </select>
        <select className="p-3 border border-bluelight rounded-lg text-text font-sans focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition duration-200 ease-in-out">
          <option>Airlines: All</option>
          <option>Airlines: Delta</option>
          <option>Airlines: United</option>
        </select>
      </div>
    </div>
  </div>
);

// Flight Listings
const FlightListings: React.FC = () => (
  <div className="container mx-auto px-4 py-12">
    <h2 className="text-3xl font-bold text-text mb-8 font-sans text-center">
      Available Flights
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {flights.map((flight) => (
        <div
          key={flight.id}
          className="bg-gradient-to-br from-white to-bluethin p-1 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out"
        >
          <AirplaneCard {...flight} />
        </div>
      ))}
    </div>
  </div>
);

// Main Booking Page
const BookingPage: React.FC = () => {
  return (
    <div className="font-sans bg-background min-h-screen">
      <HeroSection />
      <SearchFilter />
      <FlightListings />
    </div>
  );
};

export default BookingPage;