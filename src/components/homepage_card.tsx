import React, { useState } from 'react';

interface CardProps {
  children: React.ReactNode | ((props: { travellers: Travellers; handleTravellerChange: HandleTravellerChange }) => React.ReactNode);
  className?: string;
  onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove?: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd?: (params: { isLeftSwipe: boolean; isRightSwipe: boolean; distance: number }) => void;
  isTouchEnabled?: boolean;
  isInteractive?: boolean;
  defaultTravellers?: Travellers;
}

interface Travellers {
  adults: number;
  children: number;
  infants: number;
}

type HandleTravellerChange = (type: keyof Travellers, operation: 'add' | 'remove') => void;

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  isTouchEnabled = false,
  isInteractive = false,
  defaultTravellers = {
    adults: 2,
    children: 1,
    infants: 0,
  },
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [travellers, setTravellers] = useState<Travellers>(defaultTravellers);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isTouchEnabled) return;
    setTouchStart(e.touches[0].clientX);
    if (onTouchStart) onTouchStart(e);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isTouchEnabled) return;
    setTouchEnd(e.touches[0].clientX);
    if (onTouchMove) onTouchMove(e);
  };

  const handleTouchEnd = () => {
    if (!isTouchEnabled || touchStart === null || touchEnd === null) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (onTouchEnd) {
      onTouchEnd({ isLeftSwipe, isRightSwipe, distance });
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleTravellerChange: HandleTravellerChange = (type, operation) => {
    if (!isInteractive) return;
    setTravellers((prev) => ({
      ...prev,
      [type]: operation === 'add' ? prev[type] + 1 : Math.max(0, prev[type] - 1),
    }));
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg ${className}`}
      {...(isTouchEnabled && {
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
      })}
    >
      {typeof children === 'function' ? children({ travellers, handleTravellerChange }) : children}
    </div>
  );
};

export const TouchableCard: React.FC<Omit<CardProps, 'isTouchEnabled'>> = (props) => (
  <Card {...props} isTouchEnabled />
);

export const TravellerCard: React.FC<Omit<CardProps, 'isInteractive'>> = (props) => (
  <Card {...props} isInteractive />
);

export default Card;
