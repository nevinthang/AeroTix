"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Flight {
  flightNumber: string;
  departure: string;
  departureCode: string;
  arrival: string;
  arrivalCode: string;
  departureDate: Date;
  departureHour: Date;
  duration: number;
  arrivalDate: Date;
  arrivalHour: Date;
  airline: string;
  aircraft: string;
  category: string;
  price: number;
  seatCapacity: number;
  availableSeats: number;
  baseCheckedBaggage: number; // Included baggage in kg
  baseCabinBaggage: number; // Included cabin baggage in kg
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
  ageCategory: "adult" | "child" | "infant";
  checkedBaggage: number; // Additional checked baggage in kg
  cabinBaggage: number; // Additional cabin baggage in kg
  mealPreference: string;
  seatPreference: "window" | "middle" | "aisle" | "no-preference";
  specialAssistance: string[];
  emergencyContactName: string;
  emergencyContactPhone: string;
  insurance: boolean;
}

interface ContactDetails {
  email: string;
  phoneNumber: string;
  countryCode: string;
}

export default function FlightRegistrationPage() {
  const params = useParams();
  const flightNumber = params.flightNumber as string;
  const router = useRouter();
  const { data: session } = useSession();

  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [passengerCount, setPassengerCount] = useState(1);
  const [passengers, setPassengers] = useState<Passenger[]>([
    getDefaultPassenger(),
  ]);
  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    email: "",
    phoneNumber: "",
    countryCode: "+1",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [activePassengerTab, setActivePassengerTab] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [availableLoyaltyPoints, setAvailableLoyaltyPoints] = useState(0);
  const [loyaltyPointsUsed, setLoyaltyPointsUsed] = useState(0);

  // Available options
  const titleOptions = [
    { value: "mr", label: "Mr." },
    { value: "mrs", label: "Mrs." },
    { value: "ms", label: "Ms." },
  ];

  const specialAssistanceOptions = [
    { value: "wheelchair", label: "Wheelchair assistance" },
    { value: "visual_impairment", label: "Visual impairment assistance" },
    { value: "hearing_impairment", label: "Hearing impairment assistance" },
    { value: "medical_assistance", label: "Medical assistance" },
    { value: "elderly", label: "Elderly passenger assistance" },
    { value: "pregnant", label: "Assistance for pregnant passengers" },
  ];

  const mealPreferenceOptions = [
    { value: "regular", label: "Regular meal" },
    { value: "vegetarian", label: "Vegetarian meal" },
    { value: "vegan", label: "Vegan meal" },
    { value: "kosher", label: "Kosher meal" },
    { value: "halal", label: "Halal meal" },
    { value: "diabetic", label: "Diabetic meal" },
    { value: "gluten_free", label: "Gluten-free meal" },
    { value: "no_meal", label: "No meal" },
  ];

  const seatPreferenceOptions = [
    { value: "window", label: "Window" },
    { value: "middle", label: "Middle" },
    { value: "aisle", label: "Aisle" },
    { value: "no-preference", label: "No preference" },
  ];

  // Baggage pricing options
  const checkedBaggageOptions = [
    { weight: 0, price: 0, label: "No additional baggage" },
    { weight: 5, price: 20, label: "+5kg - $20" },
    { weight: 10, price: 35, label: "+10kg - $35" },
    { weight: 15, price: 50, label: "+15kg - $50" },
    { weight: 20, price: 65, label: "+20kg - $65" },
    { weight: 25, price: 80, label: "+25kg - $80" },
  ];

  const cabinBaggageOptions = [
    { weight: 0, price: 0, label: "No additional cabin baggage" },
    { weight: 2, price: 10, label: "+2kg - $10" },
    { weight: 5, price: 20, label: "+5kg - $20" },
  ];

  // Insurance packages
  const insurancePrice = 45;
  const insuranceCoverage =
    "Trip cancellation, medical emergencies, travel delays, and baggage loss";

  // Country code options for phone
  const countryCodes = [
    { value: "+1", label: "United States (+1)" },
    { value: "+44", label: "United Kingdom (+44)" },
    { value: "+61", label: "Australia (+61)" },
    { value: "+81", label: "Japan (+81)" },
    { value: "+33", label: "France (+33)" },
    { value: "+49", label: "Germany (+49)" },
    { value: "+91", label: "India (+91)" },
    { value: "+86", label: "China (+86)" },
    { value: "+55", label: "Brazil (+55)" },
    { value: "+52", label: "Mexico (+52)" },
  ];

  function getDefaultPassenger(): Passenger {
    return {
      id: Math.random().toString(36).substring(2, 11),
      title: "mr",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      nationality: "",
      passportNumber: "",
      passportExpiryDate: "",
      ageCategory: "adult",
      checkedBaggage: 0,
      cabinBaggage: 0,
      mealPreference: "regular",
      seatPreference: "no-preference",
      specialAssistance: [],
      emergencyContactName: "",
      emergencyContactPhone: "",
      insurance: false,
    };
  }

  useEffect(() => {
    if (!session) {
      setShowLoginPrompt(true);
      // Don't redirect yet, allow guest booking
    }

    // Fetch flight details
    const fetchFlightDetails = async () => {
      try {
        const response = await fetch(`/api/flights/${flightNumber}`);
        if (!response.ok) {
          throw new Error("Failed to fetch flight details");
        }
        const data = await response.json();

        // Set default flight data for demo
        const flightData = {
          ...data,
          baseCheckedBaggage: 15, // Default 15kg included
          baseCabinBaggage: 7, // Default 7kg included
        };

        setFlight(flightData);
      } catch (error) {
        console.error("Error fetching flight:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlightDetails();
  }, [flightNumber, router, session]);

  useEffect(() => {
    // Calculate total price whenever relevant data changes
    if (flight) {
      calculateTotalPrice();
    }
  }, [flight, passengers]);

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/loyalty-points?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => setAvailableLoyaltyPoints(data.loyaltyPoints || 0))
        .catch((err) => console.error("Failed to fetch loyalty points:", err));
    }
  }, [session]);

  const handlePassengerCountChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const count = parseInt(e.target.value);
    setPassengerCount(count);

    // Create or remove passenger objects based on the new count
    if (count > passengers.length) {
      // Add new passengers
      const newPassengers = [...passengers];
      for (let i = passengers.length + 1; i <= count; i++) {
        newPassengers.push(getDefaultPassenger());
      }
      setPassengers(newPassengers);
    } else if (count < passengers.length) {
      // Remove passengers
      setPassengers(passengers.slice(0, count));
      // Adjust active tab if needed
      if (activePassengerTab >= count) {
        setActivePassengerTab(count - 1);
      }
    }
  };

  const handlePassengerChange = (
    index: number,
    field: keyof Passenger,
    value: any
  ) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };
    setPassengers(updatedPassengers);

    // If date of birth changes, update age category automatically
    if (field === "dateOfBirth" && value) {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      // Adjust age if birthday hasn't occurred yet this year
      const birthMonth = birthDate.getMonth();
      const currentMonth = today.getMonth();
      const birthDay = birthDate.getDate();
      const currentDay = today.getDate();

      const adjustedAge =
        birthMonth > currentMonth ||
        (birthMonth === currentMonth && birthDay > currentDay)
          ? age - 1
          : age;

      let ageCategory: "adult" | "child" | "infant";
      if (adjustedAge < 2) {
        ageCategory = "infant";
      } else if (adjustedAge < 12) {
        ageCategory = "child";
      } else {
        ageCategory = "adult";
      }

      updatedPassengers[index] = {
        ...updatedPassengers[index],
        ageCategory,
      };

      setPassengers(updatedPassengers);
    }
  };

  const handleSpecialAssistanceChange = (
    index: number,
    assistanceValue: string,
    checked: boolean
  ) => {
    const updatedPassengers = [...passengers];
    const passenger = { ...updatedPassengers[index] };

    if (checked) {
      passenger.specialAssistance = [
        ...passenger.specialAssistance,
        assistanceValue,
      ];
    } else {
      passenger.specialAssistance = passenger.specialAssistance.filter(
        (item) => item !== assistanceValue
      );
    }

    updatedPassengers[index] = passenger;
    setPassengers(updatedPassengers);
  };

  const handleContactChange = (field: keyof ContactDetails, value: string) => {
    setContactDetails({
      ...contactDetails,
      [field]: value,
    });
  };

  const calculateTotalPrice = () => {
    if (!flight) return;

    let total = 0;

    passengers.forEach((passenger) => {
      // Base ticket price with age category discount
      let passengerPrice = flight.price;
      if (passenger.ageCategory === "child") {
        passengerPrice = flight.price * 0.9; // 10% discount
      } else if (passenger.ageCategory === "infant") {
        passengerPrice = flight.price * 0.8; // 20% discount
      }

      const checkedBaggageOption = checkedBaggageOptions.find(
        (opt) => opt.weight === passenger.checkedBaggage
      );
      if (checkedBaggageOption) {
        passengerPrice += checkedBaggageOption.price;
      }

      // Find cabin baggage option
      const cabinBaggageOption = cabinBaggageOptions.find(
        (opt) => opt.weight === passenger.cabinBaggage
      );
      if (cabinBaggageOption) {
        passengerPrice += cabinBaggageOption.price;
      }

      // Add insurance if selected
      if (passenger.insurance) {
        passengerPrice += insurancePrice;
      }

      total += passengerPrice;
    });

    const loyaltyDiscount = Math.floor(loyaltyPointsUsed / 100);
    total = Math.max(0, total - loyaltyDiscount);

    setTotalPrice(total);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate contact details
    if (!contactDetails.email) {
      newErrors["email"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(contactDetails.email)) {
      newErrors["email"] = "Email is invalid";
    }

    if (!contactDetails.phoneNumber) {
      newErrors["phone"] = "Phone number is required";
    }

    // Validate each passenger
    passengers.forEach((passenger, index) => {
      if (!passenger.firstName) {
        newErrors[`passenger${index}-firstName`] = "First name is required";
      }

      if (!passenger.lastName) {
        newErrors[`passenger${index}-lastName`] = "Last name is required";
      }

      if (!passenger.dateOfBirth) {
        newErrors[`passenger${index}-dob`] = "Date of birth is required";
      }

      if (!passenger.nationality) {
        newErrors[`passenger${index}-nationality`] = "Nationality is required";
      }

      if (!passenger.passportNumber) {
        newErrors[`passenger${index}-passport`] =
          "Passport/ID number is required";
      }

      if (!passenger.passportExpiryDate) {
        newErrors[`passenger${index}-passportExpiry`] =
          "Passport expiry date is required";
      } else {
        const expiryDate = new Date(passenger.passportExpiryDate);
        const today = new Date();
        // Check if passport expires within 6 months
        const sixMonthsFromNow = new Date();
        sixMonthsFromNow.setMonth(today.getMonth() + 6);

        if (expiryDate < sixMonthsFromNow) {
          newErrors[`passenger${index}-passportExpiry`] =
            "Passport must be valid for at least 6 months";
        }
      }
    });

    // Check terms acceptance
    if (!acceptTerms) {
      newErrors["terms"] = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      window.scrollTo(0, 0); // Scroll to top to show errors
      return;
    }

    try {
      // Submit reservation data to API
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flightNumber: flight?.flightNumber,
          contactDetails,
          passengers,
          totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const booking = await response.json();

      // Redirect to payment page
      router.push(`/payment/${booking.id}`);
    } catch (error) {
      console.error("Error creating booking:", error);
      setErrors({
        server: "There was an error processing your booking. Please try again.",
      });
      window.scrollTo(0, 0);
    }
  };

  const getLoyaltyPoints = async () => {
    const res = await fetch("/api/loyalty-points");
    const data = await res.json();
    if (res.ok) {
      console.log("Loyalty Points:", data.loyaltyPoints);
    } else {
      console.error("Error:", data.error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">
            Loading flight details...
          </h2>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Flight Not Found
          </h2>
          <p className="text-gray-700">
            We couldn't find flight {flightNumber}. Please check the flight
            number and try again.
          </p>
          <button
            onClick={() => router.push("/book")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Back to Flight Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Server errors alert */}
      {errors["server"] && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
          {errors["server"]}
        </div>
      )}

      {/* Login prompt for guest users */}
      {showLoginPrompt && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex justify-between items-center">
          <div>
            <p className="text-blue-800 font-medium">Have an account?</p>
            <p className="text-sm text-blue-600">
              Login to speed up booking and earn loyalty points
            </p>
          </div>
          <button
            onClick={() =>
              router.push(`/auth?returnUrl=/flights/${flightNumber}/register`)
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Log In
          </button>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-2">Passenger Information</h1>
      <p className="text-gray-600 mb-6">
        Please enter details for all passengers
      </p>

      {/* Flight Summary */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="text-3xl font-bold text-blue-600 mr-2">
                {flight.departureCode}
              </div>
              <div className="text-gray-400 mx-2">→</div>
              <div className="text-3xl font-bold text-blue-600">
                {flight.arrivalCode}
              </div>
            </div>
            <div className="text-gray-500 text-sm mt-1">
              {flight.airline} • Flight {flight.flightNumber}
            </div>
          </div>

          <div className="flex flex-wrap justify-between w-full md:w-auto">
            <div className="px-4 border-r border-gray-200 last:border-r-0">
              <div className="text-sm text-gray-500">Date</div>
              <div className="font-medium">
                {new Date(flight.departureDate).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>

            <div className="px-4 border-r border-gray-200 last:border-r-0">
              <div className="text-sm text-gray-500">Departure</div>
              <div className="font-medium">
                {new Date(flight.departureHour).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            <div className="px-4 border-r border-gray-200 last:border-r-0">
              <div className="text-sm text-gray-500">Arrival</div>
              <div className="font-medium">
                {new Date(flight.arrivalHour).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            <div className="px-4 last:border-r-0">
              <div className="text-sm text-gray-500">Duration</div>
              <div className="font-medium">
                {Math.floor(flight.duration / 3600)}h{" "}
                {Math.floor((flight.duration % 3600) / 60)}m
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap text-sm">
            <div className="mr-6 mb-2">
              <span className="text-gray-500">Cabin:</span> {flight.category}
            </div>
            <div className="mr-6 mb-2">
              <span className="text-gray-500">Aircraft:</span> {flight.aircraft}
            </div>
            <div className="mr-6 mb-2">
              <span className="text-gray-500">Checked Baggage:</span>{" "}
              {flight.baseCheckedBaggage}kg included
            </div>
            <div className="mb-2">
              <span className="text-gray-500">Cabin Baggage:</span>{" "}
              {flight.baseCabinBaggage}kg included
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Passenger Count Selection */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="mb-4">
            <label
              htmlFor="passengerCount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Number of Passengers
            </label>
            <select
              id="passengerCount"
              value={passengerCount}
              onChange={handlePassengerCountChange}
              className="w-full md:w-64 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <option key={num} value={num}>
                  {num} passenger{num > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <p className="text-sm text-gray-600 mb-4">
            We'll use this information to send your e-tickets and flight updates
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address*
              </label>
              <input
                type="email"
                value={contactDetails.email}
                onChange={(e) => handleContactChange("email", e.target.value)}
                required
                className={`w-full p-2 border ${
                  errors["email"] ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors["email"] && (
                <p className="mt-1 text-sm text-red-600">{errors["email"]}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country Code*
                </label>
                <select
                  value={contactDetails.countryCode}
                  onChange={(e) =>
                    handleContactChange("countryCode", e.target.value)
                  }
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {countryCodes.map((code) => (
                    <option key={code.value} value={code.value}>
                      {code.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  value={contactDetails.phoneNumber}
                  onChange={(e) =>
                    handleContactChange("phoneNumber", e.target.value)
                  }
                  required
                  className={`w-full p-2 border ${
                    errors["phone"] ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors["phone"] && (
                  <p className="mt-1 text-sm text-red-600">{errors["phone"]}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Passenger Details Tabs */}
        <div className="bg-white shadow-md rounded-lg mb-6 overflow-hidden">
          <div className="flex overflow-x-auto border-b border-gray-200">
            {passengers.map((passenger, index) => (
              <button
                key={passenger.id}
                type="button"
                onClick={() => setActivePassengerTab(index)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                  activePassengerTab === index
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Passenger {index + 1}{" "}
                {passenger.firstName ? `(${passenger.firstName})` : ""}
              </button>
            ))}
          </div>

          {/* Active Passenger Form */}
          {passengers.map((passenger, index) => (
            <div
              key={passenger.id}
              className={`p-6 ${
                activePassengerTab === index ? "block" : "hidden"
              }`}
            >
              <h3 className="text-lg font-semibold mb-4">
                Passenger {index + 1} Information
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800">
                  {passenger.ageCategory === "adult"
                    ? "Adult (12+ years)"
                    : passenger.ageCategory === "child"
                    ? "Child (2-11 years)"
                    : "Infant (0-2 years)"}
                </span>
              </h3>

              {/* Personal Information */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title*
                    </label>
                    <select
                      value={passenger.title}
                      onChange={(e) =>
                        handlePassengerChange(index, "title", e.target.value)
                      }
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      {titleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      value={passenger.firstName}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "firstName",
                          e.target.value
                        )
                      }
                      required
                      className={`w-full p-2 border ${
                        errors[`passenger${index}-firstName`]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors[`passenger${index}-firstName`] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors[`passenger${index}-firstName`]}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      value={passenger.lastName}
                      onChange={(e) =>
                        handlePassengerChange(index, "lastName", e.target.value)
                      }
                      required
                      className={`w-full p-2 border ${
                        errors[`passenger${index}-lastName`]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors[`passenger${index}-lastName`] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors[`passenger${index}-lastName`]}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth*
                    </label>
                    <input
                      type="date"
                      value={passenger.dateOfBirth}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "dateOfBirth",
                          e.target.value
                        )
                      }
                      required
                      className={`w-full p-2 border ${
                        errors[`passenger${index}-dob`]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors[`passenger${index}-dob`] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors[`passenger${index}-dob`]}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nationality*
                    </label>
                    <input
                      type="text"
                      value={passenger.nationality}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "nationality",
                          e.target.value
                        )
                      }
                      required
                      className={`w-full p-2 border ${
                        errors[`passenger${index}-nationality`]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors[`passenger${index}-nationality`] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors[`passenger${index}-nationality`]}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Travel Document Information */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Travel Document Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passport/ID Number*
                    </label>
                    <input
                      type="text"
                      value={passenger.passportNumber}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "passportNumber",
                          e.target.value
                        )
                      }
                      required
                      className={`w-full p-2 border ${
                        errors[`passenger${index}-passport`]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors[`passenger${index}-passport`] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors[`passenger${index}-passport`]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passport Expiry Date*
                    </label>
                    <input
                      type="date"
                      value={passenger.passportExpiryDate}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "passportExpiryDate",
                          e.target.value
                        )
                      }
                      required
                      className={`w-full p-2 border ${
                        errors[`passenger${index}-passportExpiry`]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors[`passenger${index}-passportExpiry`] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors[`passenger${index}-passportExpiry`]}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Travel Preferences */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Travel Preferences
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meal Preference
                    </label>
                    <select
                      value={passenger.mealPreference}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "mealPreference",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      {mealPreferenceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Seat Preference
                    </label>
                    <select
                      value={passenger.seatPreference}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "seatPreference",
                          e.target.value as
                            | "window"
                            | "middle"
                            | "aisle"
                            | "no-preference"
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      {seatPreferenceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Baggage Options */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Baggage Options
                </h4>
                <p className="text-sm text-gray-500 mb-3">
                  Your ticket includes {flight.baseCheckedBaggage}kg checked
                  baggage and {flight.baseCabinBaggage}kg cabin baggage. You can
                  purchase additional baggage allowance below.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Checked Baggage
                    </label>
                    <div className="space-y-2">
                      {checkedBaggageOptions.map((option) => (
                        <div key={option.weight} className="flex items-center">
                          <input
                            type="radio"
                            id={`checked-${index}-${option.weight}`}
                            name={`checked-baggage-${index}`}
                            checked={passenger.checkedBaggage === option.weight}
                            onChange={() =>
                              handlePassengerChange(
                                index,
                                "checkedBaggage",
                                option.weight
                              )
                            }
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <label
                            htmlFor={`checked-${index}-${option.weight}`}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Cabin Baggage
                    </label>
                    <div className="space-y-2">
                      {cabinBaggageOptions.map((option) => (
                        <div key={option.weight} className="flex items-center">
                          <input
                            type="radio"
                            id={`cabin-${index}-${option.weight}`}
                            name={`cabin-baggage-${index}`}
                            checked={passenger.cabinBaggage === option.weight}
                            onChange={() =>
                              handlePassengerChange(
                                index,
                                "cabinBaggage",
                                option.weight
                              )
                            }
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <label
                            htmlFor={`cabin-${index}-${option.weight}`}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Assistance */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Special Assistance (if needed)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                  {specialAssistanceOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`assistance-${index}-${option.value}`}
                        checked={passenger.specialAssistance.includes(
                          option.value
                        )}
                        onChange={(e) =>
                          handleSpecialAssistanceChange(
                            index,
                            option.value,
                            e.target.checked
                          )
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`assistance-${index}-${option.value}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Emergency Contact
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      value={passenger.emergencyContactName}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "emergencyContactName",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={passenger.emergencyContactPhone}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "emergencyContactPhone",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Travel Insurance */}
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id={`insurance-${index}`}
                      checked={passenger.insurance}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "insurance",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <label htmlFor={`insurance-${index}`} className="ml-3">
                    <div className="text-sm font-medium text-gray-700">
                      Add Travel Insurance - ${insurancePrice}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {insuranceCoverage}
                    </p>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loyalty Points */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Use Loyalty Points</h2>
          <div className="flex flex-wrap items-start gap-4">
            <div className="w-full md:w-64">
              <input
                type="number"
                value={loyaltyPointsUsed}
                onChange={(e) =>
                  setLoyaltyPointsUsed(
                    Math.max(0, parseInt(e.target.value) || 0)
                  )
                }
                placeholder="Enter points to redeem"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max={availableLoyaltyPoints} // Batasi sesuai yang tersedia
              />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Available Loyalty Points:{" "}
            <span className="font-semibold">{availableLoyaltyPoints}</span>
          </p>
        </div>

        {/* Price Summary */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Price Summary</h2>
          <div className="space-y-2 mb-4">
            {passengers.map((passenger, index) => {
              // Calculate this passenger's price
              let passengerPrice = flight.price;
              if (passenger.ageCategory === "child") {
                passengerPrice = flight.price * 0.9; // 10% discount
              } else if (passenger.ageCategory === "infant") {
                passengerPrice = flight.price * 0.8; // 20% discount
              }

              // Find baggage options
              const checkedBaggageOption = checkedBaggageOptions.find(
                (opt) => opt.weight === passenger.checkedBaggage
              );
              const cabinBaggageOption = cabinBaggageOptions.find(
                (opt) => opt.weight === passenger.cabinBaggage
              );

              return (
                <div key={passenger.id} className="flex justify-between">
                  <div>
                    Passenger {index + 1} ({passenger.ageCategory})
                    {checkedBaggageOption &&
                      checkedBaggageOption.weight > 0 &&
                      ` + ${checkedBaggageOption.weight}kg checked baggage`}
                    {cabinBaggageOption &&
                      cabinBaggageOption.weight > 0 &&
                      ` + ${cabinBaggageOption.weight}kg cabin baggage`}
                    {passenger.insurance && " + insurance"}
                  </div>
                  <div>
                    $
                    {Math.round(
                      passengerPrice +
                        (checkedBaggageOption
                          ? checkedBaggageOption.price
                          : 0) +
                        (cabinBaggageOption ? cabinBaggageOption.price : 0) +
                        (passenger.insurance ? insurancePrice : 0)
                    ).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-4">
            <div>Total</div>
            <div>${Math.round(totalPrice).toFixed(2)}</div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className={`h-4 w-4 text-blue-600 border-${
                  errors["terms"] ? "red-500" : "gray-300"
                } rounded focus:ring-blue-500`}
              />
            </div>
            <label htmlFor="terms" className="ml-3 text-sm">
              <span className="text-gray-700">I accept the </span>
              <a href="/terms" className="text-blue-600 hover:underline">
                terms and conditions
              </a>
              <span className="text-gray-700"> and </span>
              <a href="/privacy" className="text-blue-600 hover:underline">
                privacy policy
              </a>
            </label>
          </div>
          {errors["terms"] && (
            <p className="mt-1 text-sm text-red-600 ml-7">{errors["terms"]}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mb-10">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!acceptTerms}
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
}
