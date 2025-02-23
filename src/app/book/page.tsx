import React from 'react';
import AirplaneCard from '@/components/airplane_card'; // Ensure this path is correct
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt } from 'react-icons/fa';

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
  <div className="relative bg-gradient-to-r from-primary to-secondary text-white py-24 overflow-hidden">
    <div className="absolute inset-0 bg-black opacity-10" />
    <div className="container mx-auto px-4 text-center relative z-10">
      <h1 className="text-5xl md:text-6xl font-bold mb-4 font-sans leading-tight">
        Your Journey Starts Here
      </h1>
      <p className="text-xl md:text-2xl mb-8 font-sans text-bluethin">
        Find the perfect flight with ease and comfort.
      </p>
      <button className="bg-white text-primary px-8 py-4 rounded-full font-semibold font-sans shadow-lg hover:bg-bluelight hover:shadow-xl transition duration-300 ease-in-out">
        Start Exploring
      </button>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-background transform -skew-y-6" />
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