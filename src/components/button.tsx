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
      className={`group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 ${className}`}
    >
      {text}
      {showArrow && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
    </button>
  );
};

export default Button;
