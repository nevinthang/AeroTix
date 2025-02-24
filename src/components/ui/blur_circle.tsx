import React from "react";

interface BlurCircleProps {
  size?: number;
  colors?: string;
  position?: { top?: string; right?: string; left?: string; bottom?: string };
  scrollFactor?: number;
  scrollPosition?: number;
}

const BlurCircle: React.FC<BlurCircleProps> = ({
  size = 800,
  colors = "from-blue-100 to-purple-100",
  position = { top: "10%", right: "0%" },
  scrollFactor = 0.1,
  scrollPosition = 0,
}) => {
  return (
    <div
      className={`absolute rounded-full bg-gradient-to-r ${colors} blur-3xl`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        ...position,
        transform: `translate(40%, -40%) rotate(${scrollPosition * scrollFactor}deg)`,
      }}
    />
  );
};

export default BlurCircle;
