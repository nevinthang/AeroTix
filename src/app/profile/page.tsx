import React from 'react';

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center p-4 pt-20">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6">
        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="md:w-1/3 md:pr-6">
            <div className="mb-6">
              <img 
                src="https://i.pinimg.com/736x/fd/eb/32/fdeb32949ac5e4b18e73d19c9f0cdbf9.jpg" 
                alt="Profile" 
                className="rounded-md w-full max-w-xs"
              />
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-800">Spotify New York</h3>
              <p className="text-sm text-gray-600">175 William Street</p>
              <p className="text-sm text-gray-600">New York, NY 10038-78.212.122.81</p>
              <span className="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded mt-1">Primary</span>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-800">Metropolitan Museum</h3>
              <p className="text-sm text-gray-600">525 E 68th Street</p>
              <p className="text-sm text-gray-600">New York, NY 10651-78.158.187.60</p>
              <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mt-1">Secondary</span>
            </div>
            
          </div>
          
          {/* Right Section */}
          <div className="md:w-2/3 mt-6 md:mt-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-medium text-gray-800">Jeremy Rose</h2>
                <div className="flex items-center">
                  <p className="text-sm text-gray-600 mr-2">New York, NY</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-1">Member Gold</p>
            </div>
            
            
            <div className="border-b mb-6">
              <div className="flex justify-between mb-2">
                <div className="flex space-x-6">
                  <button className="flex items-center py-2 text-blue-600 border-b-2 border-blue-600">
                    About
                  </button>
                </div>
                <button className="flex items-center text-gray-600 hover:text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit Profile
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-3">CONTACT INFORMATION</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Phone:</p>
                  <p className="text-sm text-gray-800">+1 123 456 7890</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Address:</p>
                  <p className="text-sm text-gray-800">525 E 68th Street</p>
                  <p className="text-sm text-gray-800">New York, NY 10651-78.158.187.60</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">E-mail:</p>
                  <p className="text-sm text-blue-600">hello@jeremyrose.com</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Site:</p>
                  <p className="text-sm text-blue-600">www.jeremyrose.com</p>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-gray-400 mb-3">BASIC INFORMATION</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Birthday:</p>
                  <p className="text-sm text-gray-800">June 5, 1992</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Gender:</p>
                  <p className="text-sm text-gray-800">Male</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}