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
    <footer className="backdrop-blur-md bg-white/40 border-t border-white/20 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
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
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold text-gray-800">Contact Us</h3>
            {contactInfo.map((info) => (
              <a
                key={info.text}
                href={info.href}
                className="flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <info.icon className="h-5 w-5 mr-2" />
                <span>{info.text}</span>
              </a>
            ))}
          </div>

          {/* Quick Links */}
          <div className="flex justify-end">
            {Object.entries(footerSections).map(([title, links]) => (
              <div key={title} className="space-y-4 min-w-[140px] text-right">
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

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200/20 text-center text-gray-600">
          <p>© {currentYear} Aerotix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;