import React, { useState, useEffect } from "react";
import { Plane, MapPin, Calendar, ArrowRight } from "lucide-react";
import Button from "./ui/button";

const ModernHeroSection = () => {
  const [activeTab, setActiveTab] = useState("roundtrip");
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient circle */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-100 to-purple-100 blur-3xl"
          style={{
            top: "10%",
            right: "0%",
            transform: `translate(40%, -40%) rotate(${
              scrollPosition * 0.1
            }deg)`,
          }}
        />

        {/* Smaller floating shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full blur-xl animate-float-delayed" />

        {/* Decorative lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-200 to-transparent" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-purple-200 to-transparent" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-200 to-transparent" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-5xl mx-auto">
          {/* Hero Text */}
          <div className="text-center mb-16 relative">
            <div className="relative inline-block">
              <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gray-900">
                Explore
                <span className="relative mx-4">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Beyond
                  </span>
                  <svg
                    className="absolute -bottom-4 left-0 w-full"
                    height="10"
                    viewBox="0 0 100 10"
                  >
                    <path
                      d="M0 5 Q25 0, 50 5 T100 5"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      fill="none"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#2563EB" />
                        <stop offset="100%" stopColor="#7C3AED" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                Horizons
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your journey to extraordinary destinations begins with a single
              search
            </p>
          </div>

          {/* Search Card */}
          <div className="relative">
            {/* Glowing effect behind card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-purple-200 rounded-[2.5rem] blur opacity-70" />

            {/* Main card */}
            <div className="relative bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100">
              {/* Flight Type Tabs */}
              <div className="flex gap-4 mb-8 justify-center">
                {["roundtrip", "oneway", "multicity"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Search Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">
                    From
                  </label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 w-5 h-5 group-hover:text-blue-700 transition-colors" />
                    <input
                      type="text"
                      placeholder="Departure City"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">
                    To
                  </label>
                  <div className="relative group">
                    <Plane className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-600 w-5 h-5 group-hover:text-purple-700 transition-colors" />
                    <input
                      type="text"
                      placeholder="Arrival City"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-400 focus:ring focus:ring-purple-100 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">
                    Departure
                  </label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 w-5 h-5 group-hover:text-blue-700 transition-colors" />
                    <input
                      type="date"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:border-blue-400 focus:ring focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">
                    Return
                  </label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 w-5 h-5 group-hover:text-blue-700 transition-colors" />
                    <input
                      type="date"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:border-blue-400 focus:ring focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="mt-8 flex justify-center">
                <Button text="Search Flight" showArrow />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframe animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ModernHeroSection;
