"use client";

import React, { useState, useRef, useEffect } from 'react';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'primary' | 'secondary' | 'light' | 'outline';

export interface RippleType {
  x: number;
  y: number;
  id: number;
}

export interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<AnimatedButtonProps> = ({ 
  children, 
  variant = 'primary' as ButtonVariant,
  size = 'medium' as ButtonSize,
  disabled = false,
  onClick,
  className = ''
}) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [ripples, setRipples] = useState<RippleType[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const cleanup = setTimeout(() => {
      if (ripples.length > 0) {
        setRipples([]);
      }
    }, 1000);
    return () => clearTimeout(cleanup);
  }, [ripples]);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ripple: RippleType = {
      x,
      y,
      id: Date.now()
    };

    setRipples(prevRipples => [...prevRipples, ripple]);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (!disabled) {
      createRipple(event);
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);
      onClick?.(event);
    }
  };

  // Define the size classes with explicit type
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  } satisfies Record<ButtonSize, string>;

  // Define the variant classes with explicit type
  const variantClasses = {
    primary: 'bg-primary hover:bg-secondary text-white',
    secondary: 'bg-secondary hover:bg-bluelight text-white',
    light: 'bg-bluelight hover:bg-bluethin text-primary',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-bluethin'
  } satisfies Record<ButtonVariant, string>;

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled}
      className={`
        relative overflow-hidden
        rounded-lg font-semibold
        transform transition-all duration-200
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${isPressed ? 'scale-95' : 'scale-100'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50
        ${className}
      `}
    >
      <span className="relative z-10">
        {children}
      </span>
      
      {ripples.map((ripple: RippleType) => (
        <span
          key={ripple.id}
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)'
          }}
          className={`
            absolute rounded-full
            bg-white bg-opacity-30
            animate-ripple pointer-events-none
          `}
        />
      ))}
    </button>
  );
};

export default Button;