import { useEffect, useState } from "react";

interface HeroBookCardProps {
  code: string;
  city: string;
  label: string;
  className: string;
  delay: number;
}

const HeroBookCard: React.FC<HeroBookCardProps> = ({ code, city, label, className, delay }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`${className} bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 shadow-xl transition-all duration-1000 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}
    >
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold mr-3">
          {code}
        </div>
        <div>
          <p className="text-xs text-blue-100">{label}</p>
          <p className="font-semibold">{city}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroBookCard;
