"use client";

import React, { useState, useCallback } from "react";
import { Card } from '@/components/homepage_card';
import { Calendar, X, Plus, Minus, ChevronLeft, ChevronRight, Menu } from 'lucide-react';

const HeroSection = () => {
  const [showTravellerModal, setShowTravellerModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [travellers, setTravellers] = useState({
    adults: 2,
    children: 1,
    infants: 0
  });

  const whyUsFeatures = [
    {
      icon: "🏄‍♂️",
      title: "Rafting Whitewater",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing"
    },
    {
      icon: "⚙️",
      title: "Easy & Quick Booking",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing"
    },
    {
      icon: "🏞️",
      title: "Easy & Quick Booking",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing"
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

  const testimonials = [
    {
      name: "Mehwish",
      text: "Compliment interested discretion estimating on stimulated apartments oh.",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Elizabeth Jeff",
      text: "Door so sing when in find road of call. As distrusts behaviour abilities defective is.",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      name: "Emily Thomas",
      text: "Never at water me might. On formed merits hunted unable merely by mr whence or.",
      image: "https://randomuser.me/api/portraits/women/3.jpg"
    }
  ];

  const cabinClasses = [
    {
      type: "FITUR KABIN",
      title: "Kelas Utama",
      image: "https://i.pinimg.com/474x/49/be/75/49be750eab4df36c15f00e73588ead35.jpg",
      cta: "Pelajari lebih lanjut"
    },
    {
      type: "FITUR KABIN",
      title: "Kelas Bisnis",
      image: "https://i.pinimg.com/736x/9f/a0/8b/9fa08b30136f2158b7793e3c00060acf.jpg",
      cta: "Pelajari lebih lanjut"
    },
    {
      type: "FITUR KABIN",
      title: "Ekonomi Premium",
      image: "https://i.pinimg.com/736x/ee/a5/f5/eea5f5c13f41305a139cf1668c9a8306.jpg",
      cta: "Pelajari lebih lanjut"
    },
    {
      type: "BERSIAPLAH UNTUK HAL YANG ISTIMEWA",
      title: "Kelas Ekonomi",
      image: "https://i.pinimg.com/736x/42/41/87/4241873f1108d51558334430976ff352.jpg",
      cta: "Baca lebih lanjut"
    }
  ];

  const destinations = [
    {
      type: "DUBAI DAN UEA",
      title: "Pelajari tentang Dubai",
      image: "https://i.pinimg.com/736x/bb/97/53/bb9753af2a1b2347a904babff0977d24.jpg",
      cta: "Pelajari lebih lanjut"
    }
  ];

  const handleTravellerChange = useCallback((type: keyof typeof travellers, operation: 'add' | 'remove') => {
    setTravellers((prev) => ({
      ...prev,
      [type]: operation === 'add' ? prev[type] + 1 : Math.max(0, prev[type] - 1),
    }));
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === popularPlaces.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? popularPlaces.length - 1 : prev - 1
    );
  };

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => setTouchStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => setTouchEnd(e.touches[0].clientX);

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="w-full px-4 md:px-6 py-4 flex items-center justify-between relative">
        <div className="flex items-center space-x-2">
          <img src="/logo1.png" alt="AR PLANE Logo" className="w-24 md:w-32 h-auto" />
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-blue-600">Home</a>
          <a href="/book" className="text-gray-500 hover:text-gray-700">Book Ticket</a>
          <a href="#" className="text-gray-500 hover:text-gray-700">Check In</a>
          <a href="#" className="text-gray-500 hover:text-gray-700">Rewards</a>
          <a href="#" className="text-gray-500 hover:text-gray-700">Support</a>
          <button className="px-6 py-2 rounded-full border border-gray-300 hover:bg-gray-50">
            Login
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-4 md:hidden z-50">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-blue-600">Home</a>
              <a href="/book" className="text-gray-500">Book Ticket</a>
              <a href="#" className="text-gray-500">Check In</a>
              <a href="#" className="text-gray-500">Rewards</a>
              <a href="#" className="text-gray-500">Support</a>
              <button className="px-6 py-2 rounded-full border border-gray-300 text-center">
                Login
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative w-full px-4 md:px-6 pt-8">
        <div className="absolute inset-0 z-0 h-[350px] max-h-screen">
          <img 
            src="world-map.png" 
            alt="World Map" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto">
          {/* Airplane Image */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <img 
              src="/pesawat.png" 
              alt="Airplane" 
              className="w-full max-w-lg mx-auto"
            />
          </div>

          {/* Text and Button */}
          <div className="w-full md:w-1/2 text-center md:text-left md:pl-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Travel Around The World
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              One of the advantages of being disorganized is that one is always having surprising discoveries
            </p>
            <a href="/book">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition">
                Book Now
              </button>
            </a>
          </div>
        </div>

        {/* Why Us Section */}
        <section className="bg-white-100 py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {whyUsFeatures.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md">
                  <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full text-3xl">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg mt-4 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

         {/* Popular Places Section - Modified to be static grid */}
      <div className="max-w-6xl mx-auto mb-16 md:mb-24 px-4">
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
      </div>

        {/* Customer Testimonials Section */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-24 px-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
              <p className="text-gray-500 mb-6">Relation so in confined smallest children unpacked delicate. Why sir end believe uncivil respect. Always get adieus nature day course for common.</p>
              <button className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:opacity-90 transition">
                View More
              </button>
            </div>
            <div className="w-full md:w-1/2">
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className={`p-4 border rounded-lg shadow-md flex items-start space-x-4 ${index === 1 ? 'border-l-4 border-purple-500 bg-gray-100' : 'bg-white'}`}>
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                      <p className="text-gray-600 text-sm">{testimonial.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* New Emirates-style Articles Section */}
      <div className="max-w-6xl mx-auto mb-16 md:mb-24 px-4">
        <div className="mb-12">
          <h3 className="text-center text-sm font-medium text-gray-600 uppercase tracking-wider mb-2">
            TERBANG BERSAMA AeroTix
          </h3>
          <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Jadikan perjalanan ini luar biasa
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Nikmati pengalaman dan rencanakan perjalanan yang tak terlupakan setelah penerbangan Anda.
          </p>
        </div>

        {/* Dubai Highlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            {destinations.map((dest, index) => (
              <div key={index} className="h-full bg-white rounded-lg overflow-hidden border border-gray-200">
                <div className="relative h-64 lg:h-full">
                  <img src={dest.image} alt={dest.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60">
                    <p className="text-white text-xs font-medium mb-2">{dest.type}</p>
                    <h3 className="text-white text-xl font-bold mb-2">{dest.title}</h3>
                    <button className="text-white text-sm underline">{dest.cta}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cabin Classes Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {cabinClasses.map((cabin, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                  <div className="relative h-48">
                    <img src={cabin.image} alt={cabin.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60">
                      <p className="text-white text-xs font-medium mb-1">{cabin.type}</p>
                      <h3 className="text-white text-lg font-bold mb-2">{cabin.title}</h3>
                      <button className="text-white text-sm underline">{cabin.cta}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default HeroSection;