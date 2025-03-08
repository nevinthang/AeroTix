"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Calendar, X, Plus, Minus, ChevronLeft, ChevronRight, Menu, Plane } from 'lucide-react';
import './globals.css';


const Homepage = () => {
  const [showTravellerModal, setShowTravellerModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [centerIndex, setCenterIndex] = useState(1);

  const testimonials = [
    {
      name: "Mehwish",
      text: "Aerotix is amazing! Super fast booking, hassle-free, and always reliable. My go-to for every trip!",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Elizabeth Jeff",
      text: "So quick and easy! Found the best deals in seconds, and the process was smooth. Highly recommended!",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      name: "Emily Thomas",
      text: "Trustworthy and efficient! Aerotix makes booking stress-free with great prices and top-notch service.",
      image: "https://randomuser.me/api/portraits/women/3.jpg"
    }
  ];

  // const calculateCenterItem = () => {
  //   if (!containerRef.current || !sliderRef.current) return;
  
  //   // Ambil posisi heading sebagai acuan
  //   const headingElement = document.querySelector('.testimonial-heading') as HTMLElement | null;
  //   if (!headingElement) return;
  
  //   const headingRect = headingElement.getBoundingClientRect();
  //   const referencePosition = headingRect.bottom + 10; // Tambahkan offset agar lebih akurat
  
  //   // Ambil semua elemen testimonial
  //   const items = Array.from(sliderRef.current.querySelectorAll('.testimonial-item')) as HTMLElement[];
  //   if (!items.length) return;
  
  //   let closestItem: HTMLElement | null = null;
  //   let closestDistance = Infinity;
  //   let nextItem: HTMLElement | null = null;
  
  //   items.forEach((item) => {
  //     const itemRect = item.getBoundingClientRect();
  //     const itemTop = itemRect.top;
  
  //     // Ambil item pertama yang ada DI BAWAH referencePosition
  //     if (itemTop > referencePosition) {
  //       if (!nextItem || itemTop < nextItem.getBoundingClientRect().top) {
  //         nextItem = item;
  //       }
  //     }
  
  //     // Tetap cari item terdekat sebagai fallback
  //     const distance = Math.abs(referencePosition - itemTop);
  //     if (distance < closestDistance) {
  //       closestDistance = distance;
  //       closestItem = item;
  //     }
  //   });
  
  //   // Pilih item yang akan di-highlight
  //   const itemToHighlight = nextItem || closestItem;
  //   if (!itemToHighlight) return;
  
  //   // Hapus highlight dari semua item dulu
  //   items.forEach((item) => {
  //     item.classList.remove('testimonial-highlighted', 'border-l-4', 'border-purple-600', 'bg-gray-100');
  //     item.classList.add('bg-white');
  //   });
  
  //   // Tambahkan highlight ke item yang dipilih
  //   (itemToHighlight as HTMLElement).classList.add('testimonial-highlighted', 'border-l-4', 'border-purple-600', 'bg-gray-100');
  //   (itemToHighlight as HTMLElement).classList.remove('bg-white');
  
  //   // Pastikan elemen memiliki dataset.index
  //   const index = parseInt((itemToHighlight as HTMLElement).dataset.index || '0', 10);
  //   if (!isNaN(index) && testimonials.length > 0) {
  //     setCenterIndex(index % testimonials.length);
  //   }
  // };
  
  

  // // Add this near the useEffect for smooth transitions
  // useEffect(() => {
  //   // Calculate center item initially
  //   setTimeout(calculateCenterItem, 100);
    
  //   // Set up scroll event listeners
  //   const container = containerRef.current;
  //   if (container) {
  //     container.addEventListener('scroll', calculateCenterItem);
  //   }
    
  //   // Set up animation end listener
  //   const slider = sliderRef.current;
  //   if (slider) {
  //     slider.addEventListener('animationiteration', () => {
  //       // When animation completes one iteration, recalculate center
  //       calculateCenterItem();
  //     });
  //   }
    
  //   // Add window scroll listener
  //   window.addEventListener('scroll', calculateCenterItem);
    
  //   // Set up interval to periodically check for position changes during animation
  //   const highlightInterval = setInterval(calculateCenterItem, 500);
    
  //   // Clean up event listeners
  //   return () => {
  //     if (container) {
  //       container.removeEventListener('scroll', calculateCenterItem);
  //     }
  //     if (slider) {
  //       slider.removeEventListener('animationiteration', calculateCenterItem);
  //     }
  //     window.removeEventListener('scroll', calculateCenterItem);
  //     clearInterval(highlightInterval);
  //   };
  // }, [testimonials.length]);

  const whyUsFeatures = [
    {
      icon: "🌍",
      title: "Worldwide Destinations",
      description: "Discover countless breathtaking places with the best travel deals"
    },
    {
      icon: "💰",
      title: "Best Prices Guaranteed",
      description: "Get unbeatable fares and exclusive discounts for your dream trip"
    },
    {
      icon: "⚡",
      title: "Easy & Fast Booking",
      description: "Smooth, hassle-free ticket reservations with just a few clicks on Aerotix"
    }
  ];

  const popularPlaces = [
    {
      image: "https://i.pinimg.com/736x/1c/cb/97/1ccb97a0e0ede31b7b647b5c9ff9a704.jpg",
      city: "Rome, Italy",
      country: "Italy",
      price: "$ 20000 Per Night",
      days: "10 Days"
    },
    {
      image: "https://i.pinimg.com/736x/40/3f/0a/403f0a34e3870bed1e3ebfbb690cb14f.jpg",
      city: "Paris, France",
      country: "France",
      price: "$ 20000 Per Night",
      days: "7 Days"
    },
    {
      image: "https://i.pinimg.com/736x/15/e0/15/15e015d2aec7f5c12529a6256597446d.jpg",
      city: "New York, USA",
      country: "USA",
      price: "$ 20000 Per Night",
      days: "14 Days"
    },
    {
      image: "https://i.pinimg.com/736x/25/98/ba/2598ba5e25ec78c5f840e5c57ef2f3f4.jpg",
      city: "Dubai, Emirates",
      country: "UAE",
      price: "$ 20000 Per Night",
      days: "12 Days"
    }
  ];

  const cabinClasses = [
    {
      type: "CABIN FEATURES",
      title: "First Class",
      image: "https://i.pinimg.com/474x/49/be/75/49be750eab4df36c15f00e73588ead35.jpg",
      cta: "Learn more"
    },
    {
      type: "CABIN FEATURES",
      title: "Business Class",
      image: "https://i.pinimg.com/736x/9f/a0/8b/9fa08b30136f2158b7793e3c00060acf.jpg",
      cta: "Learn more"
    },
    {
      type: "CABIN FEATURES",
      title: "Premium Economy",
      image: "https://i.pinimg.com/736x/ee/a5/f5/eea5f5c13f41305a139cf1668c9a8306.jpg",
      cta: "Learn more"
    },
    {
      type: "GET READY FOR SOMETHING SPECIAL",
      title: "Economy Class",
      image: "https://i.pinimg.com/736x/42/41/87/4241873f1108d51558334430976ff352.jpg",
      cta: "Read more"
    }
  ];


  const destinations = [
    {
      type: "DUBAI AND UAE",
      title: "Learn About Dubai",
      image: "https://i.pinimg.com/736x/bb/97/53/bb9753af2a1b2347a904babff0977d24.jpg",
      cta: "Learn more"
    }
  ];


  const heroSlides = [
    {
      title: "Coming Soon",
      subtitle: "Stunning beaches, vibrant nightlife, endless adventures",
      image: "/1.png",
      miniImage: "/1.png"
    },
    {
      title: "Paris",
      subtitle: "Experience the city of lights",
      image: "/2.png",
      miniImage: "/2.png"
    },
    {
      title: "London",
      subtitle: "Discover royal heritage",
      image: "/3.png",
      miniImage: "/3.png"
    }
  ];

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center pt-20 px-6 bg-gradient-main">
      {/* Hero Section with Animation */}
      <div className="relative flex flex-col items-center justify-center pt-20 px-6 text-center">
        <div className="absolute inset-0 z-0 h-[420px] max-h-screen ">
            <img 
              src="world-map.png" 
              alt="World Map" 
              className="w-full h-full object-cover opacity-10 transition-opacity duration-500"
              style={{ opacity: isHovered ? '0.2' : '0.1' }}
            />
          </div>

          <div 
            className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto mb-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Animated Airplane Image */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0 transform transition-all duration-700 ease-in-out"
              style={{
                transform: isHovered ? 'translateY(-20px) rotate(-5deg)' : 'translateY(0) rotate(0)',
              }}
            >
              <img 
                src="/pesawat.png" 
                alt="Airplane" 
                className="w-full max-w-lg mx-auto hover:drop-shadow-2xl transition-all duration-700"
                style={{
                  filter: isHovered ? 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15))' : 'none'
                }}
              />
            </div>

            {/* Animated Text and Button */}
            <div className="w-full md:w-1/2 text-center md:text-left md:pl-8 transform transition-all duration-700 ease-in-out"
              style={{
                transform: isHovered ? 'translateX(20px)' : 'translateX(0)',
              }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4 transition-all duration-500 bg-clip-text text-transparent"
                style={{
                  backgroundImage: isHovered 
                    ? 'linear-gradient(to bottom right, #2563eb, #9333ea)'  // Gradient dari blue-600 ke purple-600
                    : 'linear-gradient(to right, #1f2937, #1f2937)', // Warna default gray-800
                  textShadow: isHovered ? '2px 2px 4px rgba(0, 0, 0, 0.1)' : 'none'
                }}
              >
                Travel Around The World
              </h1>
              <p className="text-gray-500 text-sm mb-6 transition-all duration-500"
                style={{
                  opacity: isHovered ? '1' : '0.8',
                  transform: isHovered ? 'translateY(0)' : 'translateY(5px)'
                }}
              >
                Explore the wonders of the world, from breathtaking landscapes to vibrant cities waiting to be discovered. Book your next adventure now with Aerotix and make every journey unforgettable!
              </p>
              <a href="/book">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg transition-all duration-500 transform hover:scale-105 hover:bg-white hover:text-white hover:shadow-xl">
                  Book Now
                </button>
              </a>

            </div>
          </div>
        </div>
          {/* Why Us Section */}
          <div className = "card-box">
          <section className="bg-white-100 py-12 md:py-1">
          <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Why Choose Us?
          </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div 
                className="group flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md 
                          transition-all duration-300"
              >
                <div 
                  className="w-16 h-16 flex items-center justify-center rounded-full text-3xl transform transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    background: 'linear-gradient(to right, #e5e7eb, #e5e7eb)',
                    
                  }}
                >
                  🚀
                </div>
                <h3 
                  className="font-semibold text-lg mt-4 mb-2 transition-colors duration-300 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #1f2937, #1f2937)',
                   
                  }}
                >
                  Fast & Reliable
                </h3>
                <p className="text-gray-600 text-sm">
                  We ensure quick and trustworthy services for our customers.
                </p>
              </div>

              <div 
                className="group flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md 
                          transition-all duration-300 "
              >
                <div 
                  className="w-16 h-16 flex items-center justify-center rounded-full text-3xl transform transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    background: 'linear-gradient(to right, #e5e7eb, #e5e7eb)',
                    transition: 'background 0.3s ease-in-out'
                  }}
                >
                  💡
                </div>
                <h3 
                  className="font-semibold text-lg mt-4 mb-2 transition-colors duration-300 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #1f2937, #1f2937)',
                    transition: 'background-image 0.3s ease-in-out'
                  }}
                >
                  Innovative Solutions
                </h3>
                <p className="text-gray-600 text-sm transition-all duration-300 group-hover:text-gray-800">
                  We provide cutting-edge technology to enhance your experience.
                </p>
              </div>

              <div 
                className="group flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md 
                          transition-all duration-300"
              >
                <div 
                  className="w-16 h-16 flex items-center justify-center rounded-full text-3xl transform transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    background: 'linear-gradient(to right, #e5e7eb, #e5e7eb)',
                  }}
                >
                  🌍
                </div>
                <h3 
                  className="font-semibold text-lg mt-4 mb-2 transition-colors duration-300 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #1f2937, #1f2937)',
                    transition: 'background-image 0.3s ease-in-out'
                  }}
                >
                  Global Reach
                </h3>
                <p className="text-gray-600 text-sm transition-all duration-300 group-hover:text-gray-800">
                  Our services are available worldwide to meet your needs.
                </p>
              </div>
            </div>
          </div>
        </section>
        </div>

        <div className="max-w-6xl mx-auto mb-16 md:mb-24 px-4 pt-20">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 mb-6">
            Relation so in confined smallest children unpacked delicate. Why sir end believe uncivil respect. 
            Always get adieus nature day course for common.
          </p>
        </div>
        <div ref={containerRef} className="w-full md:w-1/2 overflow-hidden relative h-80">
          <div 
            ref={sliderRef}
            className="testimonial-slider"
          >
            {/* First set of testimonials */}
            {testimonials.map((testimonial, index) => (
              <div 
                key={`first-${index}`}
                data-index={index}
                className={`testimonial-item p-4 border rounded-lg shadow-md flex items-start space-x-4 
                          transition-all duration-300 ease-in-out
                          hover:shadow-xl hover:scale-[1.02] hover:bg-gradient-to-r 
                          'bg-white hover:from-blue-50 hover:to-purple-50'
                          cursor-pointer`}
              >
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full transition-transform duration-300 hover:scale-110" 
                />
                <div className="transform transition-all duration-300">
                  <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 transition-colors duration-300">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 text-sm transition-colors duration-300 hover:text-gray-800">
                    {testimonial.text}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Duplicate testimonials to create seamless loop */}
            {testimonials.map((testimonial, index) => (
              <div 
                key={`second-${index}`}
                data-index={index}
                className={`testimonial-item p-4 border rounded-lg shadow-md flex items-start space-x-4 
                          transition-all duration-300 ease-in-out
                          hover:shadow-xl hover:scale-[1.02] hover:bg-gradient-to-r 
                          'bg-white hover:from-blue-50 hover:to-purple-50'
                          cursor-pointer`}
              >
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full transition-transform duration-300 hover:scale-110" 
                />
                <div className="transform transition-all duration-300">
                  <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 transition-colors duration-300">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 text-sm transition-colors duration-300 hover:text-gray-800">
                    {testimonial.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
         {/* Popular Places Section - Modified to be static grid */}
      {/* <div className="max-w-6xl mx-auto mb-16 md:mb-24 px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Explore the Beautiful Places</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularPlaces.map((place, index) => (
            <div key={index} className="rounded-lg overflow-hidden bg-white shadow-lg">
              <div className="relative">
                <img src={place.image} alt={place.city} className="w-full h-48 object-cover" />
                <div className="absolute top-4 right-4 bg-[#578FCA] text-white px-3 py-1 rounded-full text-sm">
                  {place.price}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{place.city}</h3>
                  <span className="text-[#3674B5] text-sm">{place.days}</span>
                </div>
                <div className="flex items-center justify-end">
                  <button className="px-4 py-1 bg-[#3674B5] text-white rounded-full text-sm hover:bg-[#2964A3]">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

       {/* Popular Places Section */}
       {/* <div className="relative w-full h-[100vh] overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url(${heroSlides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        > */}
          {/* Overlay */}
          {/* <div className="absolute inset-0 " /> */}
          
          {/* Hero Content */}
          {/* <div className="relative h-full max-w-6xl mx-auto px-4 flex items-center">
            <div className="text-white">
              <h1 className="text-6xl md:text-8xl font-bold mb-4 animate-fade-in">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl opacity-90 animate-fade-in-up">
                {heroSlides[currentSlide].subtitle}
              </p>
            </div>
          </div> */}
        {/* </div> */}

        {/* Mini Cards Navigation */}
        {/* <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`relative flex-shrink-0 cursor-pointer rounded-lg overflow-hidden transition-all duration-150 ${
                    currentSlide === index ? 'w-48 h-28 ring-2 ring-white' : 'w-40 h-24 opacity-70'
                  }`}
                >
                  <img
                    src={slide.miniImage}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  {currentSlide === index && (
                    <div className="absolute top-2 right-2">
                      <Plane className="w-6 h-6 text-white transform -rotate-45" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-white text-sm font-medium">
                    {slide.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      {/* // </div> */}
      <br/><br/>
      
      {/* Articles Section with Hover Animations */}
      <div className="max-w-6xl mx-auto mb-16 md:mb-24 px-4">
        <div className="mb-12">
          <h3 className="text-center text-sm font-medium text-gray-600 uppercase tracking-wider mb-2">
            Fly With AeroTix
          </h3>
          <h2 className="text-center text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Make This Trip Extraordinary
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
           Enjoy The Experience & Plan An Unforgettable Trip After Your Flight
          </p>
        </div>

        {/* Dubai Highlight Card and Cabin Classes with Hover Effects */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Dubai Highlight Card */}
          <div className="lg:col-span-1">
            {destinations.map((dest, index) => (
              <div 
                key={index} 
                className="h-full bg-white rounded-lg overflow-hidden border border-gray-200
                         transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              >
                <div className="relative h-64 lg:h-full">
                  <img 
                    src={dest.image} 
                    alt={dest.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60
                               transition-all duration-300 hover:from-black/80">
                    <p className="text-white text-xs font-medium mb-2">{dest.type}</p>
                    <h3 className="text-white text-xl font-bold mb-2">{dest.title}</h3>
                    <a href ="/article"><button className="text-white text-sm underline hover:text-blue-300 transition-colors">
                      {dest.cta}
                    </button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cabin Classes Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {cabinClasses.map((cabin, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg overflow-hidden border border-gray-200
                           transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                >
                  <div className="relative h-48">
                    <img 
                      src={cabin.image} 
                      alt={cabin.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60
                                 transition-all duration-300 hover:from-black/80">
                      <p className="text-white text-xs font-medium mb-1">{cabin.type}</p>
                      <h3 className="text-white text-lg font-bold mb-2">{cabin.title}</h3>
                      <a href ="/cabin">
                      <button className="text-white text-sm underline hover:text-blue-300 transition-colors">
                        {cabin.cta}
                      </button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;