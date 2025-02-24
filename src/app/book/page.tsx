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
  },
];

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("roundtrip");

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-screen overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute top-10 right-10 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl" />
          <div className="absolute top-40 right-40 w-96 h-96 bg-indigo-200 rounded-full opacity-20 blur-3xl" />
        </div>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Discover Your Next Adventure</h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">Seamless booking experience for your journey to anywhere in the world</p>
          </div>

          {/* Search Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-lg backdrop-filter">
            {/* Flight Type Tabs */}
            <div className="flex gap-4 mb-8">
              {["roundtrip", "oneway", "multicity"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Search Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">From</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 w-5 h-5" />
                  <input type="text" placeholder="Departure City" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-100 transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">To</label>
                <div className="relative">
                  <Plane className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 w-5 h-5" />
                  <input type="text" placeholder="Arrival City" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-100 transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Departure</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 w-5 h-5" />
                  <input type="date" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-100 transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Return</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 w-5 h-5" />
                  <input type="date" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-100 transition-all" />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button text="Search Flights" showArrow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
