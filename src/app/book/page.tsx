"use client";

import React, { useState } from "react";
import { Calendar, MapPin, Plane, Filter, ArrowRight } from "lucide-react";
import Button from "@/components/ui/button";
import ModernHeroSection from "@/components/ui/hero";
import FlightCard from "@/components/card/airplane_card";

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
    route: "CGK-DPS", // Properti yang hilang ditambahkan
    date: "2025-03-01T08:00:00Z" //
  },
];

const FlightListings = () => (
  <div className="bg-gray-50 py-16">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-4">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>

            <div className="space-y-4">
              {["Price Range", "Stops", "Airlines", "Duration"].map((filter) => (
                <div key={filter} className="border-b border-gray-100 pb-4">
                  <h3 className="text-sm font-medium mb-3">{filter}</h3>
                  <select className="w-full p-2 rounded-lg border border-gray-200 text-sm">
                    <option>All {filter}</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Flight List */}
        <div className="lg:w-3/4">
          <div className="space-y-6">
            {flights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const BookingPage = () => (
  <div className="min-h-screen bg-gray-50">
    <ModernHeroSection />
    <FlightListings />
  </div>
);

export default BookingPage;
