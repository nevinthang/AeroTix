import React from 'react';

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full overflow-hidden">
        
        <div className="px-6 py-5 relative">
          
          {/* Profile header with actions */}
          <div className="flex flex-col md:flex-row justify-between mt-16 md:mt-0 md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Jeremy Rose</h2>
              <div className="flex items-center mt-1">
                <div className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                  Member Gold
                </div>
              </div>
            </div>
            
            <button className="mt-4 md:mt-0 flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Profile
            </button>
          </div>
          
          {/* Loyalty points */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <p className="text-xs uppercase font-semibold text-blue-600 mb-1">Royalti Points</p>
            <div className="flex items-center">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-3/4"></div>
              </div>
              <span className="ml-4 text-lg font-bold text-blue-800">750</span>
            </div>
          </div>
          
          {/* Contact information */}
          <div className="mb-8">
            <br/>
            <h3 className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-4">CONTACT INFORMATION</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Phone</p>
                <p className="text-base font-medium text-gray-800">+1 123 456 7890</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">E-mail</p>
                <p className="text-base font-medium text-blue-600">hello@jeremyrose.com</p>
              </div>
            </div>
          </div>
          
          {/* Personal information */}
          <div>
            <h3 className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-4">PERSONAL INFORMATION</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Birthday</p>
                <p className="text-base font-medium text-gray-800">June 5, 1992</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Gender</p>
                <p className="text-base font-medium text-gray-800">Male</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}