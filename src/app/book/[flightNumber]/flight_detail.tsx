"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  Clock,
  CreditCard,
  Loader2,
  Plane,
  Plus,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

// Types
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

// Form validation schema
const passengerSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  nationality: z.string().min(1, { message: "Nationality is required" }),
  passportNumber: z.string().min(1, { message: "Passport number is required" }),
  passportExpiryDate: z
    .string()
    .min(1, { message: "Passport expiry date is required" }),
  ageCategory: z.enum(["ADULT", "CHILD", "INFANT"]),
  checkedBaggage: z.number().min(0),
  cabinBaggage: z.number().min(0),
  mealPreference: z.string(),
  seatPreference: z.enum(["WINDOW", "MIDDLE", "AISLE", "NO_PREFERENCE"]),
  specialAssistance: z.array(z.string()),
  emergencyContactName: z
    .string()
    .min(1, { message: "Emergency contact name is required" }),
  emergencyContactPhone: z
    .string()
    .min(1, { message: "Emergency contact phone is required" }),
  insurance: z.boolean(),
});

const bookingSchema = z.object({
  passengers: z.array(passengerSchema).min(1),
});

type PassengerForm = z.infer<typeof passengerSchema>;
type BookingForm = z.infer<typeof bookingSchema>;

interface FlightBookingDetailProps {
  flight: Flight;
}

