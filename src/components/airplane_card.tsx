import React from 'react';
import { FaPlane, FaClock, FaInfoCircle, FaDollarSign } from 'react-icons/fa';
import Button from '@/components/button'; 

interface AirplaneCardProps {
  id: string;
  airline: string;
  dateofJourney: string; // e.g., "2023-04-15"
  source: string;
  destination: string;
  depTime: string; // e.g., "14:30"
  arrivalTime: string; // e.g., "17:45"
  duration: string; // e.g., "3h 15m"
  totalStops: number;
  additionalInfo?: string; // Optional
  price: string; // e.g., "$250"
}

// Format the date (e.g., "2023-04-15" → "April 15, 2023")
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

// Format the time (e.g., "14:30" → "2:30 PM")
const formatTime = (timeString: string): string => {
  const [hour, minute] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hour, 10));
  date.setMinutes(parseInt(minute, 10));
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

const AirplaneCard: React.FC<AirplaneCardProps> = ({
  id,
  airline,
  dateofJourney,
  source,
  destination,
  depTime,
  arrivalTime,
  duration,
  totalStops,
  additionalInfo,
  price,
}) => {
  const formattedDate = formatDate(dateofJourney);
  const formattedDepTime = formatTime(depTime);
  const formattedArrivalTime = formatTime(arrivalTime);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transform hover:scale-105 transition duration-300">
      {/* Header: Airline and ID */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <FaPlane className="text-blue-500 mr-2" aria-hidden="true" />
          <h2 className="text-xl font-bold text-blue-700">{airline}</h2>
        </div>
        <span className="text-gray-500">#{id}</span>
      </div>

      {/* Journey Details: Source, Destination, Times, and Date */}
      <div className="mb-4">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-700 font-semibold">{source}</p>
            <p className="text-sm text-gray-500">{formattedDepTime}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">{destination}</p>
            <p className="text-sm text-gray-500">{formattedArrivalTime}</p>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-2">{formattedDate}</p>
      </div>

      {/* Flight Details: Duration and Stops */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <FaClock className="text-blue-500 mr-2" aria-hidden="true" />
          <p className="text-gray-700">{duration}</p>
        </div>
        <div className="flex items-center">
          <p className="text-gray-700">
            {totalStops === 0 ? 'Non-stop' : `${totalStops} stop${totalStops > 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {/* Additional Info (Optional) */}
      {additionalInfo && (
        <div className="mb-4">
          <div className="flex items-center">
            <FaInfoCircle className="text-blue-500 mr-2" aria-hidden="true" />
            <p className="text-gray-700">{additionalInfo}</p>
          </div>
        </div>
      )}

      {/* Price and Button */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FaDollarSign className="text-blue-500 mr-2" aria-hidden="true" />
          <p className="text-xl font-bold text-blue-700">{price}</p>
        </div>
        <Button>Book Now</Button>
      </div>
    </div>
  );
};

export default AirplaneCard;