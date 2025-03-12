"use client";
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaTwitter, FaFacebook } from 'react-icons/fa';
import { FiMessageCircle, FiShare2 } from 'react-icons/fi';
import { GrGoogle } from 'react-icons/gr';
import { useEffect, useState } from 'react';

export default function KoiArticlePage() {
  // State for carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [
    { src: "/dubai1.jpg", alt: "Dubai skyline view" },
    { src: "/dubai2.jpg", alt: "Dubai marina" },
    { src: "/dubai3.jpg", alt: "Desert safari in Dubai" }
  ];

  // Add animation effect for the arrow
  useEffect(() => {
    const arrow = document.getElementById('bouncing-arrow');
    if (arrow) {
      const animate = () => {
        arrow.animate(
          [
            { transform: 'translateY(0px)' },
            { transform: 'translateY(10px)' },
            { transform: 'translateY(0px)' }
          ],
          {
            duration: 1500,
            iterations: Infinity
          }
        );
      };
      animate();
    }

    // Carousel auto-rotation
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000); // Change slide every 5 seconds (increased from 3 seconds for better viewing)

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Handle manual slide change
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pt-10">
      {/* Hero Section with Dynamic Background */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white pt-16 pb-24 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl"></div>
          <div className="absolute top-40 left-1/4 w-32 h-32 rounded-full bg-blue-300/10 blur-xl"></div>
          <div className="absolute bottom-40 right-1/4 w-40 h-40 rounded-full bg-purple-400/10 blur-xl"></div>
          <div className="absolute top-24 left-10 w-20 h-20 rounded-full bg-white/10 blur-xl animate-pulse"></div>
          <div className="absolute top-1/4 right-1/3 w-16 h-16 rounded-full bg-blue-200/15 blur-lg animate-bounce" style={{animationDuration: '6s'}}></div>
          <div className="absolute bottom-1/3 left-1/3 w-28 h-28 rounded-full bg-purple-300/10 blur-xl animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/5 blur-xl animate-pulse" style={{animationDuration: '7s'}}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-between items-center mb-12">
            <Link href="/">
              <button className="bg-white/10 backdrop-blur-sm text-white px-5 py-2.5 rounded-full hover:bg-white/20 transition duration-300 shadow-md flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            </Link>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm inline-block px-3 py-1 rounded-full mb-4">
              <span className="text-sm font-medium">Travel Destination</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Dubai: A City of Wonders and Extravagance
            </h1>
            
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Home to three million people, find out how the city of Dubai has evolved into a sun-soaked modern metropolis.
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

      {/* Main Content with Improved Layout */}
      <div className="relative -mt-20 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Featured Image Card - Prominent Positioning */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
            <div className="relative h-96">
              {carouselImages.map((image, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                  <Image 
                    src={image.src} 
                    alt={image.alt} 
                    fill
                    sizes="(max-width: 1280px) 100vw, 1024px"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
              
              {/* Overlay gradient for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-lg font-medium">Explore the magnificent skyline and luxurious attractions of Dubai</p>
              </div>
              
              {/* Carousel indicators */}
              <div className="absolute bottom-6 right-6 flex justify-center gap-2">
                {carouselImages.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-white' : 'bg-white/40'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Navigation arrows */}
              <button 
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                onClick={() => goToSlide((currentSlide - 1 + carouselImages.length) % carouselImages.length)}
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                onClick={() => goToSlide((currentSlide + 1) % carouselImages.length)}
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Two-column layout for better content structure */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Column */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-100/50 blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-purple-100/50 blur-2xl"></div>
                
                <div className="relative z-10">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 mb-10 rounded-lg shadow-md">
                    <p className="text-base leading-relaxed">
                      Dubai, the dazzling gem of the United Arab Emirates, is a city where ultra-modern skyscrapers rise from the golden desert, and luxury blends seamlessly with rich cultural heritage. From record-breaking landmarks to stunning beaches and thrilling desert safaris, Dubai offers an unforgettable experience for every traveler.
                    </p>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-800 tracking-wide border-b border-gray-200 pb-3 mb-6">Facts About Dubai</h3>
                    
                    <ul className="text-gray-600 space-y-4">
                      <li className="flex items-start">
                        <span className="inline-block w-4 h-4 mt-1.5 mr-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></span>
                        <span>Dubai International Airport (DXB) is the world's busiest international airport. It handles over 90 million passengers annually, with over 6,500 flights weekly operated by over 140 airlines to more than 270 places around the world. Dubai holds numerous Guinness World Records. As well as being home to the world's tallest building, Burj Khalifa, Dubai's other records include the world's deepest swimming pool (60.02 metres at Deep Dive Dubai) and the world's tallest landmark sign in Hatta, which at 19.28m tall is larger than the famous Hollywood sign in Los Angeles.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50/70 p-6 rounded-lg relative my-10">
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-blue-100/80 blur-xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-purple-100/50 blur-xl"></div>
                    
                    <div className="relative z-10 pl-12">
                      <div className="absolute left-0 top-0 text-blue-500 text-5xl font-serif">"</div>
                      <p className="text-gray-600 italic">
                        Dubai currently has a population of approximately 3.6 million people, according to the Government of Dubai's Statistics Center website. People from more than 200 nationalities live and work in Dubai, helping to create a multicultural and inclusive society.
                      </p>
                      <p className="text-right text-gray-700 font-medium mt-3">- Admin Aerotix</p>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            
            
            {/* Sidebar Column */}
            <div className="lg:w-1/3">
              {/* Popular Destinations Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 mr-3 rounded-sm"></span>
                  Popular Destinations
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 flex-shrink-0 rounded-md overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-blue-700 font-bold">1</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Burj Khalifa</h4>
                      <p className="text-sm text-gray-500">World's tallest building</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 flex-shrink-0 rounded-md overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-blue-700 font-bold">2</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Palm Jumeirah</h4>
                      <p className="text-sm text-gray-500">Iconic artificial archipelago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 flex-shrink-0 rounded-md overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-blue-700 font-bold">3</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Dubai Mall</h4>
                      <p className="text-sm text-gray-500">World-class shopping experience</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <a href="/book" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                    Save Your Ticket Now 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Weather Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-blue-100/60 blur-xl"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 mr-3 rounded-sm"></span>
                    Current Weather
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-4xl font-bold text-gray-800">32°C</span>
                      <p className="text-gray-500">Sunny</p>
                    </div>
                    <div className="text-yellow-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-600">
                    <p>Best time to visit: November to March</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
           {/* Banner */}
           <div className="w-full rounded-lg overflow-hidden shadow-lg mt-8">
                <div className="relative w-full h-72">
                  <Image 
                    src="/banner1.png" 
                    alt="Book now"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/50 flex items-center">
                    {/* Decorative elements */}
                    <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/5 blur-2xl"></div>
                    <div className="absolute bottom-10 left-20 w-24 h-24 rounded-full bg-purple-300/10 blur-xl"></div>
                    
                    <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center relative z-10">
                      <div className="text-white md:w-2/3">
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">Secure your ticket now</h2>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">with various attractive promotions</h3>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <a href="/book" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-md">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          
        </div>
      </div>
    </div>
  );
}