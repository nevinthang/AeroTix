"use client";

import React from 'react';
import { Plane, Clock, Info } from 'lucide-react';

interface Flight {
  id: string;
  airline: string;
  source: string;
  destination: string;
  depTime: string;
  arrivalTime: string;
  duration: string;
  totalStops: number;
  additionalInfo?: string;
  price: string;
  date: string;
  logoUrl?: string;
}

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  return (
    <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Header with Airline and Price */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-3">
          {flight.logoUrl ? (
            <img 
              src={flight.logoUrl} 
              alt={`${flight.airline} logo`}
              className="w-10 h-10 rounded-lg object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Plane className="w-6 h-6 text-blue-600" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {flight.airline}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">Flight {flight.id}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="text-sm text-gray-500">{flight.date}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600 group-hover:scale-105 transition-transform">
            {flight.price}
          </p>
          <p className="text-sm text-gray-500">per person</p>
        </div>
      </div>

      {/* Flight Route Visualization */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1">
          <p className="text-2xl font-bold text-gray-900">{flight.source}</p>
          <div className="flex items-center gap-2 mt-1">
            <Clock className="w-4 h-4 text-gray-400" />
            <p className="text-sm text-gray-500">{flight.depTime}</p>
          </div>
        </div>

        <div className="flex-1 relative px-4">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-full border-t-2 border-dashed border-gray-200" />
            <div className="bg-white px-2 py-1 rounded-full border border-gray-100 shadow-sm relative">
              <Plane 
                className="w-5 h-5 text-blue-600 transform rotate-90 group-hover:translate-x-2 transition-transform" 
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 text-center mt-2">{flight.duration}</p>
        </div>

        <div className="flex-1 text-right">
          <p className="text-2xl font-bold text-gray-900">{flight.destination}</p>
          <div className="flex items-center gap-2 justify-end mt-1">
            <Clock className="w-4 h-4 text-gray-400" />
            <p className="text-sm text-gray-500">{flight.arrivalTime}</p>
          </div>
        </div>
      </div>

      {/* Footer with Additional Info and Action */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <span className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${flight.totalStops === 0 
              ? 'bg-green-50 text-green-600' 
              : 'bg-blue-50 text-blue-600'}
          `}>
            {flight.totalStops === 0 ? "Direct Flight" : `${flight.totalStops} Stop`}
          </span>
          {flight.additionalInfo && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Info className="w-4 h-4" />
              <span>{flight.additionalInfo}</span>
            </div>
          )}
        </div>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium 
          hover:bg-blue-700 transition-colors duration-200 
          focus:outline-none focus:ring-4 focus:ring-blue-200">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default FlightCard;