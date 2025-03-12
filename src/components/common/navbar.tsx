"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, UserCircle, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState<string | null>(null);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Book", href: "/book" },
    { label: "Check In", href: "/checkin" },
    { label: "Loyalty", href: "/loyalty" },
    { label: "Support", href: "/support" },
  ];

  // Detect active page based on pathname
  useEffect(() => {
    // Get current pathname
    const path = window.location.pathname;

    if (path === "/") {
      setActivePage("Home");
    } else {
      // Find nav item that matches the current pathname
      const activeItem = navItems.find(item => 
        path.startsWith(item.href) && item.href !== "/"
      );
      if (activeItem) {
        setActivePage(activeItem.label);
      }
    }
  }, []);

  // Handle logout
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-md bg-white/30 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img src="/logo1.png" alt="AR PLANE Logo" className="w-24 md:w-32 h-auto" />
            </div>

            {/* Desktop Navigation & Authentication */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Navigation Items */}
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative text-gray-800 px-3 py-2 rounded-md text-sm font-medium group"
                >
                  <span className={`relative z-10 ${activePage === item.label ? "font-medium" : ""}`}>
                    {item.label}
                  </span>
                  <span 
                    className={`absolute inset-x-0 -bottom-1 h-0.5 bg-gray-800 transform origin-left transition-transform duration-200 ${
                      activePage === item.label ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </a>
              ))}

              {/* Login Button or User Menu */}
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <Link href="/profile">
                    <UserCircle className="w-8 h-8 text-gray-800 cursor-pointer hover:text-gray-600 transition-colors" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-800 hover:text-gray-600"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <a
                  href="/auth"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-transform duration-200 hover:scale-105"
                >
                  Login
                </a>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none transition-transform duration-200 hover:scale-110"
              >
                {isOpen ? (
                  <X className="h-6 w-6 transform transition-transform duration-200" />
                ) : (
                  <Menu className="h-6 w-6 transform transition-transform duration-200" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden backdrop-blur-md bg-white/30 transform transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 space-y-3">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-gray-800 px-4 py-2 rounded-md text-base font-medium transition-all duration-200 hover:bg-white/20 relative"
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <span className={activePage === item.label ? "font-medium" : ""}>
                  {item.label}
                </span>
                {activePage === item.label && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gray-800"></span>
                )}
              </a>
            ))}

            {/* Mobile Authentication */}
            <div className="mt-4 flex justify-center">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <a
                  href="/auth"
                  className="w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Login
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;