"use client";
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaTwitter, FaFacebook } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { GrGoogle } from 'react-icons/gr';
import { useEffect, useState } from 'react';

export default function KoiArticlePage() {
  // State for carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [
    { src: "/dubai1.jpg", alt: "Dubai 1" },
    { src: "/dubai2.jpg", alt: "Dubai 2" },
    { src: "/dubai3.jpg", alt: "Dubai 3" }
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
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Handle manual slide change
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* Main Content */}
      <br/> <br/>
      <div className="bg-white">
      <div className="flex justify-center mt-6">
        <a href="/">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-md flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
        </button>
        </a>
        </div>


        <div className="max-w-4xl mx-auto px-6 pt-16 pb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Dubai: A City of Wonders and Extravagance</h2>
            <p className="text-gray-600 text-lg">Home to three million people, find out how the city of Dubai has evolved into a sun-soaked modern metropolis.</p>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 mb-8 rounded-lg">
            <p className="text-base">
            Dubai, the dazzling gem of the United Arab Emirates, is a city where ultra-modern skyscrapers rise from the golden desert, and luxury blends seamlessly with rich cultural heritage. From record-breaking landmarks to stunning beaches and thrilling desert safaris, Dubai offers an unforgettable experience for every traveler.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-800 tracking-wide border-b pb-3 mb-6">Fact About Dubai</h3>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className="text-gray-600 mt-6">
                <ul className="text-gray-600 italic list-disc pl-5">
                  <li>Dubai is home to the world's first fully functional 3D-printed building. </li>
                  <li>Dubai International Airport (DXB) is the world's busiest international airport. It handles over 90 million passengers annually, with over 6,500 flights weekly operated by over 140 airlines to more than 270 places around the world.</li>
                  <li>Dubai holds numerous Guinness World Records. As well as being home to the world's tallest building, Burj Khalifa, Dubai's other records include the world's deepest swimming pool (60.02 metres at Deep Dive Dubai) and the world's tallest landmark sign in Hatta, which at 19.28m tall is larger than the famous Hollywood sign in Los Angeles.</li>
                </ul>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div className="bg-blue-50 p-4 rounded-lg shadow-md relative">
                  <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                    {carouselImages.map((image, index) => (
                      <div 
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                      >
                        <Image 
                          src={image.src} 
                          alt={image.alt} 
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Carousel indicators */}
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                    {carouselImages.map((_, index) => (
                      <button 
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'}`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* Navigation arrows */}
                  <button 
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1"
                    onClick={() => goToSlide((currentSlide - 1 + carouselImages.length) % carouselImages.length)}
                    aria-label="Previous slide"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1"
                    onClick={() => goToSlide((currentSlide + 1) % carouselImages.length)}
                    aria-label="Next slide"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-10 pl-12 relative">
              <div className="absolute left-0 top-0 text-blue-400 text-5xl font-serif">"</div>
              <p className="text-gray-600 italic">
              Dubai currently has a population of approximately 3.6 million people, according to the Government of Dubai's Statistics Center website. People from more than 200 nationalities live and work in Dubai, helping to create a multicultural and inclusive society.
              </p>
              <p className="text-right text-gray-700 font-medium mt-3">- Admin Aerotix</p>
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
    </div>
  );
}