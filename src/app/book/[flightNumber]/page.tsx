"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import axios from "axios";

// Types based on your Prisma schema
type Category = "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST_CLASS";
type Title = "MR" | "MS" | "MRS";
type AgeCategory = "ADULT" | "CHILD" | "INFANT";
type SeatPreference = "WINDOW" | "MIDDLE" | "AISLE" | "NO_PREFERENCE";

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
  category: Category;
  price: number;
  seatCapacity: number;
  availableSeats: number;
}

interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  title: Title;
  phoneNumber: string;
  birthdate: Date;
  passport?: string;
  passport_exp?: Date;
  loyaltyPoints: number;
}

interface PassengerForm {
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiryDate: string;
  ageCategory: AgeCategory;
  checkedBaggage: number;
  cabinBaggage: number;
  mealPreference: string;
  seatPreference: SeatPreference;
  specialAssistance: string[];
  emergencyContactName: string;
  emergencyContactPhone: string;
  insurance: boolean;
}

interface BookingForm {
  passengers: PassengerForm[];
}

// Price constants
const PRICES = {
  INSURANCE: 25,
  CHECKED_BAGGAGE: 30, // per bag
  CABIN_BAGGAGE: 15, // per bag
  CHILD_DISCOUNT: 0.25, // 25% off
  INFANT_PRICE: 50, // flat fee
};

// Special assistance options
const SPECIAL_ASSISTANCE_OPTIONS = [
  { id: "wheelchair", label: "Wheelchair Assistance" },
  { id: "blind", label: "Visual Assistance" },
  { id: "deaf", label: "Hearing Assistance" },
  { id: "elderly", label: "Elderly Assistance" },
  { id: "medical", label: "Medical Assistance" },
  { id: "infant", label: "Traveling with Infant" },
];

