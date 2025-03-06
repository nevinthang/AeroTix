"use client";

import TravelSearchForm from "@/components/form/travel_form";
import BlurCircle from "@/components/ui/blur_circle";
import React, { useEffect, useState } from "react";

interface Flight {
  id: string;
  airline: string;
  source: string;
  destination: string;
  route: string;
  depTime: string;
  arrivalTime: string;
  duration: string;
  totalStops: number;
  additionalInfo?: string;
  price: string;
  date: string;
  logoUrl?: string;
}

function Book() {
  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Background blur elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>

        {/* Content container */}
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Explore The{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Horizons
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-gray-600 max-w-2xl text-lg">
            Your journey to extraordinary destinations begins with a single
            search
          </p>
          <TravelSearchForm/>
        </div>
      </div>
    </div>
  );
}

export default Book;
