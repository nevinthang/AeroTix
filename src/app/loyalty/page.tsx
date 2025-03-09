"use client";
import { useState } from 'react';
import FAQDropdown from "@/components/card/dropdown_card";

export default function Loyalty() {
  const [activeTab, setActiveTab] = useState('about');

  const travelPackages = [
    {
      title: "Ramadhan Voucher",
      description: "Discount food up to 30%",
      image: "https://i.pinimg.com/736x/d3/90/d5/d390d5bf562cfee4c36f0a48f89e9ae6.jpg",
      link: "#",
      points : 5000
    },
    {
      title: "14K Gold Airplane Necklace, Plane Choker",
      description: "Hike through breathtaking mountain landscapes.",
      image: "https://i.pinimg.com/736x/c5/d7/a6/c5d7a6363e6685e9d8a9048c3d7832e1.jpg",
      link: "#",
      points : 15000
    },
    {
      title: "Space Chic Souvenirs Double Brooch by Erstwilder",
      description: "54mm x 50mm 38mm x 54mm (H x W) If you missed out on a visit to the space duty-free before departure ask the friendly cabin crew about our in-flight shopping service.",
      image: "https://i.pinimg.com/736x/85/83/29/85832997ca39405b4aa4b80a78bb3dbc.jpg",
      link: "#",
      points : 8000
    },
    {
      title: "Suitcase Luggage",
      description: "Because nothing says “I love you” like matching luggage. You don’t need a date for Valentine’s Day, but you do need durable luggage.",
      image: "https://i.pinimg.com/736x/df/72/a9/df72a9ece587f47e5c93d6068dbac8bc.jpg",
      link: "#",
      points : 7000
    }
  ];

  const faqs = [
    {
      question: "What are loyalty points?",
      answer: "Loyalty points are rewards earned through our loyalty program when you make purchases or engage with our services. These points can be redeemed for discounts, vouchers, or special perks.",
    },
    {
      question: "How do I claim my loyalty points?",
      answer: "You can claim your loyalty points by logging into your account and navigating to the Loyalty page in rewards sectiom. From there, you can redeem points for discounts, vouchers, or exclusive perks.",
    },
    {
        question: " How can I earn loyalty points?",
        answer: "You can earn loyalty points by purchasing tickets, referring friends, joining special promotions, or completing certain activities within our loyalty program. Check our rewards page for more details.",
    },
    {
        question: "Can I transfer my loyalty points to someone else?",
        answer: "No, loyalty points are non-transferable and can only be used by the account holder who earned them.",
    },
    {
        question: "Do my loyalty points expire?",
        answer: "Yes, loyalty points can expire at the end of each year. These points will be reset automatically by the system.",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="relative bg-gray-100 h-64 pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/pesawat1.png" 
            alt="Travel background" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Manage Your Travel Rewards</h1>
        </div>
      </div>

      {/* Program Selection Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex overflow-x-auto space-x-1 border-b">
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-3 font-medium whitespace-nowrap ${
                activeTab === 'about' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-4 py-3 font-medium whitespace-nowrap ${
                activeTab === 'rewards' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Rewards
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-3 font-medium whitespace-nowrap ${
                activeTab === 'contact' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Contact 
          </button>
        </div>
      </div>

      {/* Program Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'about' && (
          <div className="mt-5 space-y-6">
            {faqs.map((faq, index) => (
              <FAQDropdown key={index} faq={faq} />
            ))}
          </div>
        )}
        {activeTab === 'rewards' && (
            <div>
                <h2 className="text-2xl font-bold mb-6">More rewards and ways to spend your rewards</h2>
                <div className="grid lg:grid-cols-4 gap-6 mb-10">
                {travelPackages.map((pkg, index) => (
                    <div key={index} className="bg-white rounded-lg shadow overflow-hidden relative">
                        {/* Badge Jumlah Poin */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600  text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
            {pkg.points} Points
          </div>
                    <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover" />
                    <div className="p-4 pb-14">
                        <h3 className="font-medium text-lg mb-1">{pkg.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{pkg.description}</p>
                        <a href={pkg.link} className="text-blue-600 font-medium flex items-center absolute bottom-4 right-4">
                        Claim
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        </a>
                    </div>
                    </div>
                ))}
                </div>  
            </div>
            )}
        {activeTab === 'contact' && (
          <div className="card-box bg-white rounded-xl shadow-lg p-6 text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Any Problems? Contact Us</h1>
          <p className="text-gray-600">We are here to help you. Feel free to reach out to us.</p>
          
          <div className="flex flex-col items-center space-y-2">
            <p className="text-lg font-medium text-gray-700">
              📧 Email: <a href="mailto:aerotix@admin.com" className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:underline">aerotix@admin.com</a>
            </p>
            <p className="text-lg font-medium text-gray-700">
              📞 Phone: <a href="tel:+6281234567890" className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:underline">+62 812 3456 7890</a>
            </p>
          </div>
          
          {/* <button className="mt-4 px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
            Contact Support
          </button> */}
        </div>
        )}
      </div>
    </div>
  );
}
