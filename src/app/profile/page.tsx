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
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loyaltyInfo, setLoyaltyInfo] = useState<{
    nextTier: MembershipTier | null;
    pointsToNextTier: number | null;
  } | null>(null);

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
      [MembershipTier.SILVER]: 500,
      [MembershipTier.GOLD]: 1000,
      [MembershipTier.PLATINUM]: 2500
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

  // Handle form submission for profile updates
  const handleUpdateProfile = async (formData: FormData) => {
    try {
      setLoading(true);
      
      const updateData = {
        name: formData.get('name'),
        phoneNumber: formData.get('phoneNumber'),
        passport: formData.get('passport'),
        passport_exp: formData.get('passport_exp')
      };
      
      const response = await axios.put('/api/profile', updateData);
      setUser(response.data);
      setError(null);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500">
        </div>
      </div>
    );
  }

  if (error) {
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-white pt-20 pb-20">
      <div className="w-full max-w-4xl p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-purple-200 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-purple-300/50">
        
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
              onClick={() => {
                // You can implement edit functionality here
                // For example, open a modal with a form
              }}
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

          {/* Loyalty Information */}
          {/* {!isMaxTier && (
            <div className="mt-8">
              <h3 className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-4">LOYALTY STATUS</h3>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-purple-100 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">Current Tier</span>
                  <span className="text-sm font-medium text-gray-500">Next Tier</span>
                </div>
                
                <div className="flex justify-between items-center mb-3">
                  <span className={`px-3 py-1 ${getMembershipColor(user.membershipTier)} text-xs font-medium rounded-full`}>
                    {user.membershipTier.charAt(0) + user.membershipTier.slice(1).toLowerCase()}
                  </span>
                  <span className={`px-3 py-1 ${getMembershipColor(nextTier as MembershipTier)} text-xs font-medium rounded-full`}>
                    {(nextTier as string).charAt(0) + (nextTier as string).slice(1).toLowerCase()}
                  </span>
                </div>
                
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-purple-600">
                        {pointsToNextTier} points to next tier
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div style={{ width: `${progressPercentage}%` }} 
                         className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-purple-600"></div>
                  </div>
                </div>
              </div>
            </div> */}
          {/* )} */}
          
          {/* Max tier achievement message */}
          {isMaxTier && (
            <div className="mt-8">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200 shadow-sm">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold text-purple-800">Platinum Status Achieved!</h3>
                    <p className="text-sm text-purple-600">Congratulations! You've reached our highest membership tier.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}