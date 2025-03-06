import React, { useState, useRef, useEffect } from 'react';

const TravelSearchForm = () => {
  // State for passenger counts
  const [passengers, setPassengers] = useState({
    adults: 2,
    children: 0,
    infants: 0
  });
  
  // State for modal visibility
  const [showModal, setShowModal] = useState(false);
  
  // State for search results
  const [showResults, setShowResults] = useState(false);
  
  // Ref for the modal
  const modalRef = useRef(null);
  const triggerRef = useRef(null);

  type PassengerType = 'adults' | 'children' | 'infants';
  
  // Function to increase count
  const increaseCount = (type: PassengerType) => {
    const limits = { adults: 6, children: 4, infants: 2 };
    if (passengers[type] < limits[type]) {
      setPassengers({...passengers, [type]: passengers[type] + 1});
    }
  };
  
  // Function to decrease count
  const decreaseCount = (type: PassengerType) => {
    const mins = { adults: 1, children: 0, infants: 0 };
    if (passengers[type] > mins[type]) {
      setPassengers({...passengers, [type]: passengers[type] - 1});
    }
  };
  
  // Add click outside listener to close the modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (showModal && 
          modalRef.current && 
          !modalRef.current.contains(event.target) &&
          triggerRef.current && 
          !triggerRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }
    
    // Add event listener when the modal is shown
    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);
  
  // Generate passenger summary text
  const passengerSummary = `${passengers.adults} Adult${passengers.adults !== 1 ? 's' : ''}${passengers.children ? `, ${passengers.children} Child${passengers.children !== 1 ? 'ren' : ''}` : ''}${passengers.infants ? `, ${passengers.infants} Infant${passengers.infants !== 1 ? 's' : ''}` : ''}`;

  // Sample flight data
  const flightResults = [
    {
      id: 1,
      airline: "SkyJet Airways",
      departTime: "06:30",
      arriveTime: "08:45",
      duration: "2h 15m",
      direct: true,
      price: 199,
      logo: "/api/placeholder/40/40"
    },
    {
      id: 2,
      airline: "Global Airlines",
      departTime: "10:15",
      arriveTime: "12:55",
      duration: "2h 40m",
      direct: true,
      price: 175,
      logo: "/api/placeholder/40/40"
    },
    {
      id: 3,
      airline: "TransOcean",
      departTime: "14:20",
      arriveTime: "17:10",
      duration: "2h 50m",
      direct: false,
      stops: "1 stop",
      price: 145,
      logo: "/api/placeholder/40/40"
    }
  ];

  const handleSearch = () => {
    setShowResults(true);
  };

  const toggleModal = (e) => {
    e.stopPropagation();
    setShowModal(!showModal);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100 backdrop-blur-sm bg-opacity-90 mb-6">
        <div className="space-y-4">
          {/* First row: Departure, Arrival, Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label htmlFor="departure" className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <input
                id="departure"
                type="text"
                placeholder="Departure city"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="arrival" className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <input
                id="arrival"
                type="text"
                placeholder="Arrival city"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="departure-date" className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
              <input
                id="departure-date"
                type="date"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Second row: Flight Category and Passengers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="flight-category" className="block text-sm font-medium text-gray-700 mb-1">Flight Category</label>
              <select
                id="flight-category"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="economy">Economy</option>
                <option value="premium">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
            </div>
            
            {/* Passengers - Dropdown Trigger */}
            <div className="relative">
              <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
              <button
                id="passengers"
                type="button"
                className="w-full flex justify-between items-center px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                onClick={toggleModal}
                ref={triggerRef}
              >
                <span>{passengerSummary}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Passenger Modal */}
              {showModal && (
                <div 
                  ref={modalRef}
                  className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 p-4 z-10"
                >
                  <div className="space-y-3">
                    {/* Adults */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Adults</p>
                        <p className="text-xs text-gray-500">Age 12+</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button 
                          className={`w-8 h-8 rounded-full border ${passengers.adults <= 1 ? 'bg-gray-100 text-gray-400' : 'border-gray-200 hover:bg-gray-50'} flex items-center justify-center`}
                          onClick={() => decreaseCount('adults')}
                          disabled={passengers.adults <= 1}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <span className="w-6 text-center">{passengers.adults}</span>
                        <button 
                          className={`w-8 h-8 rounded-full border ${passengers.adults >= 6 ? 'bg-gray-100 text-gray-400' : 'border-gray-200 hover:bg-gray-50'} flex items-center justify-center`}
                          onClick={() => increaseCount('adults')}
                          disabled={passengers.adults >= 6}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Children */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Children</p>
                        <p className="text-xs text-gray-500">Age 2-11</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button 
                          className={`w-8 h-8 rounded-full border ${passengers.children <= 0 ? 'bg-gray-100 text-gray-400' : 'border-gray-200 hover:bg-gray-50'} flex items-center justify-center`}
                          onClick={() => decreaseCount('children')}
                          disabled={passengers.children <= 0}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <span className="w-6 text-center">{passengers.children}</span>
                        <button 
                          className={`w-8 h-8 rounded-full border ${passengers.children >= 4 ? 'bg-gray-100 text-gray-400' : 'border-gray-200 hover:bg-gray-50'} flex items-center justify-center`}
                          onClick={() => increaseCount('children')}
                          disabled={passengers.children >= 4}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Infants */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Infants</p>
                        <p className="text-xs text-gray-500">Under 2</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button 
                          className={`w-8 h-8 rounded-full border ${passengers.infants <= 0 ? 'bg-gray-100 text-gray-400' : 'border-gray-200 hover:bg-gray-50'} flex items-center justify-center`}
                          onClick={() => decreaseCount('infants')}
                          disabled={passengers.infants <= 0}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <span className="w-6 text-center">{passengers.infants}</span>
                        <button 
                          className={`w-8 h-8 rounded-full border ${passengers.infants >= 2 ? 'bg-gray-100 text-gray-400' : 'border-gray-200 hover:bg-gray-50'} flex items-center justify-center`}
                          onClick={() => increaseCount('infants')}
                          disabled={passengers.infants >= 2}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Apply button */}
                    <button 
                      className="w-full mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
                      onClick={() => setShowModal(false)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search button */}
          <button 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            onClick={handleSearch}
          >
            Search Flights
          </button>
        </div>
      </div>

      {/* Flight Results Section */}
      {showResults && (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Available Flights</h2>
          
          {/* Filter/Sort options */}
          <div className="bg-white rounded-lg p-3 mb-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {flightResults.length} flights found
            </div>
            <div className="flex items-center space-x-4">
              <select className="text-sm border border-gray-200 rounded-md px-2 py-1">
                <option>Sort by: Price</option>
                <option>Sort by: Duration</option>
                <option>Sort by: Departure</option>
              </select>
            </div>
          </div>

          {/* Flight cards */}
          <div className="space-y-4">
            {flightResults.map(flight => (
              <div key={flight.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    {/* Airline info */}
                    <div className="flex items-center space-x-3">
                      <img src={flight.logo} alt={flight.airline} className="w-10 h-10 rounded" />
                      <div>
                        <p className="font-medium">{flight.airline}</p>
                        <p className="text-xs text-gray-500">Flight #{flight.id}123</p>
                      </div>
                    </div>
                    
                    {/* Flight details */}
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-lg font-bold">{flight.departTime}</p>
                        <p className="text-xs text-gray-500">Departure</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="text-xs text-gray-500">{flight.duration}</div>
                        <div className="relative w-20 h-0.5 bg-gray-300 my-1">
                          <div className="absolute top-1/2 right-0 w-1.5 h-1.5 rounded-full bg-gray-400 transform -translate-y-1/2"></div>
                          <div className="absolute top-1/2 left-0 w-1.5 h-1.5 rounded-full bg-gray-400 transform -translate-y-1/2"></div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {flight.direct ? 'Direct' : flight.stops}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-lg font-bold">{flight.arriveTime}</p>
                        <p className="text-xs text-gray-500">Arrival</p>
                      </div>
                    </div>
                    
                    {/* Price & Book */}
                    <div className="flex flex-col items-end">
                      <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
                      <button className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium">
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelSearchForm;