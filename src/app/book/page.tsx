'use client';

import { useState, useEffect } from 'react';
import { Calendar, Search, MapPin, Clock, Plane, Users, DollarSign, Type, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

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

// AnimatedBubbles component for client-side only rendering
function AnimatedBubbles() {
  const [bubbles, setBubbles] = useState<Array<{
    top: string;
    left: string;
    width: string;
    height: string;
    opacity: number;
    animation: string;
  }>>([]);

  useEffect(() => {
    // Generate bubble styles only on the client
    const newBubbles = [...Array(20)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 60 + 10}px`,
      height: `${Math.random() * 60 + 10}px`,
      opacity: Math.random() * 0.3,
      animation: `float ${Math.random() * 10 + 10}s linear infinite`
    }));
    
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-0 w-full h-full">
        {bubbles.map((style, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white"
            style={style}
          />
        ))}
      </div>
    </div>
  );
}

export default function FlightBookingPage() {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    passengers: 1,
    airline: '',
    maxPrice: ''
  });
  
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  // Set isMounted to true after the component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const airports = [
    { code: 'CGK', name: 'Jakarta' },
    { code: 'JFK', name: 'New York' },
    { code: 'DXB', name: 'Dubai' },
    { code: 'MAD', name: 'Madrid' },
    { code: 'HND', name: 'Tokyo' },
    { code: 'LHR', name: 'London' },
    { code: 'SYD', name: 'Sydney'}
  ];
  
  const airlines = [
    { code: 'AA', name: 'American Airlines' },
    { code: 'DL', name: 'Delta Air Lines' },
    { code: 'UA', name: 'United Airlines' },
    { code: 'BA', name: 'British Airways' },
    { code: 'LH', name: 'Lufthansa' },
    { code: 'EK', name: 'Emirates' }
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
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
        ...(searchParams.maxPrice && { maxPrice: searchParams.maxPrice })
      }).toString();
      
      const response = await fetch(`/api/flights?${queryString}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }
      
      const data = await response.json();
      setFlights(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching flights:', err);
    } finally {
      setLoading(false);
    }
  };
  
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
      date: format(date, 'EEE, MMM d'),
      time: format(time, 'h:mm a')
    };
  }
  
  return (
    <div className="bg-gray-50 min-h-screen pb-12 overflow-x-hidden">
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-6 relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Only render animated bubbles on the client side */}
          {isMounted && <AnimatedBubbles />}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1 flex items-center">
                <Plane className="mr-2" /> SkyScanner
              </h1>
              <p className="text-sm text-blue-100">Find your perfect flight</p>
            </div>
            <div className="flex space-x-4">
              <button className="text-sm font-medium hover:text-white text-blue-100 transition-colors">
                Sign In
              </button>
              <button className="text-sm bg-white text-purple-600 px-4 py-1 rounded-full font-medium hover:bg-blue-50 transition-colors">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Form */}
      <div className="container mx-auto px-4 -mt-6">
        <div 
          className="bg-white rounded-xl shadow-xl p-6 transform translate-y-0 opacity-100 transition-all duration-500 ease-out"
          style={{ 
            transform: isFormVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: isFormVisible ? 1 : 0
          }}
        >
          <form onSubmit={searchFlights} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2 group">
                <label className="flex items-center gap-2 font-medium text-gray-700 group-focus-within:text-purple-600 transition-colors">
                  <MapPin size={18} className="text-blue-500 group-focus-within:text-purple-600 transition-colors" /> 
                  From
                </label>
                <select 
                  name="from" 
                  value={searchParams.from} 
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  required
                >
                  <option value="">Select departure airport</option>
                  {airports.map(airport => (
                    <option key={`from-${airport.code}`} value={airport.code}>
                      {airport.name} ({airport.code})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2 group">
                <label className="flex items-center gap-2 font-medium text-gray-700 group-focus-within:text-purple-600 transition-colors">
                  <MapPin size={18} className="text-blue-500 group-focus-within:text-purple-600 transition-colors" /> 
                  To
                </label>
                <select 
                  name="to" 
                  value={searchParams.to} 
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  required
                >
                  <option value="">Select arrival airport</option>
                  {airports.map(airport => (
                    <option key={`to-${airport.code}`} value={airport.code}>
                      {airport.name} ({airport.code})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2 group">
                <label className="flex items-center gap-2 font-medium text-gray-700 group-focus-within:text-purple-600 transition-colors">
                  <Calendar size={18} className="text-blue-500 group-focus-within:text-purple-600 transition-colors" /> 
                  Date
                </label>
                <input 
                  type="date" 
                  name="date" 
                  value={searchParams.date} 
                  onChange={handleInputChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  required
                />
              </div>
              
              <div className="space-y-2 group">
                <label className="flex items-center gap-2 font-medium text-gray-700 group-focus-within:text-purple-600 transition-colors">
                  <Users size={18} className="text-blue-500 group-focus-within:text-purple-600 transition-colors" /> 
                  Passengers
                </label>
                <input 
                  type="number" 
                  name="passengers" 
                  value={searchParams.passengers} 
                  onChange={handleInputChange} 
                  min="1" 
                  max="10"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  required
                />
              </div>
              
              <div className="space-y-2 group">
                <label className="flex items-center gap-2 font-medium text-gray-700 group-focus-within:text-purple-600 transition-colors">
                  <Plane size={18} className="text-blue-500 group-focus-within:text-purple-600 transition-colors" /> 
                  Airline (Optional)
                </label>
                <select 
                  name="airline" 
                  value={searchParams.airline} 
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                >
                  <option value="">Any airline</option>
                  {airlines.map(airline => (
                    <option key={airline.code} value={airline.code}>
                      {airline.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2 group">
                <label className="flex items-center gap-2 font-medium text-gray-700 group-focus-within:text-purple-600 transition-colors">
                  <DollarSign size={18} className="text-blue-500 group-focus-within:text-purple-600 transition-colors" /> 
                  Max Price (Optional)
                </label>
                <input 
                  type="number" 
                  name="maxPrice" 
                  value={searchParams.maxPrice} 
                  onChange={handleInputChange}
                  placeholder="Maximum price"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="flex justify-center">
              <button 
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-103 active:scale-98"
                disabled={loading}
              >
                <Search size={20} />
                {loading ? 'Searching...' : 'Search Flights'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Results Section */}
      <div className="container mx-auto px-4 mt-8">
        {error && (
          <div 
            className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4 shadow-sm opacity-0 animate-fadeIn"
            style={{ animation: 'fadeIn 0.3s ease-out forwards' }}
          >
            {error}
          </div>
        )}
        
        {searched && !loading && flights.length === 0 && !error && (
          <div 
            className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg shadow-sm opacity-0 animate-fadeIn"
            style={{ animation: 'fadeIn 0.3s ease-out forwards' }}
          >
            No flights found matching your criteria. Try adjusting your search parameters.
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
          <div className="space-y-6 opacity-0 animate-fadeIn" style={{ animation: 'fadeIn 0.5s ease-out forwards' }}>
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
                const departure = formatDateTime(flight.departureDate, flight.departureHour);
                const arrival = formatDateTime(flight.arrivalDate, flight.arrivalHour);
                
                return (
                  <div 
                    key={flight.flightNumber}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 opacity-0 transition-all duration-500 hover:shadow-lg hover:translate-y-px"
                    style={{ 
                      animation: `fadeSlideUp 0.5s ease-out ${index * 0.1}s forwards`
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
                            <p className="text-sm text-gray-500">{departure.date}</p>
                            <p className="font-medium mt-1 text-blue-500">{flight.departure} <span className="text-gray-500">({flight.departureCode})</span></p>
                          </div>
                          
                          <div className="flex flex-col items-center px-4">
                            <div className="text-gray-400 text-sm flex items-center">
                              <Clock size={14} className="mr-1 text-purple-500" />
                              {formatDuration(flight.duration)}
                            </div>
                            <div className="relative py-4">
                              <div className="w-32 h-px bg-gradient-to-r from-blue-500 to-purple-500 my-1"></div>
                              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"></div>
                              <Plane size={16} className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-purple-400" />
                              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-purple-500"></div>
                            </div>
                            <div className="text-gray-400 text-xs uppercase tracking-wider font-medium">Direct</div>
                          </div>
                          
                          <div className="flex-1 text-right">
                            <p className="text-2xl font-bold">{arrival.time}</p>
                            <p className="text-sm text-gray-500">{arrival.date}</p>
                            <p className="font-medium mt-1 text-purple-500">{flight.arrival} <span className="text-gray-500">({flight.arrivalCode})</span></p>
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
                            <span className="font-medium">{flight.availableSeats}</span> seats left
                          </div>
                          <button 
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-102 active:scale-98 flex items-center justify-center"
                          >
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
      </div>
      
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
      
      {/* CSS Animations */}
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
}