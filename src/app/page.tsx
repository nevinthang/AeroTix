"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Plane, Map, Globe, Navigation, Compass } from "lucide-react";
import "./globals.css";
import Button from "@/components/ui/button";

const Homepage = () => {
  const [showTravellerModal, setShowTravellerModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [centerIndex, setCenterIndex] = useState(1);

  const [isLoaded, setIsLoaded] = useState(false);

  // New states for enhanced hero animations
  const [globeRotation, setGlobeRotation] = useState(0);
  const [activePath, setActivePath] = useState(0);
  const [searchText, setSearchText] = useState("");
  const searchInputRef = useRef(null);

  // Path animations configuration
  const flightPaths = [
    { from: { x: 20, y: 120 }, to: { x: 180, y: 80 }, active: true },
    { from: { x: 60, y: 160 }, to: { x: 220, y: 40 }, active: false },
    { from: { x: 100, y: 140 }, to: { x: 240, y: 100 }, active: false },
  ];

  // Set isLoaded to true after component mounts
  useEffect(() => {
    setIsLoaded(true);

    // Animate globe rotation
    const animateGlobe = () => {
      setGlobeRotation((prev) => (prev + 0.2) % 360);
      requestAnimationFrame(animateGlobe);
    };

    const globeAnimation = requestAnimationFrame(animateGlobe);

    // Cycle through flight paths
    const pathInterval = setInterval(() => {
      setActivePath((prev) => (prev + 1) % flightPaths.length);
    }, 3000);

    // Typing animation effect
    const destinations = [
      "Paris",
      "New York",
      "Tokyo",
      "Dubai",
      "London",
      "Sydney",
    ];
    let currentDestIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentDest = destinations[currentDestIndex];

      if (isDeleting) {
        setSearchText(currentDest.substring(0, currentCharIndex - 1));
        currentCharIndex--;
      } else {
        setSearchText(currentDest.substring(0, currentCharIndex + 1));
        currentCharIndex++;
      }

      if (!isDeleting && currentCharIndex === currentDest.length) {
        // Wait a bit when a word is complete
        setTimeout(() => {
          isDeleting = true;
        }, 1500);
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentDestIndex = (currentDestIndex + 1) % destinations.length;
      }

      // Adjust typing speed based on whether deleting or typing
      const typingSpeed = isDeleting ? 50 : 150;
      setTimeout(typeEffect, typingSpeed);
    };

    const typingAnimation = setTimeout(typeEffect, 1000);

    return () => {
      cancelAnimationFrame(globeAnimation);
      clearInterval(pathInterval);
      clearTimeout(typingAnimation);
    };
  }, []);

  const testimonials = [
    {
      name: "Mehwish",
      text: "Aerotix is amazing! Super fast booking, hassle-free, and always reliable. My go-to for every trip!",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Elizabeth Jeff",
      text: "So quick and easy! Found the best deals in seconds, and the process was smooth. Highly recommended!",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      name: "Emily Thomas",
      text: "Trustworthy and efficient! Aerotix makes booking stress-free with great prices and top-notch service.",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  ];

  const whyUsFeatures = [
    {
      icon: "🌍",
      title: "Worldwide Destinations",
      description:
        "Discover countless breathtaking places with the best travel deals",
    },
    {
      icon: "💰",
      title: "Best Prices Guaranteed",
      description:
        "Get unbeatable fares and exclusive discounts for your dream trip",
    },
    {
      icon: "⚡",
      title: "Easy & Fast Booking",
      description:
        "Smooth, hassle-free ticket reservations with just a few clicks on Aerotix",
    },
  ];

  const popularPlaces = [
    {
      image:
        "https://i.pinimg.com/736x/1c/cb/97/1ccb97a0e0ede31b7b647b5c9ff9a704.jpg",
      city: "Rome, Italy",
      country: "Italy",
      price: "$ 20000 Per Night",
      days: "10 Days",
    },
    {
      image:
        "https://i.pinimg.com/736x/40/3f/0a/403f0a34e3870bed1e3ebfbb690cb14f.jpg",
      city: "Paris, France",
      country: "France",
      price: "$ 20000 Per Night",
      days: "7 Days",
    },
    {
      image:
        "https://i.pinimg.com/736x/15/e0/15/15e015d2aec7f5c12529a6256597446d.jpg",
      city: "New York, USA",
      country: "USA",
      price: "$ 20000 Per Night",
      days: "14 Days",
    },
    {
      image:
        "https://i.pinimg.com/736x/25/98/ba/2598ba5e25ec78c5f840e5c57ef2f3f4.jpg",
      city: "Dubai, Emirates",
      country: "UAE",
      price: "$ 20000 Per Night",
      days: "12 Days",
    },
  ];

  const cabinClasses = [
    {
      type: "CABIN FEATURES",
      title: "First Class",
      image:
        "https://i.pinimg.com/474x/49/be/75/49be750eab4df36c15f00e73588ead35.jpg",
      cta: "Learn more",
    },
    {
      type: "CABIN FEATURES",
      title: "Business Class",
      image:
        "https://i.pinimg.com/736x/9f/a0/8b/9fa08b30136f2158b7793e3c00060acf.jpg",
      cta: "Learn more",
    },
    {
      type: "CABIN FEATURES",
      title: "Premium Economy",
      image:
        "https://i.pinimg.com/736x/ee/a5/f5/eea5f5c13f41305a139cf1668c9a8306.jpg",
      cta: "Learn more",
    },
    {
      type: "GET READY FOR SOMETHING SPECIAL",
      title: "Economy Class",
      image:
        "https://i.pinimg.com/736x/42/41/87/4241873f1108d51558334430976ff352.jpg",
      cta: "Read more",
    },
  ];

  const destinations = [
    {
      type: "DUBAI AND UAE",
      title: "Learn About Dubai",
      image:
        "https://i.pinimg.com/736x/bb/97/53/bb9753af2a1b2347a904babff0977d24.jpg",
      cta: "Learn more",
    },
  ];

  const heroSlides = [
    {
      title: "Coming Soon",
      subtitle: "Stunning beaches, vibrant nightlife, endless adventures",
      image: "/1.png",
      miniImage: "/1.png",
    },
    {
      title: "Paris",
      subtitle: "Experience the city of lights",
      image: "/2.png",
      miniImage: "/2.png",
    },
    {
      title: "London",
      subtitle: "Discover royal heritage",
      image: "/3.png",
      miniImage: "/3.png",
    },
  ];

  // Floating card component for destination highlights
  interface DestinationHighlightProps {
    city: string;
    country: string;
    image: string;
    stats: string;
    delay: number;
  }

  const DestinationHighlight: React.FC<DestinationHighlightProps> = ({
    city,
    country,
    image,
    stats,
    delay,
  }) => (
    <div
      className={`bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/20 w-64 absolute transition-all duration-1000 ${
        isLoaded ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 15px rgba(79, 70, 229, 0.2)",
      }}
    >
      <div className="flex space-x-3">
        <div className="h-16 w-16 overflow-hidden rounded-lg">
          <img src={image} alt={city} className="h-full w-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white text-lg leading-tight">{city}</h3>
          <p className="text-blue-200 text-xs">{country}</p>
          <div className="flex items-center mt-2 space-x-2">
            <div className="bg-blue-600/30 rounded-full px-2 py-1 text-xs text-white">
              {stats}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  }, []);

  return (
    <div>
      {/* Hero Section with Animation */}
      <div className="min-h-screen bg-gray-50">
        {/* New Interactive Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-800 via-blue-700 to-indigo-900 text-white">
          {/* Background elements with enhanced animation */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full">
              {/* Animated gradient blobs */}
              <div
                className={`absolute h-64 w-64 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 blur-3xl opacity-30 top-10 -left-20 transition-all duration-3000 ease-in-out ${
                  isLoaded ? "scale-100" : "scale-0"
                }`}
                style={{
                  animation:
                    "pulse-slow 8s infinite alternate, move-slow 20s infinite",
                }}
              ></div>
              <div
                className={`absolute h-64 w-64 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 blur-3xl opacity-30 -bottom-32 right-0 transition-all duration-3000 delay-300 ease-in-out ${
                  isLoaded ? "scale-100" : "scale-0"
                }`}
                style={{
                  animation:
                    "pulse-slow 10s infinite alternate-reverse, move-slow-reverse 25s infinite",
                }}
              ></div>
              <div
                className={`absolute h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 blur-3xl opacity-20 -top-48 right-32 transition-all duration-3000 delay-500 ease-in-out ${
                  isLoaded ? "scale-100" : "scale-0"
                }`}
                style={{
                  animation:
                    "pulse-slow 12s infinite alternate, move-diagonal 30s infinite",
                }}
              ></div>
            </div>
          </div>

          {/* Hero Content with Search Focus */}
          <div className="container mx-auto px-6 pt-24 pb-32 md:pt-32 md:pb-40 relative z-10">
            <div className="max-w-7xl mx-auto">
              {/* Main Content Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Search Section */}
                <div
                  className={`transition-all duration-1000 ease-out 
                       ${
                         isLoaded
                           ? "opacity-100 transform-none"
                           : "opacity-0 -translate-y-8"
                       }`}
                >
                  <div className="mb-8">
                    <h3
                      className="text-blue-200 font-medium mb-3 transition-all duration-1000 delay-300"
                      style={{
                        opacity: isLoaded ? 1 : 0,
                        transform: isLoaded ? "none" : "translateY(10px)",
                      }}
                    >
                      EXPERIENCE THE FREEDOM OF FLIGHT
                    </h3>

                    <h1
                      className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
                      style={{
                        opacity: isLoaded ? 1 : 0,
                        transform: isLoaded ? "none" : "translateY(20px)",
                        transitionProperty: "opacity, transform",
                        transitionDuration: "1s",
                        transitionDelay: "0.5s",
                      }}
                    >
                      <span className="block text-white">Discover</span>
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
                        A World of Wonder
                      </span>
                    </h1>

                    <p
                      className="text-xl text-blue-100 mb-8 max-w-lg"
                      style={{
                        opacity: isLoaded ? 1 : 0,
                        transform: isLoaded ? "none" : "translateY(20px)",
                        transitionProperty: "opacity, transform",
                        transitionDuration: "1s",
                        transitionDelay: "0.7s",
                      }}
                    >
                      Your journey begins with a single search. Where will your
                      adventures take you?
                    </p>
                  </div>

                  {/* Interactive Search Box */}
                  <div
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-1 shadow-2xl border border-white/20 mb-8 transform transition-all duration-1000 delay-1000"
                    style={{
                      opacity: isLoaded ? 1 : 0,
                      transform: isLoaded ? "none" : "translateY(30px)",
                      boxShadow: "0 0 30px rgba(79, 70, 229, 0.3)",
                    }}
                  >
                    <div className="relative p-4">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-indigo-600/30 flex items-center justify-center">
                          <Navigation size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white text-lg font-medium relative flex items-center">
                            <span className="mr-1">I want to fly to</span>
                            <div className="relative min-w-20 inline-block">
                              <span className="text-blue-200">
                                {searchText}
                              </span>
                              <span className="absolute right-0 top-0 h-full w-2 bg-blue-200 animate-blink"></span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <a href="/book">
                        <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-medium rounded-xl transition-colors shadow-lg flex items-center justify-center space-x-2">
                          <span>Find My Adventure</span>
                          <Compass size={18} />
                        </button>
                      </a>
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div
                    className="flex items-center space-x-6 text-blue-200 text-sm"
                    style={{
                      opacity: isLoaded ? 0.8 : 0,
                      transform: isLoaded ? "none" : "translateY(20px)",
                      transitionProperty: "opacity, transform",
                      transitionDuration: "1s",
                      transitionDelay: "1.3s",
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 rounded-full bg-blue-600/30 flex items-center justify-center">
                        <span className="text-xs">✓</span>
                      </div>
                      <span>No hidden fees</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 rounded-full bg-blue-600/30 flex items-center justify-center">
                        <span className="text-xs">✓</span>
                      </div>
                      <span>Trusted by 2M+ travelers</span>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Globe Visualization */}
                <div
                  className={`relative h-96 md:h-[550px] transition-all duration-1000 delay-500 ${
                    isLoaded
                      ? "opacity-100 transform-none"
                      : "opacity-0 translate-x-8"
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Globe container with rotation */}
                    <div
                      className="relative w-80 h-80 md:w-[400px] md:h-[400px]"
                      style={{
                        transform: `rotate(${globeRotation}deg)`,
                        transition: "transform 0.5s ease-out",
                      }}
                    >
                      {/* Outer circular path */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border-2 border-white/10"></div>

                      {/* Middle circular path */}
                      <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full border-2 border-white/15"
                        style={{
                          animation: "rotate-reverse 30s linear infinite",
                        }}
                      ></div>

                      {/* Inner circular path */}
                      <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full border-2 border-white/20"
                        style={{ animation: "rotate 20s linear infinite" }}
                      ></div>

                      {/* Central glowing orb (Earth) */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                          {/* Glowing effect */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-60 blur-xl"></div>

                        </div>
                      </div>

                      {/* Flight path animations */}
                      <svg
                        className="absolute inset-0 w-full h-full"
                        style={{ animation: "rotate-slow 60s linear infinite" }}
                      >
                        <defs>
                          <linearGradient
                            id="flightGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop
                              offset="0%"
                              stopColor="rgba(255, 255, 255, 0.1)"
                            />
                            <stop
                              offset="100%"
                              stopColor="rgba(255, 255, 255, 0.7)"
                            />
                          </linearGradient>
                        </defs>

                        {flightPaths.map((path, index) => (
                          <g
                            key={index}
                            style={{
                              opacity: activePath === index ? 1 : 0.3,
                              transition: "opacity 1s ease",
                            }}
                          >
                            <path
                              d={`M${path.from.x},${path.from.y} Q${
                                (path.from.x + path.to.x) / 2 + 30
                              },${(path.from.y + path.to.y) / 2 - 50} ${
                                path.to.x
                              },${path.to.y}`}
                              fill="none"
                              stroke="url(#flightGradient)"
                              strokeWidth="2"
                              strokeDasharray="5,5"
                              className={
                                activePath === index ? "animate-dash" : ""
                              }
                            />

                            {/* Animated plane along the path */}
                            {activePath === index && (
                              <g>
                                <circle
                                  r="4"
                                  fill="white"
                                  className="animate-ping-slow"
                                  style={{
                                    transformOrigin: "center",
                                    transformBox: "fill-box",
                                    animation:
                                      "moveAlongPath 3s ease-in-out infinite",
                                  }}
                                >
                                  <animateMotion
                                    dur="3s"
                                    repeatCount="indefinite"
                                    path={`M${path.from.x},${path.from.y} Q${
                                      (path.from.x + path.to.x) / 2 + 30
                                    },${(path.from.y + path.to.y) / 2 - 50} ${
                                      path.to.x
                                    },${path.to.y}`}
                                  />
                                </circle>
                              </g>
                            )}
                          </g>
                        ))}
                      </svg>

                      {/* Location markers around the globe */}
                      <div className="absolute top-0 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 bg-pink-400 rounded-full animate-ping-slow"></div>
                      </div>
                      <div className="absolute bottom-1/4 right-0 transform translate-x-1/2 translate-y-1/2">
                        <div
                          className="w-4 h-4 bg-blue-400 rounded-full animate-ping-slow"
                          style={{ animationDelay: "1s" }}
                        ></div>
                      </div>
                      <div className="absolute bottom-0 left-1/3 transform -translate-x-1/2 translate-y-1/2">
                        <div
                          className="w-4 h-4 bg-purple-400 rounded-full animate-ping-slow"
                          style={{ animationDelay: "2s" }}
                        ></div>
                      </div>
                    </div>

                    {/* Floating destination cards */}

                    <DestinationHighlight
                      city="New York"
                      country="United States"
                      image="https://i.pinimg.com/736x/15/e0/15/15e015d2aec7f5c12529a6256597446d.jpg"
                      stats="Most popular"
                      delay={1600}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160">
            <path fill="#f9fafb" fillOpacity="1" d="M0,128L80,117.3C160,107,320,85,480,90.7C640,96,800,128,960,133.3C1120,139,1280,117,1360,106.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
        </div>
        

        {/* Add new CSS animations */}
        <style jsx global>{`
          @keyframes pulse-slow {
            0% {
              transform: scale(1);
              opacity: 0.2;
            }
            100% {
              transform: scale(1.1);
              opacity: 0.3;
            }
          }

          @keyframes move-slow {
            0% {
              transform: translateX(0) translateY(0);
            }
            50% {
              transform: translateX(100px) translateY(50px);
            }
            100% {
              transform: translateX(0) translateY(0);
            }
          }

          @keyframes move-slow-reverse {
            0% {
              transform: translateX(0) translateY(0);
            }
            50% {
              transform: translateX(-100px) translateY(-50px);
            }
            100% {
              transform: translateX(0) translateY(0);
            }
          }

          @keyframes move-diagonal {
            0% {
              transform: translateX(0) translateY(0);
            }
            33% {
              transform: translateX(-50px) translateY(50px);
            }
            66% {
              transform: translateX(50px) translateY(-30px);
            }
            100% {
              transform: translateX(0) translateY(0);
            }
          }

          @keyframes rotate {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }

          @keyframes rotate-reverse {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(-360deg);
            }
          }

          @keyframes rotate-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes ping-slow {
            0% {
              transform: scale(0.8);
              opacity: 1;
            }
            50% {
              transform: scale(1.5);
              opacity: 0.5;
            }
            100% {
              transform: scale(0.8);
              opacity: 1;
            }
          }

          @keyframes moveAlongPath {
            0% {
              offset-distance: 0%;
            }
            100% {
              offset-distance: 100%;
            }
          }

          @keyframes dash {
            to {
              stroke-dashoffset: 20;
            }
          }

          @keyframes blink {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
          }

          .animate-ping-slow {
            animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
          }

          .animate-blink {
            animation: blink 0.8s step-end infinite;
          }

          .animate-dash {
            animation: dash 0.5s linear infinite;
          }
        `}</style>
      </div>
      

      {/* Why Us Section with improved styling */}
      <section className="py-16 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyUsFeatures.map((feature, index) => (
              <div key={index} className="p-8 rounded-xl bg-white shadow-lg">
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full text-3xl mb-6 bg-gradient-to-br from-blue-50 to-purple-50">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto mb-16 md:mb-24 px-4 pt-20">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-500 mb-6">
              Relation so in confined smallest children unpacked delicate. Why
              sir end believe uncivil respect. Always get adieus nature day
              course for common.
            </p>
          </div>
          <div
            ref={containerRef}
            className="w-full md:w-1/2 overflow-hidden relative h-80"
          >
            <div ref={sliderRef} className="testimonial-slider">
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

      {/* Articles/Travel Options Section with modern design */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-2">
              Fly With AeroTix
            </h3>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Make This Trip Extraordinary
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enjoy The Experience & Plan An Unforgettable Trip After Your
              Flight
            </p>
          </div>

          {/* Dubai Highlight and Cabin Classes with enhanced styling */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dubai Highlight Card */}
            <div className="lg:col-span-1">
              {destinations.map((dest, index) => (
                <div
                  key={index}
                  className="h-full bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01] border border-gray-100"
                >
                  <div className="relative h-full">
                    <img
                      src={dest.image}
                      alt={dest.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <p className="text-white text-xs font-medium mb-2">
                          {dest.type}
                        </p>
                        <h3 className="text-white text-2xl font-bold mb-4">
                          {dest.title}
                        </h3>
                        <a href="/article">
                          <button className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors">
                            {dest.cta}
                          </button>
                        </a>
                      </div>
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
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01] border border-gray-100"
                  >
                    <div className="relative h-48">
                      <img
                        src={cabin.image}
                        alt={cabin.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <p className="text-white text-xs font-medium mb-1">
                            {cabin.type}
                          </p>
                          <h3 className="text-white text-xl font-bold mb-3">
                            {cabin.title}
                          </h3>
                          <a href="/cabin">
                            <button className="px-4 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors">
                              {cabin.cta}
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
