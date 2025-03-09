"use client";
import React, { useState } from 'react';

export default function Support() {
  const faqItems = [
    { id: 1, question: "Do you provide customer support?", answer: "Yes, we provide 24/7 customer support for all our users. You can reach our support team via email, live chat, or phone." },
    { id: 2, question: "Is this guaranteed and safe?", answer: "Of course! Aerotix is the one of the best platform in Indonesia Country" },
    { id: 3, question: "How do I book a flight through your platform?", answer: "Booking a flight is simple! Navigate to the 'Book' section, enter your details, and complete your booking." },
    { id: 4, question: "How does the loyalty program work?", answer: "Our loyalty program rewards you for every flight booked through our platform with redeemable points." },
    { id: 5, question: "Where can I find customer support for more info?", answer: "You can email us at: aerotix@admin.com" },
    { id: 6, question: "Can I cancel my flight after booking?", answer: "No, after you finish your booking, you can't cancel your flight." },
    { id: 7, question: "What payment methods do you accept?", answer: "We accept major credit and debit cards, PayPal, digital wallets, and some airline-specific payment options." },
    { id: 8, question: "Can I change my flight after booking?", answer: "No, you can't change anything after the transaction." },
    { id: 9, question: "How do I receive my ticket after booking?", answer: "Once you complete your booking, your e-ticket will be sent to your registered email." },
    { id: 10, question: "Do you offer travel insurance?", answer: "Yes, all ticket reservations have travel insurance included in the price of each ticket." }
  ];

  const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({});

  const toggleItem = (id: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <br/><br/><br/>
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-8">How can we help you?</h1>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div>
              {faqItems.slice(0, 5).map(item => (
                <div key={item.id} className="border-b py-4">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleItem(item.id)}>
                    <h3 className="text-purple-700 font-medium">{item.question}</h3>
                    <svg className={`w-5 h-5 text-purple-600 transition-transform duration-300 ${expandedItems[item.id] ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                  <div className={`mt-2 text-gray-600 transition-all duration-300 overflow-hidden ${expandedItems[item.id] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="pb-2">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              {faqItems.slice(5).map(item => (
                <div key={item.id} className="border-b py-4">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleItem(item.id)}>
                    <h3 className="text-purple-700 font-medium">{item.question}</h3>
                    <svg className={`w-5 h-5 text-purple-600 transition-transform duration-300 ${expandedItems[item.id] ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                  <div className={`mt-2 text-gray-600 transition-all duration-300 overflow-hidden ${expandedItems[item.id] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="pb-2">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}