// pages/dashboard.js
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
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
  ArrowLeftRight
} from 'lucide-react';

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
}

// Flight Form Modal Component
interface FlightModalProps {
  flight: Flight;
  mode: 'create' | 'edit';
  onClose: () => void;
  onSuccess: () => void;
}

function FlightModal({ flight, mode, onClose, onSuccess }: FlightModalProps) {
  const [formData, setFormData] = useState<Flight>(flight);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'availableSeats' || name === 'seatCapacity' || name === 'duration'
        ? parseInt(value) 
        : value
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.flightNumber) newErrors.flightNumber = 'Flight number is required';
    if (!formData.departure) newErrors.departure = 'Departure is required';
    if (!formData.departureCode) newErrors.departureCode = 'Departure code is required';
    if (!formData.arrival) newErrors.arrival = 'Arrival is required';
    if (!formData.arrivalCode) newErrors.arrivalCode = 'Arrival code is required';
    if (!formData.departureDate) newErrors.departureDate = 'Departure date is required';
    if (!formData.departureHour) newErrors.departureHour = 'Departure hour is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    if (!formData.arrivalDate) newErrors.arrivalDate = 'Arrival date is required';
    if (!formData.arrivalHour) newErrors.arrivalHour = 'Arrival hour is required';
    if (!formData.airline) newErrors.airline = 'Airline is required';
    if (!formData.aircraft) newErrors.aircraft = 'Aircraft is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.seatCapacity) newErrors.seatCapacity = 'Seat capacity is required';
    if (!formData.availableSeats) newErrors.availableSeats = 'Available seats is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const url = mode === 'create' 
        ? '/api/flights' 
        : `/api/flights/${flight.flightNumber}`;
      
      const method = mode === 'create' ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save flight');
      }

      onSuccess();
    } catch (err) {
      if (err instanceof Error) {
        setErrors({ form: err.message });
      } else {
        setErrors({ form: 'An unknown error occurred' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Format date for datetime-local input
  const formatDateForInput = (date: Date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-screen overflow-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">
            {mode === 'create' ? 'Add New Flight' : 'Edit Flight'}
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
              <h4 className="text-lg font-medium text-blue-400">Flight Details</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Flight Number
                </label>
                <input
                  type="text"
                  name="flightNumber"
                  value={formData.flightNumber}
                  onChange={handleChange}
                  disabled={mode === 'edit'}
                  className={`w-full bg-black/20 border ${
                    errors.flightNumber ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.flightNumber && (
                  <p className="mt-1 text-sm text-red-500">{errors.flightNumber}</p>
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
                    errors.airline ? 'border-red-500' : 'border-gray-700'
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
                    errors.aircraft ? 'border-red-500' : 'border-gray-700'
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
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full bg-black/20 border ${
                    errors.category ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
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
                    errors.price ? 'border-red-500' : 'border-gray-700'
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
                      errors.seatCapacity ? 'border-red-500' : 'border-gray-700'
                    } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.seatCapacity && (
                    <p className="mt-1 text-sm text-red-500">{errors.seatCapacity}</p>
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
                      errors.availableSeats ? 'border-red-500' : 'border-gray-700'
                    } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.availableSeats && (
                    <p className="mt-1 text-sm text-red-500">{errors.availableSeats}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Flight Duration (minutes)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="0"
                  className={`w-full bg-black/20 border ${
                    errors.duration ? 'border-red-500' : 'border-gray-700'
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
                          errors.departure ? 'border-red-500' : 'border-gray-700'
                        } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {errors.departure && (
                        <p className="mt-1 text-sm text-red-500">{errors.departure}</p>
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
                          errors.departureCode ? 'border-red-500' : 'border-gray-700'
                        } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {errors.departureCode && (
                        <p className="mt-1 text-sm text-red-500">{errors.departureCode}</p>
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
                        errors.departureDate ? 'border-red-500' : 'border-gray-700'
                      } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.departureDate && (
                      <p className="mt-1 text-sm text-red-500">{errors.departureDate}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      name="departureHour"
                      value={formData.departureHour instanceof Date ? 
                        new Date(formData.departureHour).toTimeString().slice(0, 5) : 
                        ''}
                      onChange={handleChange}
                      className={`w-full bg-black/20 border ${
                        errors.departureHour ? 'border-red-500' : 'border-gray-700'
                      } rounded-lg p-3 text-white focus:outline-none focus:ring-2} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.departureHour && (
                      <p className="mt-1 text-sm text-red-500">{errors.departureHour}</p>
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
                          errors.arrival ? 'border-red-500' : 'border-gray-700'
                        } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {errors.arrival && (
                        <p className="mt-1 text-sm text-red-500">{errors.arrival}</p>
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
                          errors.arrivalCode ? 'border-red-500' : 'border-gray-700'
                        } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {errors.arrivalCode && (
                        <p className="mt-1 text-sm text-red-500">{errors.arrivalCode}</p>
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
                        errors.arrivalDate ? 'border-red-500' : 'border-gray-700'
                      } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.arrivalDate && (
                      <p className="mt-1 text-sm text-red-500">{errors.arrivalDate}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      name="arrivalHour"
                      value={formData.arrivalHour instanceof Date ? 
                        new Date(formData.arrivalHour).toTimeString().slice(0, 5) : 
                        ''}
                      onChange={handleChange}
                      className={`w-full bg-black/20 border ${
                        errors.arrivalHour ? 'border-red-500' : 'border-gray-700'
                      } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.arrivalHour && (
                      <p className="mt-1 text-sm text-red-500">{errors.arrivalHour}</p>
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
                  {mode === 'create' ? 'Creating...' : 'Updating...'}
                </>
              ) : (
                <>{mode === 'create' ? 'Create Flight' : 'Update Flight'}</>
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
  const [mode, setMode] = useState<'create' | 'edit'>('create');

  // Fetch all flights on component mount
  useEffect(() => {
    fetchFlights();
  }, []);

  // Fetch flights from API
  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/flights');
      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }
      const data = await response.json();
      setFlights(data);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setLoading(false);
    }
  };

  // Delete flight
  const deleteFlight = async (flightNumber: string) => {
    if (confirm('Are you sure you want to delete this flight?')) {
      try {
        const response = await fetch(`/api/flights/${flightNumber}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete flight');
        }
        
        // Refresh flights list
        fetchFlights();
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }
  };

 // Open modal for create or edit
const openModal = (flight: Flight | null = null) => {
  if (flight) {
    setMode('edit');
    setCurrentFlight(flight);
  } else {
    setMode('create');
    // Create a new flight with all required fields properly initialized
    const today = new Date();
    setCurrentFlight({
      flightNumber: '',
      departure: '',
      departureCode: '',
      arrival: '',
      arrivalCode: '',
      departureDate: today,
      departureHour: today,
      duration: 0,
      arrivalDate: today,
      arrivalHour: today,
      airline: '',
      aircraft: '',
      category: '',
      price: 0,
      seatCapacity: 0,
      availableSeats: 0,
    });
  }
  setShowModal(true);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Plane className="text-blue-400 h-6 w-6" />
            <h1 className="text-white text-xl font-bold">Flight Admin Dashboard</h1>
          </div>
          <Link 
            href="/" 
            className="text-white hover:text-blue-300 transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
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

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

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
                    <th className="px-6 py-3">Available Seats</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/30">
                  {flights.length > 0 ? (
                    flights.map((flight) => (
                      <tr key={flight.flightNumber} className="text-white hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium">{flight.flightNumber}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Map className="h-4 w-4 text-blue-400" />
                            <span>{flight.departure} - {flight.arrival}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <div className="flex items-center space-x-1 text-sm">
                              <Calendar className="h-3 w-3 text-blue-400" />
                              <span>{new Date(flight.departureDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-gray-300 mt-1">
                              <Clock className="h-3 w-3 text-blue-400" />
                              <span>{new Date(flight.departureHour).toLocaleTimeString()}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <div className="flex items-center space-x-1 text-sm">
                              <Calendar className="h-3 w-3 text-blue-400" />
                              <span>{new Date(flight.arrivalDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-gray-300 mt-1">
                              <Clock className="h-3 w-3 text-blue-400" />
                              <span>{new Date(flight.arrivalHour).toLocaleTimeString()}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4 text-green-400" />
                            <span>{flight.price.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-blue-400" />
                            <span>{flight.availableSeats}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openModal(flight)}
                              className="p-1 text-blue-400 hover:bg-blue-400/20 rounded transition-colors"
                              title="Edit Flight"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => deleteFlight(flight.flightNumber)}
                              className="p-1 text-red-400 hover:bg-red-400/20 rounded transition-colors"
                              title="Delete Flight"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-white">
                        No flights found. Add a new flight to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Create/Edit Flight Modal */}
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