"use client";

import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQDropdownProps {
  faq?: FAQItem;
}

const FAQDropdown: React.FC<FAQDropdownProps> = ({ 
  faq = {
    question: "What's included in the travel package?",
    answer: "Our travel package includes round-trip flights, hotel accommodation, daily breakfast, airport transfers, and guided tours to major attractions. Additional activities and meals can be arranged at extra cost."
  }
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const contentHeight = contentRef.current?.scrollHeight;

  return (
    <div className="card-box group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left transition-colors duration-200 hover:bg-gray-50 rounded-xl"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {faq.question}
          </h3>
          <ChevronDown 
            className={`w-5 h-5 text-blue-600 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]`}
        style={{ 
          maxHeight: isOpen ? `${contentHeight}px` : '0',
          opacity: isOpen ? 1 : 0,
          transform: `translate3d(0, ${isOpen ? '0' : '-8px'}, 0)`
        }}
      >
        <div 
          ref={contentRef}
          className="p-6 pt-0"
        >
          <p className="text-gray-600">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQDropdown;