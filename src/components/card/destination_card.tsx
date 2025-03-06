import React from "react";
import { Heart, MapPin, Star } from "lucide-react";
import Button from "../ui/button";

interface Destination {
  imageUrl?: string;
  name?: string;
  rating?: number;
  reviews?: number;
  description?: string;
  price?: string;
  duration?: string;
  isFavorite?: boolean;
}

interface DestinationCardProps {
  destination?: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  destination = {},
}) => {
  const {
    imageUrl = "/api/placeholder/400/250",
    name = "Bali, Indonesia",
    rating = 4.8,
    reviews = 2451,
    description = "Experience the perfect blend of nature, culture, and luxury in this tropical paradise.",
    price = "$899",
    duration = "7 days",
    isFavorite = false,
  } = destination;

  return (
    <div className="card-box group">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-[250px] object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Location and Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{rating}</span>
            <span className="text-sm text-gray-500">({reviews})</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        {/* Price and Duration */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-2xl font-bold text-gray-900">{price}</span>
            <span className="text-gray-500 text-sm">/person</span>
          </div>
          <span className="text-sm text-gray-600">{duration}</span>
        </div>

        {/* Action Button */}
        <Button text="Explore Now" showArrow />
      </div>
    </div>
  );
};

export default DestinationCard;