const FlightBookingDetail: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const flightNumber = params.flightNumber as string;

  const [flight, setFlight] = useState<Flight | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const { control, handleSubmit, watch, setValue } = useForm<BookingForm>({
    defaultValues: {
      passengers: [
        {
          title: "",
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          nationality: "",
          passportNumber: "",
          passportExpiryDate: "",
          ageCategory: "ADULT",
          checkedBaggage: 0,
          cabinBaggage: 0,
          mealPreference: "Standard",
          seatPreference: "NO_PREFERENCE",
          specialAssistance: [],
          emergencyContactName: "",
          emergencyContactPhone: "",
          insurance: false,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "passengers",
  });

  const formValues = watch();

  useEffect(() => {
    const fetchData = async () => {
      if (!flightNumber) return;

      try {
        // Fetch flight data
        const flightRes = await axios.get(`/api/flights/${flightNumber}`);
        setFlight(flightRes.data);

        // Fetch user data
        const userRes = await axios.get('/api/auth/user_fetch');
        if (userRes && userRes.data) {  // Access userRes.data, not userRes
          setUser({
            ...userRes.data,  // Access userRes.data
            passport: userRes.data.passport ?? undefined,
            passport_exp: userRes.data.passport_exp ?? undefined,
          });
        
          // Populate first passenger with user data
          setValue("passengers.0", {
            ...formValues.passengers[0],
            title: userRes.data.title,  // Access userRes.data
            firstName: userRes.data.name.split(" ")[0],
            lastName: userRes.data.name.split(" ")[1] || "",
            dateOfBirth: userRes.data.birthdate
              ? new Date(userRes.data.birthdate).toISOString().split("T")[0]
              : "",
            passportNumber: userRes.data.passport || "",
            passportExpiryDate: userRes.data.passport_exp
              ? new Date(userRes.data.passport_exp).toISOString().split("T")[0]
              : "",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [flightNumber, setValue, formValues.passengers]);

  // Calculate total price whenever form values or flight changes
  useEffect(() => {
    if (!flight) return;

    let price = 0;

    formValues.passengers.forEach((passenger) => {
      // Base ticket price based on age category
      if (passenger.ageCategory === "ADULT") {
        price += flight.price;
      } else if (passenger.ageCategory === "CHILD") {
        price += flight.price * (1 - PRICES.CHILD_DISCOUNT);
      } else if (passenger.ageCategory === "INFANT") {
        price += PRICES.INFANT_PRICE;
      }

      // Add insurance if selected
      if (passenger.insurance) {
        price += PRICES.INSURANCE;
      }

      // Add baggage fees
      price += passenger.checkedBaggage * PRICES.CHECKED_BAGGAGE;
      price += passenger.cabinBaggage * PRICES.CABIN_BAGGAGE;
    });

    setTotalPrice(price);
  }, [formValues, flight]);

  const onSubmit = async (data: BookingForm) => {
    try {
      setLoading(true);

      console.log("Flight data:", flight);
      console.log("User data:", user);
      console.log("Passengers data:", data.passengers);

      // Create the ticket with all passengers
      if (!flight?.flightNumber || !user?.id || !data.passengers?.length) {
        console.error("Missing required fields", {
          flight,
          user,
          passengers: data.passengers,
        });
        return;
      }

      await axios.post("/api/tickets", {
        flightNumber: flight.flightNumber,
        userId: user.id,
        passengers: data.passengers,
        totalPrice,
      });

      // Redirect to confirmation page
      router.push(`/book/${flightNumber}/payment_confirmation`);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addPassenger = () => {
    append({
      title: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      nationality: "",
      passportNumber: "",
      passportExpiryDate: "",
      ageCategory: "ADULT",
      checkedBaggage: 0,
      cabinBaggage: 0,
      mealPreference: "Standard",
      seatPreference: "NO_PREFERENCE",
      specialAssistance: [],
      emergencyContactName: "",
      emergencyContactPhone: "",
      insurance: false,
    });
    setActiveTab(fields.length);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="text-center py-8 text-red-500">
        <h2 className="text-xl font-bold">Flight not found</h2>
        <p className="mt-2">Please check the flight number and try again.</p>
      </div>
    );
  }

  // Format flight duration in hours and seconds
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h1 className="text-2xl font-bold">Complete Your Booking</h1>
          <p className="text-blue-100">Flight {flight.flightNumber}</p>
        </div>

        {/* Flight summary */}
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="text-3xl font-bold">{flight.departureCode}</div>
                <div className="mx-3 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                </div>
                <div className="text-3xl font-bold">{flight.arrivalCode}</div>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {flight.departure} to {flight.arrival}
              </div>
              <div className="mt-2 text-gray-700">
                {new Date(flight.departureDate).toLocaleDateString()} •{" "}
                {new Date(flight.departureHour).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Airline</div>
                  <div className="font-medium">{flight.airline}</div>
                </div>
                <div>
                  <div className="text-gray-500">Aircraft</div>
                  <div className="font-medium">{flight.aircraft}</div>
                </div>
                <div>
                  <div className="text-gray-500">Duration</div>
                  <div className="font-medium">
                    {formatDuration(flight.duration)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Class</div>
                  <div className="font-medium">
                    {flight.category.replace("_", " ")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Passenger form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Passenger Details</h2>
              <button
                type="button"
                onClick={addPassenger}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                + Add Passenger
              </button>
            </div>

            {/* Passenger tabs */}
            <div className="mb-4 border-b">
              <div className="flex overflow-x-auto">
                {fields.map((field, index) => (
                  <button
                    key={field.id}
                    type="button"
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-2 whitespace-nowrap ${
                      activeTab === index
                        ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Passenger {index + 1}
                    {index > 0 && (
                      <span
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          remove(index);
                          setActiveTab(Math.min(activeTab, fields.length - 2));
                        }}
                      >
                        ×
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Active passenger form */}
            {fields.map((field, index) => (
              <div
                key={field.id}
                className={activeTab === index ? "block" : "hidden"}
              >
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium text-gray-700 mb-3">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <Controller
                          control={control}
                          name={`passengers.${index}.title`}
                          render={({ field }) => (
                            <select
                              {...field}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select</option>
                              <option value="MR">Mr</option>
                              <option value="MS">Ms</option>
                              <option value="MRS">Mrs</option>
                            </select>
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <Controller
                          control={control}
                          name={`passengers.${index}.firstName`}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <Controller
                          control={control}
                          name={`passengers.${index}.lastName`}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Birth
                        </label>
                        <Controller
                          control={control}
                          name={`passengers.${index}.dateOfBirth`}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="date"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nationality
                        </label>
                        <Controller
                          control={control}
                          name={`passengers.${index}.nationality`}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Age Category
                        </label>
                        <Controller
                          control={control}
                          name={`passengers.${index}.ageCategory`}
                          render={({ field }) => (
                            <select
                              {...field}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="ADULT">Adult</option>
                              <option value="CHILD">Child (2-12 years)</option>
                              <option value="INFANT">
                                Infant (under 2 years)
                              </option>
                            </select>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Travel Document */}
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium text-gray-700 mb-3">
                      Travel Document
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Passport Number
                        </label>
                        <Controller
                          control={control}
                          name={`passengers.${index}.passportNumber`}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Passport Expiry Date
                        </label>
                        <Controller
                          control={control}
                          name={`passengers.${index}.passportExpiryDate`}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="date"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Travel Preferences */}
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium text-gray-700 mb-3">
                      Travel Preferences
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Checked Baggage
                        </label>
                        <Controller
                          control={control}
                          name={`passengers.${index}.checkedBaggage`}
                          render={({ field }) => (
                            <select
                              {...field}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            >
                              <option value="0">None</option>
                              <option value="1">
                                1 bag (+${PRICES.CHECKED_BAGGAGE})
                              </option>
                              <option value="2">
                                2 bags (+${PRICES.CHECKED_BAGGAGE * 2})
                              </option>
                              <option value="3">
                                3 bags (+${PRICES.CHECKED_BAGGAGE * 3})
                              </option>
                            </select>
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cabin Baggage
                        </label>
                        <Controller
                          control={control}
                          name={`passengers.${index}.cabinBaggage`}
                          render={({ field }) => (
                            <select
                              {...field}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            >
                              <option value="0">None</option>
                              <option value="1">
                                1 bag (+${PRICES.CABIN_BAGGAGE})
                              </option>
                              <option value="2">
                                2 bags (+${PRICES.CABIN_BAGGAGE * 2})
                              </option>
                            </select>
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Seat Preference
                        </label>
                        <Controller
                          control={control}
                          name={`passengers.${index}.seatPreference`}
                          render={({ field }) => (
                            <select
                              {...field}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="WINDOW">Window</option>
                              <option value="MIDDLE">Middle</option>
                              <option value="AISLE">Aisle</option>
                              <option value="NO_PREFERENCE">
                                No Preference
                              </option>
                            </select>
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Meal Preference
                        </label>
                        <Controller
                          control={control}
                          name={`passengers.${index}.mealPreference`}
                          render={({ field }) => (
                            <select
                              {...field}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="Standard">Standard</option>
                              <option value="Vegetarian">Vegetarian</option>
                              <option value="Vegan">Vegan</option>
                              <option value="Gluten-Free">Gluten-Free</option>
                              <option value="Kosher">Kosher</option>
                              <option value="Halal">Halal</option>
                            </select>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Special Assistance */}
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium text-gray-700 mb-3">
                      Special Assistance
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                      <Controller
                        control={control}
                        name={`passengers.${index}.specialAssistance`}
                        render={({ field }) => (
                          <>
                            {SPECIAL_ASSISTANCE_OPTIONS.map((option) => (
                              <div
                                key={option.id}
                                className="flex items-center"
                              >
                                <input
                                  type="checkbox"
                                  id={`${option.id}-${index}`}
                                  checked={field.value?.includes(option.id)}
                                  onChange={(e) => {
                                    const values = [...(field.value || [])];
                                    if (e.target.checked) {
                                      values.push(option.id);
                                    } else {
                                      const idx = values.indexOf(option.id);
                                      if (idx !== -1) values.splice(idx, 1);
                                    }
                                    field.onChange(values);
                                  }}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label
                                  htmlFor={`${option.id}-${index}`}
                                  className="ml-2 text-sm text-gray-700"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </>
                        )}
                      />
                    </div>
                  </div>

                  {/* Emergency Contact & Insurance */}
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium text-gray-700 mb-3">
                      Emergency Contact & Insurance
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Emergency Contact Name
                        </label>
                        <Controller
                          control={control}
                          name={`passengers.${index}.emergencyContactName`}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Emergency Contact Phone
                        </label>
                        <Controller
                          control={control}
                          name={`passengers.${index}.emergencyContactPhone`}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="tel"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center">
                        <Controller
                          control={control}
                          name={`passengers.${index}.insurance`}
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          )}
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Add travel insurance (+${PRICES.INSURANCE})
                        </span>
                      </label>
                      <p className="text-xs text-gray-500 mt-1 ml-6">
                        Covers trip cancellation, medical emergencies, baggage
                        loss and more
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment summary */}
          <div className="bg-gray-50 p-6 border-t">
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>
                    Base Fare ({formValues.passengers.length} passenger
                    {formValues.passengers.length > 1 ? "s" : ""})
                  </span>
                  <span>${flight.price.toFixed(2)}</span>
                </div>

                {formValues.passengers.some((p) => p.checkedBaggage > 0) && (
                  <div className="flex justify-between">
                    <span>Checked Baggage</span>
                    <span>
                      $
                      {formValues.passengers
                        .reduce(
                          (sum, p) =>
                            sum + p.checkedBaggage * PRICES.CHECKED_BAGGAGE,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                )}

                {formValues.passengers.some((p) => p.cabinBaggage > 0) && (
                  <div className="flex justify-between">
                    <span>Cabin Baggage</span>
                    <span>
                      $
                      {formValues.passengers
                        .reduce(
                          (sum, p) =>
                            sum + p.cabinBaggage * PRICES.CABIN_BAGGAGE,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                )}

                {formValues.passengers.some((p) => p.insurance) && (
                  <div className="flex justify-between">
                    <span>Travel Insurance</span>
                    <span>
                      $
                      {formValues.passengers
                        .reduce(
                          (sum, p) =>
                            sum + (p.insurance ? PRICES.INSURANCE : 0),
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="border-t pt-2 font-bold flex justify-between text-lg mt-4">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-md font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all"
              >
                Proceed to Payment
              </button>

              <p className="text-xs text-center mt-4 text-gray-500">
                By proceeding, you agree to our Terms and Conditions and Privacy
                Policy
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlightBookingDetail;
