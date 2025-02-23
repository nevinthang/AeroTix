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
      className={`group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-medium text-white hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300 ${className}`}
    >
      <span className="flex items-center gap-2">
        {text}
        {showArrow && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
      </span>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 blur opacity-0 group-hover:opacity-50 transition-opacity" />
    </button>
  );
};

export default Button;
