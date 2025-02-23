import React from "react";
import { FaPlane, FaClock, FaInfoCircle, FaDollarSign, FaArrowDown } from "react-icons/fa";
import Button from "@/components/button";

interface AirplaneCardProps {
  id: string;
  airline: string;
  dateofJourney: string;
  source: string;
  destination: string;
  depTime: string;
  arrivalTime: string;
  duration: string;
  totalStops: number;
  additionalInfo?: string;
  price: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

const formatTime = (timeString: string): string => {
  const [hour, minute] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hour, 10));
  date.setMinutes(parseInt(minute, 10));
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
};

const AirplaneCard: React.FC<AirplaneCardProps> = ({ id, airline, dateofJourney, source, destination, depTime, arrivalTime, duration, totalStops, additionalInfo, price }) => {
  const formattedDate = formatDate(dateofJourney);
  const formattedDepTime = formatTime(depTime);
  const formattedArrivalTime = formatTime(arrivalTime);

  return (
    <div className="bg-background rounded-xl shadow-md p-8 hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out">
      {/* Header: Airline and ID */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <FaPlane className="text-primary text-xl" aria-hidden="true" />
          <h2 className="text-xl font-bold text-primary font-sans">{airline}</h2>
        </div>
        <span className="text-text text-sm bg-secondary bg-opacity-20 px-2 py-1 rounded-full">#{id}</span>
      </div>

      {/* Journey Details */}
      <div className="relative flex flex-col gap-6">
        {/* Timeline Path */}
        <div className="absolute left-1 top-6 bottom-6 w-px bg-secondary opacity-30 dashed-line" />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2"></div>

        {/* Source */}
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div>
            <p className="text-text font-semibold text-base font-sans">{source}</p>
            <p className="text-text text-sm opacity-60">{formattedDepTime}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div>
            <p className="text-text font-semibold text-base font-sans">{destination}</p>
            <p className="text-text text-sm opacity-60">{formattedArrivalTime}</p>
          </div>
        </div>
      </div>

      {/* Flight Info */}
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaClock className="text-primary text-base" aria-hidden="true" />
            <p className="text-text font-medium font-sans">{duration}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-sans font-semibold ${totalStops === 0 ? "bg-secondary text-white" : "bg-primary text-white"}`}>
            {totalStops === 0 ? "Non-stop" : `${totalStops} stop${totalStops > 1 ? "s" : ""}`}
          </span>
        </div>

        {/* Additional Info */}
        {additionalInfo && (
          <div className="flex items-center gap-2 bg-secondary bg-opacity-10 p-2 rounded-md">
            <FaInfoCircle className="text-primary text-sm" aria-hidden="true" />
            <p className="text-text text-sm font-sans">{additionalInfo}</p>
          </div>
        )}
      </div>

      {/* Price and Button */}
      <div className="mt-6 flex justify-between items-center border-t border-secondary border-opacity-20 pt-4">
        <div className="flex items-center gap-2">
          <FaDollarSign className="text-primary text-lg" aria-hidden="true" />
          <p className="text-xl font-bold text-primary font-sans">{price}</p>
        </div>
        <Button>Book Now</Button>
      </div>
    </div>
  );
};

export default AirplaneCard;
