"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import FAQDropdown from "@/components/card/dropdown_card";
import axios from 'axios';

export default function Loyalty() {
  const [activeTab, setActiveTab] = useState('about');
  const [userPoints, setUserPoints] = useState(0);
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";
  const [activePage, setActivePage] = useState("");
  

  // Fetch user loyalty points when the component mounts or session changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (status === "authenticated" && session) {
        try {
          const response = await axios.get('/api/profile');
          setUserPoints(response.data.loyaltyPoints);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          toast.error("Could not fetch your loyalty points");
        }
      }
    };

    fetchUserProfile();
  }, [session, status]);

  const travelPackages = [
    {
      title: "Ramadhan Voucher",
      description: "Discount food up to 30%",
      image: "https://i.pinimg.com/736x/d3/90/d5/d390d5bf562cfee4c36f0a48f89e9ae6.jpg",
      link: "#",
      points: 5000
    },
    {
      title: "14K Gold Airplane Necklace, Plane Choker",
      description: "Hike through breathtaking mountain landscapes.",
      image: "https://i.pinimg.com/736x/c5/d7/a6/c5d7a6363e6685e9d8a9048c3d7832e1.jpg",
      link: "#",
      points: 15000
    },
    {
      title: "Space Chic Souvenirs Double Brooch by Erstwilder",
      description: "54mm x 50mm 38mm x 54mm (H x W) If you missed out on a visit to the space duty-free before departure ask the friendly cabin crew about our in-flight shopping service.",
      image: "https://i.pinimg.com/736x/85/83/29/85832997ca39405b4aa4b80a78bb3dbc.jpg",
      link: "#",
      points: 8000
    },
    {
      title: "Suitcase Luggage",
      description: "Because nothing says I love you like matching luggage. You don't need a date for Valentine's Day, but you do need durable luggage.",
      image: "https://i.pinimg.com/736x/df/72/a9/df72a9ece587f47e5c93d6068dbac8bc.jpg",
      link: "#",
      points: 7000
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

  // Handle the claim action
  interface TravelPackage {
    title: string;
    description: string;
    image: string;
    link: string;
    points: number;
  }

  const handleClaim = async (pkg: TravelPackage) => {

    // Check if user has enough points
    if (Number(userPoints) < Number(pkg.points)) {
      toast.error("Insufficient points to claim this reward");
      return;
    }

    try {
      
      await axios.post('/api/claim-reward', {
        rewardId: pkg.title,
        points: pkg.points
      });

      // Update local state to reflect the new point balance
      setUserPoints(prev => prev - pkg.points);
      
      toast.success(`Successfully claimed ${pkg.title}!`);
    } catch (error) {
      console.error("Error claiming reward:", error);
      toast.error("Failed to claim reward. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white pt-20 pb-32 relative overflow-hidden">
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
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">      
            <h1 className="text-5xl md:text-5xl font-bold mb-6 leading-tight">
              Manage Your Travel Rewards
            </h1>
            
            <p className="text-xl opacity-90 mb-8 max-w-2xl">
              Earn points with every flight and redeem them for exclusive benefits and memorable travel experiences.
            </p>     
            
          </div>
        </div>
        
        {/* Curved Bottom Design */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160">
            <path fill="#f9fafb" fillOpacity="1" d="M0,128L80,117.3C160,107,320,85,480,90.7C640,96,800,128,960,133.3C1120,139,1280,117,1360,106.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Current Points Display (if logged in) */}
      {status === "authenticated" && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-4 flex justify-between items-center shadow-md">
            <div>
              <p className="text-sm font-semibold">Your Loyalty Points</p>
              <p className="text-2xl font-bold">{userPoints}</p>
            </div>
            <div>
              <button 
                onClick={() => router.push('/profile')} 
                className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      )}

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
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                          {pkg.points} Points
                        </div>
                        
                        {/* Show if user has enough points */}
                        {status === "authenticated" && (
                          <div className="absolute top-4 left-4">
                            {userPoints >= pkg.points ? (
                              <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                Available
                              </div>
                            ) : (
                              <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                Not Enough Coins
                              </div>
                            )}
                          </div>
                        )}
                        
                        <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover" />
                        <div className="p-4 pb-14">
                            <h3 className="font-medium text-lg mb-1">{pkg.title}</h3>
                            <p className="text-gray-600 text-sm mb-2">{pkg.description}</p>
                            <button 
                              onClick={() => {
                                if (status !== "authenticated") {
                                  // router.replace("/auth");
                                  window.location.href = "/auth";
                                } else {
                                  if(userPoints < pkg.points){
                                    toast.error("Insufficient points to claim this reward");
                                  }
                                  else {handleClaim(pkg)};
                                }
                              }}
                              className={`text-white font-medium flex items-center absolute bottom-4 right-4 px-4 py-2 rounded-lg ${
                                status === "authenticated" && userPoints >= pkg.points
                                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                                  : 'bg-gray-400 cursor-not-allowed'
                              }`}
                              disabled={isLoading || (status === "authenticated" && userPoints < pkg.points)}
                            >
                              Claim
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            </button>
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
          </div>
        )}
      </div>
    </div>
  );
}