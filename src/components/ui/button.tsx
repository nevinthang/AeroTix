import React from "react";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className = "", showArrow = false }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 
        rounded-full font-medium text-white shadow-md shadow-blue-500/30 
        hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/40 
        transition-all duration-300 ease-out overflow-hidden ${className}`}
    >
      <span className="flex items-center gap-2 group-hover:text-white relative z-10">
        {text}
        {showArrow && (
          <ArrowRight className="w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
        )}
      </span>
      {/* Background Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 
        opacity-0 group-hover:opacity-40 transition-opacity duration-300 after:absolute after:inset-0 after:blur-lg after:opacity-50" />
    </button>
  );
};

export default Button;
