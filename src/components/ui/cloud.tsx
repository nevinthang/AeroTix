'use client';

import React from "react";

interface CloudProps {
  className?: string;
  delay?: number;
  duration: number;
}

const Cloud: React.FC<CloudProps> = ({ className, delay, duration }) => {
  return (
    <div 
      className={`${className} animate-float`} 
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s` 
      }}
    ></div>
  );
};

export default Cloud;