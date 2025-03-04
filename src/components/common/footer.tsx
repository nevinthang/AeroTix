"use client";

import React from 'react';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Site Map', href: '#' }
    ]
  };

  const contactInfo = [
    { icon: Mail, text: 'aerotix@admin.com', href: 'mailto:aerotix@admin.com' },
    { icon: Phone, text: '+62 81234567890', href: 'tel:+6281234567890' },
    { icon: MapPin, text: 'Fasilkom UI Kampus Depok', href: 'https://maps.app.goo.gl/dKSsX5jYUegKNnnC8' }
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'Github' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="backdrop-blur-md bg-white/30 border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap justify-between gap-8">
          {/* Company Info (Kiri) */}
          <div className="space-y-4 max-w-sm">
            <h2 className="text-2xl font-bold text-gray-800">Aerotix</h2>
            <p className="text-gray-600">Elevate Your Journey With Aerotix</p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-600 hover:text-gray-800 transition-transform duration-200 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links (Kanan) */}
          <div className="flex flex-wrap gap-8">
            {Object.entries(footerSections).map(([title, links]) => (
              <div key={title} className="space-y-4 min-w-[120px]">
                <h3 className="text-lg font-semibold text-gray-800 capitalize">
                  {title}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-gray-600 hover:text-gray-800 transition-transform duration-200 hover:translate-x-1 inline-block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-200/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactInfo.map((info) => (
              <a
                key={info.text}
                href={info.href}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <info.icon className="h-5 w-5 mr-2" />
                <span>{info.text}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200/20 text-center text-gray-600">
          <p>© {currentYear} Aerotix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
