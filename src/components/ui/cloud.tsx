'use client';

import React, { useEffect, useRef, useState } from "react";

interface CloudProps {
  className?: string;
  delay: number;
  duration: number;
  scale?: number
}

const Cloud:React.FC<CloudProps> = ({ className, delay, duration, scale = 1 }) => {
  const cloudRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const startAnimation = setTimeout(() => {
      const interval = setInterval(() => {
        setPosition(prev => {
          const newX = prev.x + 0.2;
          const newY = Math.sin(newX * 0.05) * 5;
          return { x: newX, y: newY };
        });
      }, 50);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(startAnimation);
  }, [delay]);

  return (
    <div
      ref={cloudRef}
      className={`${className} transition-opacity duration-1000`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    ></div>
  );
};

export default Cloud;