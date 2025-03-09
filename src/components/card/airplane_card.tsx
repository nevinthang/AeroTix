"use client";

import React, { useState } from 'react';
import { Plane, Clock, CalendarDays, CreditCard, Map, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

interface Flight {
  id: string;
  airline: string;
  source: string;
  sourceCode: string;
  destination: string;
  destinationCode: string;
  route: string;
  depTime: string;
  arrivalTime: string;
  duration: string;
  totalStops: number;
  additionalInfo?: string;
  price: string;
  date: string;
  terminal?: string;
  gate?: string;
  boardingTime?: string;
  logoUrl?: string;
  seatClass?: string;
}

interface FlightTicketCardProps {
  flight: Flight;
  onBook?: () => void;
}

const FlightTicketCard: React.FC<FlightTicketCardProps> = ({ 
  flight = {
    id: "FL328",
    airline: "SkyWings",
    source: "New York",
    sourceCode: "NYC",
    destination: "San Francisco",
    destinationCode: "SFO",
    route: "NYC → SFO",
    depTime: "08:45 AM",
    arrivalTime: "12:30 PM",
    duration: "3h 45m",
    totalStops: 0,
    price: "$299",
    date: "Mar 15, 2025",
    terminal: "T2",
    gate: "G12",
    boardingTime: "08:15 AM",
    seatClass: "Economy"
  },
  onBook = () => console.log("Booking flight:", flight.id)
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div 
      className={`max-w-md mx-auto bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${isHovered ? 'shadow-xl shadow-purple-200' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient header */}
      <div className="relative h-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
        <div className="absolute inset-0 bg-white opacity-20 bg-[radial-gradient(circle,_transparent_8px,_white_8px)] bg-repeat-x bg-[length:16px_16px]"></div>
      </div>
      
      {/* Ticket header with animated gradient */}
      <div className={`pt-5 pb-4 px-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white relative overflow-hidden transition-all duration-500`}>
        {/* Animated background elements */}
        <div className={`absolute top-0 left-0 w-full h-full opacity-20 transition-transform duration-1000 ${isHovered ? 'scale-110' : 'scale-100'}`}>
          <div className="absolute top-8 left-8 w-16 h-16 bg-white rounded-full blur-xl opacity-20"></div>
          <div className="absolute bottom-4 right-12 w-24 h-24 bg-white rounded-full blur-xl opacity-20"></div>
        </div>
        
        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center gap-3">
            {flight.logoUrl ? (
              <img 
                src={flight.logoUrl} 
                alt={`${flight.airline} logo`}
                className={`w-10 h-10 rounded-full bg-white p-1 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
              />
            ) : (
              <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
                <Plane className="w-6 h-6 text-indigo-600" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold">{flight.airline}</h3>
              <p className="text-sm text-blue-100">Flight {flight.id}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="relative">
              <p className={`text-2xl font-bold transition-all duration-300 ${isHovered ? 'text-white' : ''}`}>
                {flight.price}
                {isHovered && (
                  <Sparkles className="absolute -right-6 -top-1 w-4 h-4 text-yellow-300 animate-pulse" />
                )}
              </p>
            </div>
            <p className="text-sm text-blue-100">{flight.seatClass || "Economy"}</p>
          </div>
        </div>
      </div>
      
      {/* Flight route with animated plane */}
      <div className="px-6 py-5">
        <div className="flex items-start">
          {/* Departure */}
          <div className="flex-1">
            <p className="font-mono text-3xl font-bold text-gray-800">{flight.sourceCode}</p>
            <p className="mt-1 text-sm text-gray-600">{flight.source}</p>
            <div className="mt-2 flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <p className="text-sm font-medium text-gray-700">{flight.depTime}</p>
            </div>
            {flight.terminal && flight.gate && (
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-gray-500">Terminal {flight.terminal}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-xs text-gray-500">Gate {flight.gate}</span>
              </div>
            )}
          </div>
          
          {/* Flight path visualization with animated plane */}
          <div className="flex-1 px-2 flex flex-col items-center">
            <div className="relative w-full flex items-center justify-center py-2">
              <div className="absolute w-full border-t-2 border-dashed border-indigo-200"></div>
              <div className={`relative bg-white px-1 transition-all duration-1000 ${isHovered ? 'translate-x-4' : ''}`}>
                <Plane 
                  className={`w-5 h-5 text-indigo-600 transform rotate-90 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} 
                />
              </div>
            </div>
            <div className="text-xs font-medium text-gray-500 text-center">{flight.duration}</div>
            <div className={`mt-1 px-2 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${isHovered ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
              {flight.totalStops === 0 ? "Direct Flight" : `${flight.totalStops} Stop${flight.totalStops > 1 ? 's' : ''}`}
            </div>
          </div>
          
          {/* Arrival */}
          <div className="flex-1 text-right">
            <p className="font-mono text-3xl font-bold text-gray-800">{flight.destinationCode}</p>
            <p className="mt-1 text-sm text-gray-600">{flight.destination}</p>
            <div className="mt-2 flex items-center gap-1 justify-end">
              <Clock className="w-4 h-4 text-gray-400" />
              <p className="text-sm font-medium text-gray-700">{flight.arrivalTime}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ticket details with expandable section */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-dashed border-indigo-200">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <CalendarDays className={`w-4 h-4 transition-colors duration-300 ${isHovered ? 'text-purple-400' : 'text-blue-400'}`} />
            <span className="text-sm text-gray-700">{flight.date}</span>
          </div>
          {flight.boardingTime && (
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 transition-colors duration-300 ${isHovered ? 'text-purple-400' : 'text-blue-400'}`} />
              <span className="text-sm text-gray-700">Boarding: {flight.boardingTime}</span>
            </div>
          )}
          {flight.additionalInfo && (
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-gray-700">{flight.additionalInfo}</span>
            </div>
          )}

          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center gap-1 text-xs font-medium transition-colors duration-300 ${isHovered ? 'text-purple-500' : 'text-blue-500'}`}
          >
            {isExpanded ? 'Show less' : 'Show more'}
            <ArrowRight className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Expandable content */}
        <div className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col gap-2">
            <div className="p-3 rounded-lg bg-white border border-indigo-100 flex items-center gap-3">
              <Map className={`w-5 h-5 transition-colors duration-300 ${isHovered ? 'text-purple-500' : 'text-blue-500'}`} />
              <div>
                <p className="text-xs text-gray-500">Flight Route</p>
                <p className="text-sm font-medium text-gray-700">{flight.route}</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white border border-indigo-100">
              <p className="text-xs text-gray-500 mb-1">Travel Notes</p>
              <p className="text-sm text-gray-700">Please arrive at the airport 2 hours before departure. Baggage allowance: 1 check-in bag (23kg)</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action button with animation */}
      <div className="px-6 py-4 border-t border-indigo-100">
        <button 
          onClick={onBook}
          className={`w-full py-3 font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
            isHovered 
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-purple-200' 
              : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
          }`}
        >
          <CreditCard className={`w-5 h-5 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} />
          <span className={`transition-all duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
            Book This Flight
          </span>
        </button>
      </div>
      
      {/* Tear line at bottom */}
      <div className="relative h-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
        <div className="absolute inset-0 bg-white opacity-20 bg-[radial-gradient(circle,_transparent_8px,_white_8px)] bg-repeat-x bg-[length:16px_16px]"></div>
      </div>
    </div>
  );
};

export default FlightTicketCard;