const FlightBookingDetail: React.FC<FlightBookingDetailProps> = ({
  flight,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("passenger-0");
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Initialize form with react-hook-form and zod validation
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      passengers: [
        {
          title: user?.title || "",
          firstName: user?.name?.split(" ")[0] || "",
          lastName: user?.name?.split(" ")[1] || "",
          dateOfBirth: user?.birthdate
            ? format(user.birthdate, "yyyy-MM-dd")
            : "",
          nationality: "United States",
          passportNumber: user?.passport || "",
          passportExpiryDate: user?.passport_exp
            ? format(user.passport_exp, "yyyy-MM-dd")
            : "",
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
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "passengers",
  });

  const formValues = watch();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userRes = await axios.get("/api/auth/user_fetch");
        if (userRes?.data) {
          setUser({
            ...userRes.data,
            passport: userRes.data.passport ?? undefined,
            passport_exp: userRes.data.passport_exp ?? undefined,
          });

          // Populate first passenger with user data if user data exists
          if (userRes.data.name) {
            const nameParts = userRes.data.name.split(" ");
            setValue("passengers.0", {
              ...formValues.passengers[0],
              title: userRes.data.title || "",
              firstName: nameParts[0] || "",
              lastName: nameParts[1] || "",
              dateOfBirth: userRes.data.birthdate
                ? new Date(userRes.data.birthdate).toISOString().split("T")[0]
                : "",
              passportNumber: userRes.data.passport || "",
              passportExpiryDate: userRes.data.passport_exp
                ? new Date(userRes.data.passport_exp)
                    .toISOString()
                    .split("T")[0]
                : "",
            });
          }
        } else return;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setValue]);

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
    // Set active tab to the newly added passenger
    setActiveTab(`passenger-${fields.length}`);
  };

  const onSubmit = async (data: BookingForm) => {
    try {
      setIsSubmitting(true);

      // Validate available seats
      if (flight.availableSeats < data.passengers.length) {
        toast.error(
          `Sorry, only ${flight.availableSeats} seats are available for this flight.`
        );
        setIsSubmitting(false);
        return;
      }

      if (!flight?.flightNumber || !user?.id || !data.passengers?.length) {
        console.error("Missing required fields", {
          flight,
          user,
          passengers: data.passengers,
        });
        alert(
          "Missing required booking information. Please check your details."
        );
        return;
      }

      const response = await axios.post(
        "/api/tickets",
        JSON.stringify({
          flightNumber: flight.flightNumber,
          userId: user?.id,
          passengers: data.passengers,
          totalPrice,
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Response:", response);

      toast.success("Booking successful! Redirecting to profile...");

      setTimeout(() => {
        router.push("/profile");
      }, 1500);
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format flight duration in hours and minutes
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-indigo-900 mb-2">
          Complete Your Booking
        </h1>
        <p className="text-gray-600">
          Please fill in the required information to book your flight.
        </p>
      </motion.div>

      {/* Flight Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="mb-8 overflow-hidden border-indigo-100 shadow-md">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center">
                  <Plane className="h-5 w-5 mr-2" />
                  <h2 className="text-xl font-semibold">
                    Flight {flight.flightNumber}
                  </h2>
                </div>
                <p className="text-indigo-100 mt-1">{flight.airline}</p>
              </div>
              <Badge className="mt-2 md:mt-0 bg-white/20 text-white hover:bg-white/30">
                {flight.category.replace("_", " ")}
              </Badge>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between md:justify-start md:space-x-12">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      {format(flight.departureHour, "h:mm a")}
                    </p>
                    <h3 className="text-2xl font-bold text-indigo-900">
                      {flight.departureCode}
                    </h3>
                    <p className="text-sm text-gray-600">{flight.departure}</p>
                  </div>

                  <div className="flex flex-col items-center px-4">
                    <div className="text-xs text-gray-500 mb-1">
                      {formatDuration(flight.duration)}
                    </div>
                    <div className="relative w-24 md:w-32">
                      <div className="border-t-2 border-gray-300 absolute top-1/2 w-full"></div>
                      <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-indigo-600"></div>
                      <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-indigo-600"></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Direct</div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      {format(flight.arrivalHour, "h:mm a")}
                    </p>
                    <h3 className="text-2xl font-bold text-indigo-900">
                      {flight.arrivalCode}
                    </h3>
                    <p className="text-sm text-gray-600">{flight.arrival}</p>
                  </div>
                </div>

                <div className="flex items-center mt-4 text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{format(flight.departureDate, "MMMM d, yyyy")}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{format(flight.departureHour, "h:mm a")}</span>
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:ml-6 p-4 bg-indigo-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Aircraft</p>
                    <p className="font-medium">{flight.aircraft}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Available Seats</p>
                    <p className="font-medium">{flight.availableSeats}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Base Price</p>
                    <p className="font-medium text-indigo-700">
                      ${flight.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-indigo-100 shadow-md">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="flex justify-between items-center">
                  <CardTitle>Passenger Details</CardTitle>
                  <Button
                    onClick={addPassenger}
                    className="bg-white hover:bg-indigo-50 text-indigo-700 border-indigo-200"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Passenger
                  </Button>
                </div>
                <CardDescription>
                  Please provide accurate information for all passengers
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="w-full justify-start px-6 pt-4 bg-white border-b overflow-x-auto flex-nowrap">
                    {fields.map((field, index) => (
                      <TabsTrigger
                        key={field.id}
                        value={`passenger-${index}`}
                        className="relative data-[state=active]:text-indigo-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-700 rounded-none"
                      >
                        <span className="flex items-center">
                          Passenger {index + 1}
                          {index > 0 && (
                            <button
                              className="ml-2 text-gray-400 hover:text-red-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                remove(index);
                                setActiveTab(
                                  `passenger-${Math.max(0, index - 1)}`
                                );
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          )}
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {fields.map((field, index) => (
                    <TabsContent
                      key={field.id}
                      value={`passenger-${index}`}
                      className="p-6 space-y-6"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`passenger-${index}`}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Personal Information */}
                          <div className="space-y-4">
                            <div className="flex items-center mb-2">
                              <h3 className="text-lg font-medium text-indigo-900">
                                Personal Information
                              </h3>
                              <div className="ml-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                                Required
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`title-${index}`}>
                                  Title <span className="text-red-500">*</span>
                                </Label>
                                <Controller
                                  control={control}
                                  name={`passengers.${index}.title`}
                                  render={({ field }) => (
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <SelectTrigger
                                        id={`title-${index}`}
                                        className={
                                          errors.passengers?.[index]?.title
                                            ? "border-red-500"
                                            : ""
                                        }
                                      >
                                        <SelectValue placeholder="Select title" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="MR">Mr</SelectItem>
                                        <SelectItem value="MS">Ms</SelectItem>
                                        <SelectItem value="MRS">Mrs</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  )}
                                />
                                {errors.passengers?.[index]?.title && (
                                  <p className="text-xs text-red-500 mt-1">
                                    {errors.passengers[index]?.title?.message}
                                  </p>
                                )}
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`firstName-${index}`}>
                                  First Name{" "}
                                  <span className="text-red-500">*</span>
                                </Label>
                                <Controller
                                  control={control}
                                  name={`passengers.${index}.firstName`}
                                  render={({ field }) => (
                                    <Input
                                      id={`firstName-${index}`}
                                      {...field}
                                      className={
                                        errors.passengers?.[index]?.firstName
                                          ? "border-red-500"
                                          : ""
                                      }
                                    />
                                  )}
                                />
                                {errors.passengers?.[index]?.firstName && (
                                  <p className="text-xs text-red-500 mt-1">
                                    {
                                      errors.passengers[index]?.firstName
                                        ?.message
                                    }
                                  </p>
                                )}
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`lastName-${index}`}>
                                  Last Name{" "}
                                  <span className="text-red-500">*</span>
                                </Label>
                                <Controller
                                  control={control}
                                  name={`passengers.${index}.lastName`}
                                  render={({ field }) => (
                                    <Input
                                      id={`lastName-${index}`}
                                      {...field}
                                      className={
                                        errors.passengers?.[index]?.lastName
                                          ? "border-red-500"
                                          : ""
                                      }
                                    />
                                  )}
                                />
                                {errors.passengers?.[index]?.lastName && (
                                  <p className="text-xs text-red-500 mt-1">
                                    {
                                      errors.passengers[index]?.lastName
                                        ?.message
                                    }
                                  </p>
                                )}
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`dateOfBirth-${index}`}>
                                  Date of Birth{" "}
                                  <span className="text-red-500">*</span>
                                </Label>
                                <Controller
                                  control={control}
                                  name={`passengers.${index}.dateOfBirth`}
                                  render={({ field }) => (
                                    <Input
                                      id={`dateOfBirth-${index}`}
                                      type="date"
                                      {...field}
                                      className={
                                        errors.passengers?.[index]?.dateOfBirth
                                          ? "border-red-500"
                                          : ""
                                      }
                                    />
                                  )}
                                />
                                {errors.passengers?.[index]?.dateOfBirth && (
                                  <p className="text-xs text-red-500 mt-1">
                                    {
                                      errors.passengers[index]?.dateOfBirth
                                        ?.message
                                    }
                                  </p>
                                )}
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`nationality-${index}`}>
                                  Nationality{" "}
                                  <span className="text-red-500">*</span>
                                </Label>
                                <Controller
                                  control={control}
                                  name={`passengers.${index}.nationality`}
                                  render={({ field }) => (
                                    <Input
                                      id={`nationality-${index}`}
                                      {...field}
                                      className={
                                        errors.passengers?.[index]?.nationality
                                          ? "border-red-500"
                                          : ""
                                      }
                                    />
                                  )}
                                />
                                {errors.passengers?.[index]?.nationality && (
                                  <p className="text-xs text-red-500 mt-1">
                                    {
                                      errors.passengers[index]?.nationality
                                        ?.message
                                    }
                                  </p>
                                )}
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`ageCategory-${index}`}>
                                  Age Category
                                </Label>
                                <Controller
                                  control={control}
                                  name={`passengers.${index}.ageCategory`}
                                  render={({ field }) => (
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <SelectTrigger
                                        id={`ageCategory-${index}`}
                                      >
                                        <SelectValue placeholder="Select age category" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="ADULT">
                                          Adult
                                        </SelectItem>
                                        <SelectItem value="CHILD">
                                          Child (2-12 years)
                                        </SelectItem>
                                        <SelectItem value="INFANT">
                                          Infant (under 2 years)
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  )}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Travel Document */}
                          <div className="mt-8 space-y-4">
                            <div className="flex items-center mb-2">
                              <h3 className="text-lg font-medium text-indigo-900">
                                Travel Document
                              </h3>
                              <div className="ml-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                                Required
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`passportNumber-${index}`}>
                                  Passport Number{" "}
                                  <span className="text-red-500">*</span>
                                </Label>
                                <Controller
                                  control={control}
                                  name={`passengers.${index}.passportNumber`}
                                  render={({ field }) => (
                                    <Input
                                      id={`passportNumber-${index}`}
                                      {...field}
                                      className={
                                        errors.passengers?.[index]
                                          ?.passportNumber
                                          ? "border-red-500"
                                          : ""
                                      }
                                    />
                                  )}
                                />
                                {errors.passengers?.[index]?.passportNumber && (
                                  <p className="text-xs text-red-500 mt-1">
                                    {
                                      errors.passengers[index]?.passportNumber
                                        ?.message
                                    }
                                  </p>
                                )}
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`passportExpiryDate-${index}`}>
                                  Passport Expiry Date{" "}
                                  <span className="text-red-500">*</span>
                                </Label>
                                <Controller
                                  control={control}
                                  name={`passengers.${index}.passportExpiryDate`}
                                  render={({ field }) => (
                                    <Input
                                      id={`passportExpiryDate-${index}`}
                                      type="date"
                                      {...field}
                                      className={
                                        errors.passengers?.[index]
                                          ?.passportExpiryDate
                                          ? "border-red-500"
                                          : ""
                                      }
                                    />
                                  )}
                                />
                                {errors.passengers?.[index]
                                  ?.passportExpiryDate && (
                                  <p className="text-xs text-red-500 mt-1">
                                    {
                                      errors.passengers[index]
                                        ?.passportExpiryDate?.message
                                    }
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Travel Preferences */}
                          <div className="mt-8 space-y-4">
                            <h3 className="text-lg font-medium text-indigo-900">
                              Travel Preferences
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`checkedBaggage-${index}`}>
                                  Checked Baggage
                                </Label>
                                <Controller
                                  control={control}
                                  name={`passengers.${index}.checkedBaggage`}
                                  render={({ field }) => (
                                    <Select
                                      onValueChange={(value) =>
                                        field.onChange(Number.parseInt(value))
                                      }
                                      defaultValue={field.value.toString()}
                                    >
                                      <SelectTrigger
                                        id={`checkedBaggage-${index}`}
                                      >
                                        <SelectValue placeholder="Select baggage" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="0">None</SelectItem>
                                        <SelectItem value="1">
                                          1 bag (+${PRICES.CHECKED_BAGGAGE})
                                        </SelectItem>
                                        <SelectItem value="2">
                                          2 bags (+${PRICES.CHECKED_BAGGAGE * 2}
                                          )
                                        </SelectItem>
                                        <SelectItem value="3">
                                          3 bags (+${PRICES.CHECKED_BAGGAGE * 3}
                                          )
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  )}
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`cabinBaggage-${index}`}>
                                  Cabin Baggage
                                </Label>
                                <Controller
                                  control={control}
                                  name={`passengers.${index}.cabinBaggage`}
                                  render={({ field }) => (
                                    <Select
                                      onValueChange={(value) =>
                                        field.onChange(Number.parseInt(value))
                                      }
                                      defaultValue={field.value.toString()}
                                    >
                                      <SelectTrigger
                                        id={`cabinBaggage-${index}`}
                                      >
                                        <SelectValue placeholder="Select baggage" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="0">None</SelectItem>
                                        <SelectItem value="1">
                                          1 bag (+${PRICES.CABIN_BAGGAGE})
                                        </SelectItem>
                                        <SelectItem value="2">
                                          2 bags (+${PRICES.CABIN_BAGGAGE * 2})
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  )}
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`seatPreference-${index}`}>
                                  Seat Preference
                                </Label>
                                <Controller
                                  control={control}
                                  name={`passengers.${index}.seatPreference`}
                                  render={({ field }) => (
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <SelectTrigger
                                        id={`seatPreference-${index}`}
                                      >
                                        <SelectValue placeholder="Select seat preference" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="WINDOW">
                                          Window
                                        </SelectItem>
                                        <SelectItem value="MIDDLE">
                                          Middle
                                        </SelectItem>
                                        <SelectItem value="AISLE">
                                          Aisle
                                        </SelectItem>
                                        <SelectItem value="NO_PREFERENCE">
                                          No Preference
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  )}
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`mealPreference-${index}`}>
                                  Meal Preference
                                </Label>
                                <Controller
                                  control={control}
                                  name={`passengers.${index}.mealPreference`}
                                  render={({ field }) => (
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <SelectTrigger
                                        id={`mealPreference-${index}`}
                                      >
                                        <SelectValue placeholder="Select meal preference" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Standard">
                                          Standard
                                        </SelectItem>
                                        <SelectItem value="Vegetarian">
                                          Vegetarian
                                        </SelectItem>
                                        <SelectItem value="Vegan">
                                          Vegan
                                        </SelectItem>
                                        <SelectItem value="Gluten-Free">
                                          Gluten-Free
                                        </SelectItem>
                                        <SelectItem value="Kosher">
                                          Kosher
                                        </SelectItem>
                                        <SelectItem value="Halal">
                                          Halal
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  )}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Special Assistance */}
                          <div className="mt-8 space-y-4">
                            <h3 className="text-lg font-medium text-indigo-900">
                              Special Assistance
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                              <Controller
                                control={control}
                                name={`passengers.${index}.specialAssistance`}
                                render={({ field }) => (
                                  <>
                                    {SPECIAL_ASSISTANCE_OPTIONS.map(
                                      (option) => (
                                        <div
                                          key={option.id}
                                          className="flex items-center space-x-2"
                                        >
                                          <Checkbox
                                            id={`${option.id}-${index}`}
                                            checked={field.value?.includes(
                                              option.id
                                            )}
                                            onCheckedChange={(checked) => {
                                              const values = [
                                                ...(field.value || []),
                                              ];
                                              if (checked) {
                                                values.push(option.id);
                                              } else {
                                                const idx = values.indexOf(
                                                  option.id
                                                );
                                                if (idx !== -1)
                                                  values.splice(idx, 1);
                                              }
                                              field.onChange(values);
                                            }}
                                          />
                                          <Label
                                            htmlFor={`${option.id}-${index}`}
                                            className="text-sm text-gray-700 cursor-pointer"
                                          >
                                            {option.label}
                                          </Label>
                                        </div>
                                      )
                                    )}
                                  </>
                                )}
                              />
                            </div>
                          </div>

                          {/* Emergency Contact & Insurance */}
                          <div className="mt-8 space-y-4">
                            <div className="flex items-center mb-2">
                              <h3 className="text-lg font-medium text-indigo-900">
                                Emergency Contact & Insurance
                              </h3>
                              <div className="ml-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                                Required
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <Label
                                  htmlFor={`emergencyContactName-${index}`}
                                >
                                  Emergency Contact Name{" "}
                                  <span className="text-red-500">*</span>
                                </Label>
                                <Controller
                                  control={control}
                                  name={`passengers.${index}.emergencyContactName`}
                                  render={({ field }) => (
                                    <Input
                                      id={`emergencyContactName-${index}`}
                                      {...field}
                                      className={
                                        errors.passengers?.[index]
                                          ?.emergencyContactName
                                          ? "border-red-500"
                                          : ""
                                      }
                                    />
                                  )}
                                />
                                {errors.passengers?.[index]
                                  ?.emergencyContactName && (
                                  <p className="text-xs text-red-500 mt-1">
                                    {
                                      errors.passengers[index]
                                        ?.emergencyContactName?.message
                                    }
                                  </p>
                                )}
                              </div>

                              <div className="space-y-2">
                                <Label
                                  htmlFor={`emergencyContactPhone-${index}`}
                                >
                                  Emergency Contact Phone{" "}
                                  <span className="text-red-500">*</span>
                                </Label>
                                <Controller
                                  control={control}
                                  name={`passengers.${index}.emergencyContactPhone`}
                                  render={({ field }) => (
                                    <Input
                                      id={`emergencyContactPhone-${index}`}
                                      type="tel"
                                      {...field}
                                      className={
                                        errors.passengers?.[index]
                                          ?.emergencyContactPhone
                                          ? "border-red-500"
                                          : ""
                                      }
                                    />
                                  )}
                                />
                                {errors.passengers?.[index]
                                  ?.emergencyContactPhone && (
                                  <p className="text-xs text-red-500 mt-1">
                                    {
                                      errors.passengers[index]
                                        ?.emergencyContactPhone?.message
                                    }
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="bg-indigo-50 p-4 rounded-lg">
                              <div className="flex items-start space-x-3">
                                <Controller
                                  control={control}
                                  name={`passengers.${index}.insurance`}
                                  render={({ field }) => (
                                    <Checkbox
                                      id={`insurance-${index}`}
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="mt-1"
                                    />
                                  )}
                                />
                                <div>
                                  <Label
                                    htmlFor={`insurance-${index}`}
                                    className="text-sm font-medium text-indigo-900 cursor-pointer"
                                  >
                                    Add travel insurance (+${PRICES.INSURANCE})
                                  </Label>
                                  <p className="text-xs text-gray-600 mt-1">
                                    Covers trip cancellation, medical
                                    emergencies, baggage loss and more
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-4">
              <Card className="border-indigo-100 shadow-md">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <CardTitle>Payment Summary</CardTitle>
                  <CardDescription>Review your booking details</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Base Fare ({formValues.passengers.length} passenger
                        {formValues.passengers.length > 1 ? "s" : ""})
                      </span>
                      <span className="font-medium">
                        ${flight.price.toFixed(2)}
                      </span>
                    </div>

                    {formValues.passengers.some(
                      (p) => p.checkedBaggage > 0
                    ) && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Checked Baggage</span>
                        <span className="font-medium">
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
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Cabin Baggage</span>
                        <span className="font-medium">
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
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Travel Insurance</span>
                        <span className="font-medium">
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

                    <Separator />

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-bold text-indigo-900">
                        Total
                      </span>
                      <span className="text-lg font-bold text-indigo-900">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>

                    {Object.keys(errors).length > 0 && (
                      <Alert className="mt-4 bg-red-50 text-red-800 border-red-200">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Please fill in all required fields before proceeding.
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Proceed to Payment
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center mt-4 text-gray-500">
                      By proceeding, you agree to our Terms and Conditions and
                      Privacy Policy
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </form>
    </div>
  );
};

export default FlightBookingDetail;
