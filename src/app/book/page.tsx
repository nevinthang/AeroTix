"use client";

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
    <div className="min-h-screen bg-gradient-main">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="absolute inset-0 overflow-hidden">
          <BlurCircle />
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="mt-10 text-8xl font-bold text-center gap-4 z-10">
            Explore{"  "}
            <span className="bg-gradient-to-b from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Beyond
            </span>
            <br />
            Horizons
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-normal">
              Your journey to extraordinary destinations begins with a single
              search
            </p>
          </div>
          {/*Filters*/}
          <div className="relative">
            {/* Glowing effect behind card */}
             
            {/* Main card */}
            <div className="relative bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100">
              alsdjiasljdlaisjdasilj
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
