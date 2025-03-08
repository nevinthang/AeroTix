import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CabinPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-96">
        <Image 
          src="/hero2.png" 
          alt="Hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Experience Comfort at Every Level</h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Choose the cabin that suits your travel style and budget
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* First Class Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold border-b-2 border-gray-300 pb-2 mb-8">First Class</h2>
          
          {/* Emirates A380 First Class */}
          <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="md:w-1/2 relative">
              <div className="relative w-full h-72 md:h-full">
                <Image 
                  src="/first_class.jpg" 
                  alt="First Class"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-4">About First Class</h3>
                <p className="text-gray-600 mb-6">
                First Class offers the most luxurious and exclusive flying experience. Passengers enjoy spacious, fully reclining seats or private suites, premium dining with gourmet meals, personalized service, and exclusive lounge access. Additional perks may include priority check-in, extra baggage allowance, and high-end amenities for ultimate comfort.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Class Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold border-b-2 border-gray-300 pb-2 mb-8">Business Class</h2>
          
          <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="md:w-1/2 relative">
              <div className="relative w-full h-72 md:h-full">
                <Image 
                  src="/business_class.jpg" 
                  alt="Business Class"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-4">About Business Class</h3>
                
                <p className="text-gray-600 mb-6">
                Business Class provides a premium experience with enhanced comfort and services. Passengers enjoy spacious reclining seats, gourmet meals, priority check-in, and access to airport lounges. The class is ideal for business travelers or those seeking a more relaxing journey with extra legroom, in-flight entertainment, and premium amenities.
                </p>          
              </div>
            </div>
          </div>
        </div>

        {/* Premium Economy Class Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold border-b-2 border-gray-300 pb-2 mb-8">Premium Economy Class</h2>
          
          <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:w-1/2 relative">
              <div className="relative w-full h-72 md:h-full">
                <Image 
                  src="/premium.jpg" 
                  alt="Premium Economy Class"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-4">About Premium Economy Class</h3>
              
                <p className="text-gray-600 mb-6">
                Premium Economy Class offers a step up from Economy with extra legroom, wider seats, and enhanced meal options. Passengers may also enjoy priority boarding, additional baggage allowance, and improved entertainment options, providing a more comfortable travel experience at an affordable price.
                </p>      
              </div>
            </div>
          </div>
        </div>

        {/* Economy Class Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold border-b-2 border-gray-300 pb-2 mb-8">Economy Class</h2>
          
          <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden mb-8">
          </div>

          <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between order-2 md:order-1">
              <div>
                <h3 className="text-2xl font-bold mb-4">About Economy Class</h3>
                <p className="text-gray-600 mb-6">
                Economy Class is the most budget-friendly option, offering standard seating with basic amenities. Passengers receive in-flight entertainment, meal services (depending on the airline), and a comfortable but compact seating arrangement. It is the most common and cost-effective choice for travelers.
                </p>
                
              </div>
        
            </div>
            <div className="md:w-1/2 relative order-1 md:order-2">
              <div className="relative w-full h-72 md:h-full">
                <Image 
                  src="/economy.jpg" 
                  alt="Boeing 777 Economy Class"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center" aria-label="Play video">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className="w-full rounded-lg overflow-hidden shadow-lg mt-10">
          <div className="relative w-full h-72">
            <Image 
              src="/banner1.png" 
              alt="Book now"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-blue-900/40 flex items-center">
              <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
                <div className="text-white md:w-2/3">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">Secure your ticket now</h2>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">with various attractive promotions</h3>
                </div>
                <div className="mt-4 md:mt-0">
                  <a href="/book" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition duration-300">
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabinPage;