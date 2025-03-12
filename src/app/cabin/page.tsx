import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CabinPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
     {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white pt-20 pb-32 relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Original blur elements */}
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl"></div>
          <div className="absolute top-40 left-1/4 w-32 h-32 rounded-full bg-blue-300/10 blur-xl"></div>
          <div className="absolute bottom-40 right-1/4 w-40 h-40 rounded-full bg-purple-400/10 blur-xl"></div>
          <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2 w-24 h-24 bg-white opacity-5 rounded-full blur-lg"></div>
          
          {/* Added animated bubbles with blur effect */}
          <div className="absolute top-24 left-10 w-20 h-20 rounded-full bg-white/10 blur-xl animate-pulse"></div>
          <div className="absolute top-1/4 right-1/3 w-16 h-16 rounded-full bg-blue-200/15 blur-lg animate-bounce" style={{animationDuration: '6s'}}></div>
          <div className="absolute bottom-1/3 left-1/3 w-28 h-28 rounded-full bg-purple-300/10 blur-xl animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute top-2/3 right-20 w-12 h-12 rounded-full bg-white/5 blur-md animate-bounce" style={{animationDuration: '7s'}}></div>
          <div className="absolute top-1/2 left-20 w-14 h-14 rounded-full bg-blue-100/10 blur-lg animate-pulse" style={{animationDuration: '5s'}}></div>
          
          {/* Additional floating elements */}
          <div className="absolute bottom-20 right-1/3 w-24 h-24 rounded-full bg-indigo-300/10 blur-xl animate-pulse" style={{animationDuration: '8s'}}></div>
          <div className="absolute top-10 left-1/2 w-10 h-10 rounded-full bg-white/10 blur-md animate-bounce" style={{animationDuration: '9s'}}></div>
          <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-purple-200/15 blur-lg animate-pulse" style={{animationDuration: '7s'}}></div>
          <div className="absolute top-1/3 right-10 w-20 h-20 rounded-full bg-blue-400/10 blur-xl animate-bounce" style={{animationDuration: '10s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">      
            <h1 className="text-5xl md:text-5xl font-bold mb-6 leading-tight">
              Experience Comfort at Every Level
            </h1>      
            <p className="text-xl opacity-90 mb-8 max-w-2xl">
              Choose the cabin that suits your travel style and budget
            </p>
          </div>
        </div>
        
        {/* Curved Bottom Design */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160">
            <path fill="#f9fafb" fillOpacity="1" d="M0,128L80,117.3C160,107,320,85,480,90.7C640,96,800,128,960,133.3C1120,139,1280,117,1360,106.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* First Class Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 border-b-2 border-blue-300 pb-2 mb-8">First Class</h2>
          
          <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden mb-8 hover:shadow-xl transition-shadow duration-300">
            <div className="md:w-1/2 relative">
              <div className="relative w-full h-72 md:h-full">
                <Image 
                  src="/first_class.jpg" 
                  alt="First Class"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-700">About First Class</h3>
                <p className="text-gray-600 mb-6">
                First Class offers the most luxurious and exclusive flying experience. Passengers enjoy spacious, fully reclining seats or private suites, premium dining with gourmet meals, personalized service, and exclusive lounge access. Additional perks may include priority check-in, extra baggage allowance, and high-end amenities for ultimate comfort.
                </p>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Class Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 border-b-2 border-blue-300 pb-2 mb-8">Business Class</h2>
          
          <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden mb-8 hover:shadow-xl transition-shadow duration-300">
            <div className="md:w-1/2 relative">
              <div className="relative w-full h-72 md:h-full">
                <Image 
                  src="/business_class.jpg" 
                  alt="Business Class"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-700">About Business Class</h3>
                
                <p className="text-gray-600 mb-6">
                Business Class provides a premium experience with enhanced comfort and services. Passengers enjoy spacious reclining seats, gourmet meals, priority check-in, and access to airport lounges. The class is ideal for business travelers or those seeking a more relaxing journey with extra legroom, in-flight entertainment, and premium amenities.
                </p>          
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Economy Class Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 border-b-2 border-blue-300 pb-2 mb-8">Premium Economy Class</h2>
          
          <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="md:w-1/2 relative">
              <div className="relative w-full h-72 md:h-full">
                <Image 
                  src="/premium.jpg" 
                  alt="Premium Economy Class"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-700">About Premium Economy Class</h3>
              
                <p className="text-gray-600 mb-6">
                Premium Economy Class offers a step up from Economy with extra legroom, wider seats, and enhanced meal options. Passengers may also enjoy priority boarding, additional baggage allowance, and improved entertainment options, providing a more comfortable travel experience at an affordable price.
                </p>      
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>

        {/* Economy Class Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 border-b-2 border-blue-300 pb-2 mb-8">Economy Class</h2>

          <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between order-2 md:order-1">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-700">About Economy Class</h3>
                <p className="text-gray-600 mb-6">
                Economy Class is the most budget-friendly option, offering standard seating with basic amenities. Passengers receive in-flight entertainment, meal services (depending on the airline), and a comfortable but compact seating arrangement. It is the most common and cost-effective choice for travelers.
                </p>
              </div>
              <div>
              </div>
            </div>
            <div className="md:w-1/2 relative order-1 md:order-2">
              <div className="relative w-full h-72 md:h-full">
                <Image 
                  src="/economy.jpg" 
                  alt="Economy Class"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50 flex items-center">
              <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
                <div className="text-white md:w-2/3">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">Secure your ticket now</h2>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">with various attractive promotions</h3>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link href="/book">
                    <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full hover:from-blue-700 hover:to-purple-700 transition duration-300 font-bold text-lg shadow-lg hover:shadow-xl">
                      Book Now
                    </span>
                  </Link>
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