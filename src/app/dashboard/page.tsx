// pages/dashboard.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plane,
  Edit,
  Trash2,
  Plus,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Map,
  ArrowLeftRight,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";
import { log } from "console";

// Define the Category enum to match the Prisma model
enum Category {
  ECONOMY = "ECONOMY",
  BUSINESS = "BUSINESS",
  FIRST_CLASS = "FIRST_CLASS",
  PREMIUM_ECONOMY = "PREMIUM_ECONOMY",
}

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
  createdAt?: Date;
  updatedAt?: Date;
}

// Flight Form Modal Component
interface FlightModalProps {
  flight: Flight;
  mode: "create" | "edit";
  onClose: () => void;
  onSuccess: () => void;
}

function FlightModal({ flight, mode, onClose, onSuccess }: FlightModalProps) {
  const [formData, setFormData] = useState<Flight>(flight);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    let parsedValue: string | number | Category = value;

    if (
      ["price", "availableSeats", "seatCapacity", "duration"].includes(name)
    ) {
      parsedValue = value === "" ? "" : parseFloat(value) || 0; // Use parseFloat for price
    }

    // Handle category as enum
    if (name === "category") {
      parsedValue = value as Category;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.flightNumber)
      newErrors.flightNumber = "Flight number is required";
    if (!formData.departure) newErrors.departure = "Departure is required";
    if (!formData.departureCode)
      newErrors.departureCode = "Departure code is required";
    if (!formData.arrival) newErrors.arrival = "Arrival is required";
    if (!formData.arrivalCode)
      newErrors.arrivalCode = "Arrival code is required";
    if (!formData.departureDate)
      newErrors.departureDate = "Departure date is required";
    if (!formData.departureHour)
      newErrors.departureHour = "Departure hour is required";
    if (!formData.duration) newErrors.duration = "Duration is required";
    if (!formData.arrivalDate)
      newErrors.arrivalDate = "Arrival date is required";
    if (!formData.arrivalHour)
      newErrors.arrivalHour = "Arrival hour is required";
    if (!formData.airline) newErrors.airline = "Airline is required";
    if (!formData.aircraft) newErrors.aircraft = "Aircraft is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.seatCapacity)
      newErrors.seatCapacity = "Seat capacity is required";
    if (!formData.availableSeats)
      newErrors.availableSeats = "Available seats is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const url =
        mode === "create"
          ? "/api/flights"
          : `/api/flights/${flight.flightNumber}`;

      const method = mode === "create" ? "POST" : "PUT";

      const departureDate = new Date(formData.departureDate);
      const arrivalDate = new Date(formData.arrivalDate);
      const departureHour = new Date(formData.departureHour);
      const arrivalHour = new Date(formData.arrivalHour);

      console.log(departureHour);
      console.log(arrivalHour);

      const requestData = {
        ...formData,
        departureDate,
        arrivalDate,
        departureHour,
        arrivalHour,
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save flight");
      }

      onSuccess();
    } catch (err) {
      if (err instanceof Error) {
        setErrors({ form: err.message });
      } else {
        setErrors({ form: "An unknown error occurred" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Format date for datetime-local input
  const formatDateForInput = (date: string | Date | null) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // Format ke YYYY-MM-DD
  };

  const formatTimeForInput = (timeStr: string | Date | null) => {
    if (!timeStr) return "";
    if (timeStr instanceof Date) {
      return timeStr.toTimeString().substring(0, 5); // Format as HH:MM
    }
    return timeStr;
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-screen overflow-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">
            {mode === "create" ? "Add New Flight" : "Edit Flight"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            &times;
          </button>
        </div>

        {errors.form && (
          <div className="bg-red-500/20 border border-red-500 text-white p-4 rounded-lg mb-6">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Flight Details */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-blue-400">
                Flight Details
              </h4>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Flight Number
                </label>
                <input
                  type="text"
                  name="flightNumber"
                  value={formData.flightNumber}
                  onChange={handleChange}
                  disabled={mode === "edit"}
                  className={`w-full bg-black/20 border ${
                    errors.flightNumber ? "border-red-500" : "border-gray-700"
                  } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.flightNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.flightNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Airline
                </label>
                <input
                  type="text"
                  name="airline"
                  value={formData.airline}
                  onChange={handleChange}
                  className={`w-full bg-black/20 border ${
                    errors.airline ? "border-red-500" : "border-gray-700"
                  } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.airline && (
                  <p className="mt-1 text-sm text-red-500">{errors.airline}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Aircraft Type
                </label>
                <input
                  type="text"
                  name="aircraft"
                  value={formData.aircraft}
                  onChange={handleChange}
                  className={`w-full bg-black/20 border ${
                    errors.aircraft ? "border-red-500" : "border-gray-700"
                  } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.aircraft && (
                  <p className="mt-1 text-sm text-red-500">{errors.aircraft}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Flight Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full bg-black/20 border ${
                    errors.category ? "border-red-500" : "border-gray-700"
                  } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select Category</option>
                  <option value={Category.ECONOMY}>Economy</option>
                  <option value={Category.BUSINESS}>Business</option>
                  <option value={Category.FIRST_CLASS}>First Class</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className={`w-full bg-black/20 border ${
                    errors.price ? "border-red-500" : "border-gray-700"
                  } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Seat Capacity
                  </label>
                  <input
                    type="number"
                    name="seatCapacity"
                    value={formData.seatCapacity}
                    onChange={handleChange}
                    min="0"
                    className={`w-full bg-black/20 border ${
                      errors.seatCapacity ? "border-red-500" : "border-gray-700"
                    } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.seatCapacity && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.seatCapacity}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Available Seats
                  </label>
                  <input
                    type="number"
                    name="availableSeats"
                    value={formData.availableSeats}
                    onChange={handleChange}
                    min="0"
                    className={`w-full bg-black/20 border ${
                      errors.availableSeats
                        ? "border-red-500"
                        : "border-gray-700"
                    } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.availableSeats && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.availableSeats}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Flight Duration (seconds)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="0"
                  className={`w-full bg-black/20 border ${
                    errors.duration ? "border-red-500" : "border-gray-700"
                  } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-500">{errors.duration}</p>
                )}
              </div>
            </div>

            {/* Departure and Arrival */}
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-blue-400">Departure</h4>
                <div className="grid grid-cols-1 gap-4 mt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="departure"
                        value={formData.departure}
                        onChange={handleChange}
                        className={`w-full bg-black/20 border ${
                          errors.departure
                            ? "border-red-500"
                            : "border-gray-700"
                        } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {errors.departure && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.departure}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Airport Code
                      </label>
                      <input
                        type="text"
                        name="departureCode"
                        value={formData.departureCode}
                        onChange={handleChange}
                        className={`w-full bg-black/20 border ${
                          errors.departureCode
                            ? "border-red-500"
                            : "border-gray-700"
                        } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {errors.departureCode && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.departureCode}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="departureDate"
                      value={formatDateForInput(formData.departureDate)}
                      onChange={handleChange}
                      className={`w-full bg-black/20 border ${
                        errors.departureDate
                          ? "border-red-500"
                          : "border-gray-700"
                      } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.departureDate && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.departureDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      name="departureHour"
                      value={formatTimeForInput(formData.departureHour) || ""}
                      onChange={handleChange}
                      className={`w-full bg-black/20 border ${
                        errors.departureHour
                          ? "border-red-500"
                          : "border-gray-700"
                      } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.departureHour && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.departureHour}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-blue-400">Arrival</h4>
                <div className="grid grid-cols-1 gap-4 mt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="arrival"
                        value={formData.arrival}
                        onChange={handleChange}
                        className={`w-full bg-black/20 border ${
                          errors.arrival ? "border-red-500" : "border-gray-700"
                        } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {errors.arrival && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.arrival}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Airport Code
                      </label>
                      <input
                        type="text"
                        name="arrivalCode"
                        value={formData.arrivalCode}
                        onChange={handleChange}
                        className={`w-full bg-black/20 border ${
                          errors.arrivalCode
                            ? "border-red-500"
                            : "border-gray-700"
                        } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {errors.arrivalCode && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.arrivalCode}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="arrivalDate"
                      value={formatDateForInput(formData.arrivalDate)}
                      onChange={handleChange}
                      className={`w-full bg-black/20 border ${
                        errors.arrivalDate
                          ? "border-red-500"
                          : "border-gray-700"
                      } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.arrivalDate && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.arrivalDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      name="arrivalHour"
                      value={formatTimeForInput(formData.arrivalHour) || ""}
                      onChange={handleChange}
                      className={`w-full bg-black/20 border ${
                        errors.arrivalHour
                          ? "border-red-500"
                          : "border-gray-700"
                      } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.arrivalHour && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.arrivalHour}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {submitting ? (
                <>
                  <div className="mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                  {mode === "create" ? "Creating..." : "Updating..."}
                </>
              ) : (
                <>{mode === "create" ? "Create Flight" : "Update Flight"}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentFlight, setCurrentFlight] = useState<Flight | null>(null);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const filteredFlights = flights.filter((flight) => {
    // Search term filter
    const searchMatches =
      flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.departure.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.arrival.toLowerCase().includes(searchTerm.toLowerCase());

    // Category filter
    const categoryMatches =
      filterCategory === "" || flight.category === filterCategory;

    // Date range filter
    const dateMatches =
      (dateRange.from === "" ||
        new Date(flight.departureDate) >= new Date(dateRange.from)) &&
      (dateRange.to === "" ||
        new Date(flight.departureDate) <= new Date(dateRange.to));

    // Price range filter
    const priceMatches =
      (priceRange.min === "" || flight.price >= Number(priceRange.min)) &&
      (priceRange.max === "" || flight.price <= Number(priceRange.max));

    return searchMatches && categoryMatches && dateMatches && priceMatches;
  });

  // Fetch all flights on component mount
  useEffect(() => {
    fetchFlights();
  }, []);

  // Fetch flights from API
  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/flights");
      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }
      const data = await response.json();
      setFlights(data);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setLoading(false);
    }
  };

  // Delete flight
  const deleteFlight = async (flightNumber: string) => {
    if (confirm("Are you sure you want to delete this flight?")) {
      try {
        const response = await fetch(`/api/flights/${flightNumber}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete flight");
        }

        // Refresh flights list
        fetchFlights();
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    }
  };

  // Open modal for create or edit
  const openModal = (flight: Flight | null = null) => {
    if (flight) {
      setMode("edit");
      setCurrentFlight(flight);
    } else {
      setMode("create");
      // Create a new flight with all required fields properly initialized
      const today = new Date();
      setCurrentFlight({
        flightNumber: "",
        departure: "",
        departureCode: "",
        arrival: "",
        arrivalCode: "",
        departureDate: today,
        departureHour: today,
        duration: 0,
        arrivalDate: today,
        arrivalHour: today,
        airline: "",
        aircraft: "",
        category: Category.ECONOMY,
        price: 0,
        seatCapacity: 0,
        availableSeats: 0,
      });
    }
    setShowModal(true);
  };

  // Format category for display
  const formatCategory = (category: Category): string => {
    switch (category) {
      case Category.ECONOMY:
        return "Economy";
      case Category.BUSINESS:
        return "Business";
      case Category.FIRST_CLASS:
        return "First Class";
      default:
        return category;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Manage Flights</h2>
          <button
            onClick={() => openModal()}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-glow"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Flight</span>
          </button>
        </div>

        {/* Flight Stats */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-xl font-bold text-white mb-4">
            Flight Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Flights */}
            <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-blue-800/50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-300 text-sm">Total Flights</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {flights.length}
                  </p>
                </div>
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Plane className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </div>

            {/* Total Available Seats */}
            <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-purple-800/50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-300 text-sm">Available Seats</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {flights.reduce(
                      (acc, flight) => acc + flight.availableSeats,
                      0
                    )}
                  </p>
                </div>
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </div>

            {/* Total Routes */}
            <div className="bg-gradient-to-br from-indigo-900/50 to-blue-900/50 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-indigo-800/50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-300 text-sm">Unique Routes</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {
                      new Set(
                        flights.map(
                          (flight) =>
                            `${flight.departureCode}-${flight.arrivalCode}`
                        )
                      ).size
                    }
                  </p>
                </div>
                <div className="bg-indigo-500/20 p-2 rounded-lg">
                  <ArrowLeftRight className="h-6 w-6 text-indigo-400" />
                </div>
              </div>
            </div>

            {/* Average Price */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-cyan-800/50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-300 text-sm">Average Price</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    $
                    {flights.length
                      ? (
                          flights.reduce(
                            (acc, flight) => acc + flight.price,
                            0
                          ) / flights.length
                        ).toFixed(2)
                      : "0.00"}
                  </p>
                </div>
                <div className="bg-cyan-500/20 p-2 rounded-lg">
                  <DollarSign className="h-6 w-6 text-cyan-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Search and Filter Bar */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-300" />
                </div>
                <input
                  type="text"
                  placeholder="Search flights by number, departure or arrival..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-black/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Button */}
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="h-4 w-4" />
                Filters
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    filterOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Extended Filter Options */}
            {filterOpen && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-black/20 rounded-lg border border-gray-700">
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Category
                  </label>
                  <select
                    className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-lg text-white"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option value={Category.ECONOMY}>Economy</option>
                    <option value={Category.PREMIUM_ECONOMY}>
                      Premium Economy
                    </option>
                    <option value={Category.BUSINESS}>Business</option>
                    <option value={Category.FIRST_CLASS}>First Class</option>
                  </select>
                </div>

                {/* Date Range Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Departure Date Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-lg text-white"
                        value={dateRange.from}
                        onChange={(e) =>
                          setDateRange({ ...dateRange, from: e.target.value })
                        }
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-lg text-white"
                        value={dateRange.to}
                        onChange={(e) =>
                          setDateRange({ ...dateRange, to: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Price Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        $
                      </span>
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full pl-8 pr-3 py-2 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-500"
                        value={priceRange.min}
                        onChange={(e) =>
                          setPriceRange({ ...priceRange, min: e.target.value })
                        }
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        $
                      </span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full pl-8 pr-3 py-2 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-500"
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange({ ...priceRange, max: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Flights Table */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            <p className="text-white mt-2">Loading flights...</p>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-black/20 text-white text-left">
                    <th className="px-6 py-3">Flight Number</th>
                    <th className="px-6 py-3">Route</th>
                    <th className="px-6 py-3">Departure</th>
                    <th className="px-6 py-3">Arrival</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Available Seats</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/30">
                  {filteredFlights.length > 0 ? (
                    filteredFlights.map((flight) => (
                      <tr
                        key={flight.flightNumber}
                        className="text-white hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium">
                          {flight.flightNumber}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Map className="h-4 w-4 text-blue-400" />
                            <span>
                              {flight.departure} - {flight.arrival}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <div className="flex items-center space-x-1 text-sm">
                              <Calendar className="h-3 w-3 text-blue-400" />
                              <span>
                                {new Date(
                                  flight.departureDate
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-gray-300 mt-1">
                              <Clock className="h-3 w-3 text-blue-400" />
                              <span>
                                {flight.departureHour
                                  ? new Date(
                                      flight.departureHour
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })
                                  : "Invalid Time"}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <div className="flex items-center space-x-1 text-sm">
                              <Calendar className="h-3 w-3 text-blue-400" />
                              <span>
                                {new Date(
                                  flight.arrivalDate
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-gray-300 mt-1">
                              <Clock className="h-3 w-3 text-blue-400" />
                              <span>
                                {new Date(
                                  flight.arrivalHour
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4 text-green-400" />
                            <span>${flight.price.toFixed(2)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              flight.category === Category.ECONOMY
                                ? "bg-blue-500/20 text-blue-300"
                                : flight.category === Category.BUSINESS
                                ? "bg-purple-500/20 text-purple-300"
                                : "bg-amber-500/20 text-amber-300"
                            }`}
                          >
                            {formatCategory(flight.category)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-blue-400" />
                            <span>
                              {flight.availableSeats}/{flight.seatCapacity}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openModal(flight)}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                              title="Edit Flight"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteFlight(flight.flightNumber)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                              title="Delete Flight"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-10 text-center text-gray-300"
                      >
                        {searchTerm ||
                        filterCategory ||
                        dateRange.from ||
                        dateRange.to ||
                        priceRange.min ||
                        priceRange.max
                          ? "No flights match your search criteria. Try adjusting your filters."
                          : 'No flights found. Click "Add New Flight" to create one.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Flight Modal */}
      {showModal && currentFlight && (
        <FlightModal
          flight={currentFlight}
          mode={mode}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchFlights();
          }}
        />
      )}
    </div>
  );
}
