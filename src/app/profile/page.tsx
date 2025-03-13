"use client";
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Make sure this interface matches the API response
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  birthdate: Date;
  passport: string | null;
  passport_exp: Date | null;
  loyaltyPoints: number;
  membershipTier: MembershipTier;
  // Additional fields not returned from the API but needed for UI
  title?: Title;
  username?: string;
}

interface Passenger {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiryDate: string;
  ageCategory: "ADULT" | "CHILD" | "INFANT";
  checkedBaggage: number;
  cabinBaggage: number;
  mealPreference: string;
  seatPreference: "WINDOW" | "MIDDLE" | "AISLE" | "NO_PREFERENCE";
  specialAssistance: string[];
  emergencyContactName: string;
  emergencyContactPhone: string;
  insurance: boolean;
  ticketId: string;
}


interface Ticket {
  ticketNumber: string;
  flightNumber: string;
  userId: string;
  totalAmount: number;
  passengers: Passenger[];
}

// Enum definitions
enum Title {
  MR = "MR",
  MS = "MS",
  MRS = "MRS"
}

enum MembershipTier {
  BRONZE = "BRONZE",
  SILVER = "SILVER",
  GOLD = "GOLD",
  PLATINUM = "PLATINUM"
}

export default function UserProfileClient() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketLoading, setTicketLoading] = useState(true);
  const [ticketError, setTicketError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showPassengerDetails, setShowPassengerDetails] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState<Passenger | null>(null);

  // Fetch tickets data
  useEffect(() => {
    const fetchTickets = async () => {
      setTicketLoading(true);
      try {
        // Replace with your actual API call
        const response = await fetch('/api/tickets');
        const data = await response.json();
        setTickets(data);
        setTicketError(null);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setTicketError('Failed to load tickets');
      } finally {
        setTicketLoading(false);
      }
    };

    fetchTickets();
  }, []);

    // Add this function to handle ticket selection
  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowPassengerDetails(true);
  };

  // Add this function to handle passenger selection
  const handlePassengerSelect = (passenger: Passenger) => {
    setSelectedPassenger(passenger);
  };
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loyaltyInfo, setLoyaltyInfo] = useState<{
    nextTier: MembershipTier | null;
    pointsToNextTier: number | null;
  } | null>(null);
  
  // Adding state for edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    passport: '',
    passport_exp: ''
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/profile');
        
        // Set default title if not provided by API
        const userData = {
          ...response.data,
          title: response.data.title || Title.MR
        };
        
        setUser(userData);
        
        // Update form data with current values
        setFormData({
          name: userData.name || '',
          phoneNumber: userData.phoneNumber || '',
          passport: userData.passport || '',
          passport_exp: userData.passport_exp ? format(new Date(userData.passport_exp), 'yyyy-MM-dd') : ''
        });
        
        // Fetch loyalty information
        try {
          const loyaltyResponse = await axios.get('/api/loyalty-points');
          setLoyaltyInfo({
            nextTier: loyaltyResponse.data.nextTier,
            pointsToNextTier: loyaltyResponse.data.pointsToNextTier
          });
        } catch (loyaltyError) {
          console.error("Error fetching loyalty data:", loyaltyError);
          // Continue even if loyalty info fails
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setError("You must be logged in to view this profile");
        } else {
          setError("Failed to load profile data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Function to format dates
  const formatDate = (dateObj: Date | string | null | undefined) => {
    if (!dateObj) return 'Not provided';
    try {
      return format(new Date(dateObj), 'MMMM d, yyyy');
    } catch (err) {
      console.error('Date formatting error:', err);
      return 'Invalid date';
    }
  };

  // Function to determine membership tier color
  const getMembershipColor = (tier: MembershipTier) => {
    switch (tier) {
      case MembershipTier.BRONZE:
        return 'bg-amber-100 text-amber-800';
      case MembershipTier.SILVER:
        return 'bg-gray-100 text-gray-800';
      case MembershipTier.GOLD:
        return 'bg-yellow-100 text-yellow-800';
      case MembershipTier.PLATINUM:
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  // Calculate tier progress based on loyalty info or fallback to local calculation
  const getTierProgress = (tier: MembershipTier, points: number) => {
    if (loyaltyInfo && loyaltyInfo.nextTier) {
      return {
        nextTier: loyaltyInfo.nextTier,
        pointsToNextTier: loyaltyInfo.pointsToNextTier || 0
      };
    }
    
    // Fallback calculation if API loyalty endpoint fails
    const pointsNeeded = {
      [MembershipTier.BRONZE]: 0,
      [MembershipTier.SILVER]: 5000,
      [MembershipTier.GOLD]: 10000,
      [MembershipTier.PLATINUM]: 25000
    };
    
    let nextTier;
    let pointsToNextTier = 0;
    
    if (tier === MembershipTier.BRONZE) {
      nextTier = MembershipTier.SILVER;
      pointsToNextTier = Math.max(0, pointsNeeded[MembershipTier.SILVER] - points);
    } else if (tier === MembershipTier.SILVER) {
      nextTier = MembershipTier.GOLD;
      pointsToNextTier = Math.max(0, pointsNeeded[MembershipTier.GOLD] - points);
    } else if (tier === MembershipTier.GOLD) {
      nextTier = MembershipTier.PLATINUM;
      pointsToNextTier = Math.max(0, pointsNeeded[MembershipTier.PLATINUM] - points);
    } else {
      // Already at the highest tier
      nextTier = MembershipTier.PLATINUM;
      pointsToNextTier = 0;
    }
    
    return { nextTier, pointsToNextTier };
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission for profile updates
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const updateData = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        passport: formData.passport || null,
        passport_exp: formData.passport_exp ? new Date(formData.passport_exp).toISOString() : null
      };
      
      const response = await axios.put('/api/profile', updateData);
      
      // Update local state with new data
      setUser({
        ...user!,
        ...response.data
      });
      
      setError(null);
      setUpdateSuccess(true);
      
      // Close modal after successful update
      setTimeout(() => {
        setIsEditModalOpen(false);
        setUpdateSuccess(false);
      }, 1500);
      
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile");
      setUpdateSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  // Open edit modal and populate form with current data
  const openEditModal = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        phoneNumber: user.phoneNumber || '',
        passport: user.passport || '',
        passport_exp: user.passport_exp ? format(new Date(user.passport_exp), 'yyyy-MM-dd') : ''
      });
    }
    setIsEditModalOpen(true);
  };

  if (loading && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500">
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg">
          No user profile data available
        </div>
      </div>
    );
  }

  // Calculate tier progress
  const { nextTier, pointsToNextTier } = getTierProgress(user.membershipTier, user.loyaltyPoints);
  const isMaxTier = user.membershipTier === MembershipTier.PLATINUM;
  
  // Calculate the appropriate max points based on current tier for progress bar
  const getMaxPointsForTier = () => {
    switch (user.membershipTier) {
      case MembershipTier.BRONZE: return 500;
      case MembershipTier.SILVER: return 1000;
      case MembershipTier.GOLD: return 2500;
      default: return 1;
    }
  };
  
  // Calculate progress percentage for the progress bar
  const progressPercentage = isMaxTier ? 100 : Math.min(100, Math.max(0, 100 - (pointsToNextTier / getMaxPointsForTier()) * 100));


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-800 via-blue-700 to-indigo-900 pt-20 pb-20">
      <div className="w-full max-w-4xl p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-purple-200 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-purple-300/50 mt-5">
        
        <div className="relative">
          
          {/* Profile header with actions */}
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                <div className="flex items-center mt-1">
                  <div className={`px-3 py-1 ${getMembershipColor(user.membershipTier)} text-xs font-medium rounded-full`}>
                    {user.title} • {user.membershipTier.charAt(0) + user.membershipTier.slice(1).toLowerCase()} Member
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="text-xs uppercase font-semibold text-blue-600 mr-2">Loyalty Points:</span>
                  <span className="text-lg font-bold text-blue-800">{user.loyaltyPoints}</span>
                </div>
              </div>
            </div>
            
            <button 
              className="mt-4 md:mt-0 flex items-center text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-lg transition-colors"
              onClick={openEditModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Profile
            </button>
          </div>
          
          {/* Contact information */}
          <div className="mb-8">
            <h3 className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-4">CONTACT INFORMATION</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Phone</p>
                <p className="text-base font-medium text-gray-800">{user.phoneNumber}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">E-mail</p>
                <p className="text-base font-medium text-blue-600">{user.email}</p>
              </div>
            </div>
          </div>
          
          {/* Personal information */}
          <div>
            <h3 className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-4">PERSONAL INFORMATION</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Birthday</p>
                <p className="text-base font-medium text-gray-800">{formatDate(user.birthdate)}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">No. Passport</p>
                <p className="text-base font-medium text-gray-800">{user.passport || 'Not provided'}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Passport Expiry</p>
                <p className="text-base font-medium text-gray-800">{formatDate(user.passport_exp)}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Username</p>
                <p className="text-base font-medium text-gray-800">{user.username || user.email.split('@')[0]}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Ticket History Section */}
        <div className="mt-8">
          <h3 className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-4">TICKET HISTORY</h3>
          
          {ticketLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            </div>
          ) : ticketError ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">
              Error: {ticketError}
            </div>
          ) : tickets.length === 0 ? (
            <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg">
              You haven't booked any tickets yet.
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-purple-100 shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Flight Number
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Passengers
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tickets.map((ticket) => (
                    <tr 
                      key={ticket.ticketNumber} 
                      onClick={() => handleTicketSelect(ticket)}
                      className="cursor-pointer hover:bg-purple-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {ticket.ticketNumber.substring(0, 8)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket.flightNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket.passengers.length} {ticket.passengers.length === 1 ? 'passenger' : 'passengers'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${ticket.totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsEditModalOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {updateSuccess && (
              <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
                Profile updated successfully!
              </div>
            )}

            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleUpdateProfile}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Passport Number</label>
                <input
                  type="text"
                  name="passport"
                  value={formData.passport}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Passport Expiry Date</label>
                <input
                  type="date"
                  name="passport_exp"
                  value={formData.passport_exp}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Passenger Details Modal */}
      {/* Passenger Details Modal */}
      {showPassengerDetails && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Ticket Details - {selectedTicket.flightNumber}
              </h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setShowPassengerDetails(false);
                  setSelectedTicket(null);
                  setSelectedPassenger(null);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <div className="flex space-x-4 mb-6">
                <div className="bg-blue-50 p-3 rounded-lg flex-1">
                  <p className="text-sm text-gray-500">Ticket ID</p>
                  <p className="text-base font-medium text-gray-800">{selectedTicket.ticketNumber}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg flex-1">
                  <p className="text-sm text-gray-500">Flight Number</p>
                  <p className="text-base font-medium text-gray-800">{selectedTicket.flightNumber}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg flex-1">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-base font-medium text-gray-800">${selectedTicket.totalAmount.toFixed(2)}</p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">Passengers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {selectedTicket.passengers.map((passenger) => (
                  <div 
                    key={passenger.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedPassenger?.id === passenger.id 
                        ? 'border-purple-500 bg-purple-50 shadow' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => handlePassengerSelect(passenger)}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {passenger.title} {passenger.firstName} {passenger.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{passenger.ageCategory}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedPassenger && (
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-4">Passenger Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-base font-medium text-gray-800">
                        {selectedPassenger.title} {selectedPassenger.firstName} {selectedPassenger.lastName}
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="text-base font-medium text-gray-800">
                        {format(new Date(selectedPassenger.dateOfBirth), 'MMMM d, yyyy')}
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Nationality</p>
                      <p className="text-base font-medium text-gray-800">{selectedPassenger.nationality}</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Passport Number</p>
                      <p className="text-base font-medium text-gray-800">{selectedPassenger.passportNumber}</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Passport Expiry</p>
                      <p className="text-base font-medium text-gray-800">
                        {format(new Date(selectedPassenger.passportExpiryDate), 'MMMM d, yyyy')}
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Age Category</p>
                      <p className="text-base font-medium text-gray-800">{selectedPassenger.ageCategory}</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Checked Baggage</p>
                      <p className="text-base font-medium text-gray-800">{selectedPassenger.checkedBaggage} kg</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Cabin Baggage</p>
                      <p className="text-base font-medium text-gray-800">{selectedPassenger.cabinBaggage} kg</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Meal Preference</p>
                      <p className="text-base font-medium text-gray-800">{selectedPassenger.mealPreference}</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Seat Preference</p>
                      <p className="text-base font-medium text-gray-800">{selectedPassenger.seatPreference.replace('_', ' ')}</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Emergency Contact</p>
                      <p className="text-base font-medium text-gray-800">
                        {selectedPassenger.emergencyContactName} ({selectedPassenger.emergencyContactPhone})
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Insurance</p>
                      <p className="text-base font-medium text-gray-800">{selectedPassenger.insurance ? 'Yes' : 'No'}</p>
                    </div>
                    
                    {selectedPassenger.specialAssistance && selectedPassenger.specialAssistance.length > 0 && (
                      <div className="bg-white p-3 rounded-lg border border-gray-200 md:col-span-2">
                        <p className="text-sm text-gray-500">Special Assistance</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedPassenger.specialAssistance.map((assistance, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                              {assistance}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="border-t pt-4 mt-6">
                <h3 className="text-lg font-semibold mb-4">Flight Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div className="mb-4 md:mb-0">
                      <p className="text-sm text-gray-500">Departure</p>
                      <div className="flex items-end">
                        <p className="text-2xl font-bold text-gray-800">{selectedTicket. flightNumber}</p>    
                      </div>
                    </div>
                    
                    {/* <div className="flex flex-col items-center justify-center mb-4 md:mb-0">
                      <p className="text-sm text-gray-500 mb-1">{selectedTicket.duration}</p>
                      <div className="flex items-center">
                        <div className="h-1 w-2 bg-gray-300 rounded-full"></div>
                        <div className="h-1 w-16 md:w-24 bg-gray-300"></div>
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <div className="h-1 w-16 md:w-24 bg-gray-300"></div>
                        <div className="h-1 w-2 bg-gray-300 rounded-full"></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{selectedTicket.flightType}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Arrival</p>
                      <div className="flex items-end justify-end">
                        <p className="text-2xl font-bold text-gray-800">{selectedTicket.arrivalCode}</p>
                        <p className="ml-2 text-sm text-gray-500">{selectedTicket.arrivalCity}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {format(new Date(selectedTicket.arrivalDateTime), 'MMMM d, yyyy h:mm a')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Airline</p>
                      <p className="text-base font-medium text-gray-800">{selectedTicket.airline}</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Class</p>
                      <p className="text-base font-medium text-gray-800">{selectedTicket.travelClass}</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedTicket.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : selectedTicket.status === 'Pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedTicket.status}
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  setShowPassengerDetails(false);
                  setSelectedTicket(null);
                  setSelectedPassenger(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}