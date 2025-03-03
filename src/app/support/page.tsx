// import BlurCircle from "@/components/ui/blur_circle";
// import Button from "@/components/ui/button";
// import DestinationCard from "@/components/card/destination_card";
// import FAQDropdown from "@/components/card/dropdown_card";
// import TextInput from "@/components/forms/textbox";
// import DateInput from "@/components/forms/dateinput";
// import TextArea from "@/components/forms/textarea";
  // const destinations = [
  //   {
  //     imageUrl: "https://source.unsplash.com/400x250/?bali",
  //     name: "Bali, Indonesia",
  //     rating: 4.8,
  //     reviews: 2451,
  //     description: "Nikmati keindahan pantai dan budaya di pulau Dewata.",
  //     price: "$899",
  //     duration: "7 hari",
  //     isFavorite: true,
  //   },
  //   {
  //     imageUrl: "https://source.unsplash.com/400x250/?paris",
  //     name: "Paris, France",
  //     rating: 4.9,
  //     reviews: 3210,
  //     description: "Menara Eiffel dan suasana romantis menantimu di Paris.",
  //     price: "$1200",
  //     duration: "5 hari",
  //     isFavorite: false,
  //   },
  // ];

  // const faqs = [
  //   {
  //     question: "What's included in the travel package?",
  //     answer: "Our travel package includes round-trip flights, hotel accommodation...",
  //   },
  //   {
  //     question: "What's the cancellation policy?",
  //     answer: "Free cancellation up to 48 hours before the trip...",
  //   },
  // ];

  // return (
  //   <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-main">
  //     <Button text="Search c" showArrow />
  //     <BlurCircle></BlurCircle>
  //     <div className="card-box">alsjdialsjdliajsdliasjauuskdhhhhhhhhhhhhhhhhhhhhhhhhh</div>
  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-10">
  //       {destinations.map((dest, index) => (
  //         <DestinationCard key={index} destination={dest} />
  //       ))}
  //     </div>
  //     <div className="my-20"></div>
  //     {faqs.map((faq, index) => (
  //       <FAQDropdown key={index} faq={faq} />
  //     ))}
  //     <form>
  //     <TextInput
  //       label="Full Name"
  //       placeholder="Enter your full name"
  //       helperText="As it appears on your passport"
  //     />
      
  //     <TextArea
  //       label="Special Requests"
  //       placeholder="Any special requirements..."
  //     />
      
  //     <DateInput
  //       label="Check-in Date"
  //       helperText="Check-in time starts from 3 PM"
  //     />
  //   </form>
  //   </div>
  // );
  // pages/support.js

  import React from 'react';
  import Head from 'next/head';
  import Link from 'next/link';
  import { FaTwitter, FaFacebook, FaInstagram, FaVimeo } from 'react-icons/fa';
    
  export default function Support() {
    return (
      <div className="min-h-screen flex flex-col">
        <Head>
          <title>Guia - Support</title>
          <meta name="description" content="Support page for Guia" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-xl font-bold">Guia</div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-gray-200">Home</Link>
              <Link href="/category" className="hover:text-gray-200">Category</Link>
              <Link href="/article" className="hover:text-gray-200">Article</Link>
              <Link href="/changelog" className="hover:text-gray-200">Changelog</Link>
              <Link href="/dropdown" className="hover:text-gray-200">Dropdown</Link>
              <Link href="/contact" className="bg-white text-purple-600 px-4 py-2 rounded">Contact</Link>
            </nav>
          </div>
        </header>
  
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-8">How can we help you?</h1>
            <div className="max-w-2xl mx-auto relative">
              <div className="flex items-center bg-white bg-opacity-20 rounded-md p-2">
                <svg className="w-5 h-5 text-white ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for answers"
                  className="w-full bg-transparent border-none p-2 text-white placeholder-white placeholder-opacity-70 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </section>
  
        {/* Support Categories */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Getting Started */}
              <div className="border rounded-lg p-6 flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-purple-700">Getting Started</h3>
                  <p className="text-gray-600 mt-1">Get started fast with installation and theme setup instructions.</p>
                </div>
              </div>
  
              {/* User Account */}
              <div className="border rounded-lg p-6 flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-purple-700">User Account</h3>
                  <p className="text-gray-600 mt-1">Get started fast with installation and theme setup instructions.</p>
                </div>
              </div>
  
              {/* Product Features */}
              <div className="border rounded-lg p-6 flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-purple-700">Product Features</h3>
                  <p className="text-gray-600 mt-1">Get started fast with installation and theme setup instructions.</p>
                </div>
              </div>
  
              {/* Customization Options */}
              <div className="border rounded-lg p-6 flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-purple-700">Customization Options</h3>
                  <p className="text-gray-600 mt-1">Get started fast with installation and theme setup instructions.</p>
                </div>
              </div>
  
              {/* Payment Gateways */}
              <div className="border rounded-lg p-6 flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-purple-700">Payment Gateways</h3>
                  <p className="text-gray-600 mt-1">Get started fast with installation and theme setup instructions.</p>
                </div>
              </div>
  
              {/* Security Options */}
              <div className="border rounded-lg p-6 flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-purple-700">Security Options</h3>
                  <p className="text-gray-600 mt-1">Get started fast with installation and theme setup instructions.</p>
                </div>
              </div>
  
              {/* Digital Downloads */}
              <div className="border rounded-lg p-6 flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-purple-700">Digital Downloads</h3>
                  <p className="text-gray-600 mt-1">Get started fast with installation and theme setup instructions.</p>
                </div>
              </div>
  
              {/* Email Marketing */}
              <div className="border rounded-lg p-6 flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-purple-700">Email Marketing</h3>
                  <p className="text-gray-600 mt-1">Get started fast with installation and theme setup instructions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* FAQ Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently asked questions</h2>
            <div className="max-w-3xl mx-auto">
              {/* FAQ Item */}
              <div className="border-b py-4">
                <div className="flex justify-between items-center cursor-pointer">
                  <h3 className="text-purple-700">Do you provide customer support?</h3>
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              
              {/* FAQ Item */}
              <div className="border-b py-4">
                <div className="flex justify-between items-center cursor-pointer">
                  <h3 className="text-purple-700">Are updates and bug fixes included in the cost of the item?</h3>
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
    
