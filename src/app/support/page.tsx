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
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (id: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqItems = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section with Curved Bottom */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white pt-24 pb-32 relative">
          {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Original blur elements */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl"></div>
        <div className="absolute top-40 left-1/4 w-32 h-32 rounded-full bg-blue-300/10 blur-xl"></div>
        <div className="absolute bottom-40 right-1/4 w-40 h-40 rounded-full bg-purple-400/10 blur-xl"></div>
        <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2 w-24 h-24 bg-white opacity-5 rounded-full blur-lg"></div>
        
        {/* Added animated bubbles with blur effect */}
        <div className="absolute top-24 left-10 w-20 h-20 rounded-full bg-white/10 blur-xl animate-pulse"></div>
        <div className="absolute top-1/4 right-1/3 w-16 h-16 rounded-full bg-blue-200/15 blur-lg animate-bounce" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-28 h-28 rounded-full bg-purple-300/10 blur-xl animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute top-2/3 right-20 w-12 h-12 rounded-full bg-white/5 blur-md animate-bounce" style={{animationDuration: '7s'}}></div>
        <div className="absolute top-1/2 left-20 w-14 h-14 rounded-full bg-blue-100/10 blur-lg animate-pulse" style={{animationDuration: '5s'}}></div>
        
        {/* Additional floating elements */}
        <div className="absolute bottom-20 right-1/3 w-24 h-24 rounded-full bg-indigo-300/10 blur-xl animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute top-10 left-1/2 w-10 h-10 rounded-full bg-white/10 blur-md animate-bounce" style={{animationDuration: '9s'}}></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-purple-200/15 blur-lg animate-pulse" style={{animationDuration: '7s'}}></div>
        <div className="absolute top-1/3 right-10 w-20 h-20 rounded-full bg-blue-400/10 blur-xl animate-bounce" style={{animationDuration: '10s'}}></div>
      </div>
    
        <div className="container mx-auto px-4 text-center relative z-10 pt-10">
          <h1 className="text-5xl font-bold mb-6">How Can We Help You?</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">Get the answers you need with our comprehensive support resources</p>
          
          {/* Search Bar */}
          {/* <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full py-4 px-6 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-3 bg-purple-600 text-white p-2 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div> */}
        </div>
        
        {/* Curved Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160">
            <path fill="#f9fafb" fillOpacity="1" d="M0,128L80,117.3C160,107,320,85,480,90.7C640,96,800,128,960,133.3C1120,139,1280,117,1360,106.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
        {/* Curved Bottom Design */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160">
            <path fill="#f9fafb" fillOpacity="1" d="M0,128L80,117.3C160,107,320,85,480,90.7C640,96,800,128,960,133.3C1120,139,1280,117,1360,106.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-5xl mx-auto">
            <div>
              {filteredFaqItems.slice(0, Math.ceil(filteredFaqItems.length/2)).map(item => (
                <div key={item.id} className="bg-gray-50 rounded-lg mb-4 overflow-hidden shadow-sm">
                  <div 
                    className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => toggleItem(item.id)}
                  >
                    <h3 className="text-purple-700 font-medium pr-8">{item.question}</h3>
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 transition-transform duration-300 ${expandedItems[item.id] ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                  <div className={`transition-all duration-300 overflow-hidden ${expandedItems[item.id] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="p-5 pt-0 text-gray-600">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              {filteredFaqItems.slice(Math.ceil(filteredFaqItems.length/2)).map(item => (
                <div key={item.id} className="bg-gray-50 rounded-lg mb-4 overflow-hidden shadow-sm">
                  <div 
                    className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => toggleItem(item.id)}
                  >
                    <h3 className="text-purple-700 font-medium pr-8">{item.question}</h3>
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 transition-transform duration-300 ${expandedItems[item.id] ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                  <div className={`transition-all duration-300 overflow-hidden ${expandedItems[item.id] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="p-5 pt-0 text-gray-600">{item.answer}</p>
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