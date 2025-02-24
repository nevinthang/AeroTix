"use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Book', href: '#about' },
    { label: 'Check In', href: '#services' },
    { label: 'Loyalty', href: '#contact' },
    { label: 'Support', href: '#contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-md bg-white/30 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-gray-800 hover:scale-105 transition-transform duration-200 inline-block">
              <img src="/logo1.png" alt="AR PLANE Logo" className="w-24 md:w-32 h-auto" />
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="relative text-gray-800 px-3 py-2 rounded-md text-sm font-medium group"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gray-800 transform origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none transition-transform duration-200 hover:scale-110"
              >
                {isOpen ? (
                  <X className="h-6 w-6 transform transition-transform duration-200 rotate-0" />
                ) : (
                  <Menu className="h-6 w-6 transform transition-transform duration-200 rotate-0" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden backdrop-blur-md bg-white/30 transform transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-800 block px-3 py-2 rounded-md text-base font-medium transform transition-all duration-200 hover:translate-x-2 hover:bg-white/20"
                style={{
                  transitionDelay: `${index * 50}ms`
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;