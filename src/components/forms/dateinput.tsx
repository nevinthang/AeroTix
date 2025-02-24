"use client";

import React from 'react';

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  error,
  helperText,
  className = "",
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type="date"
        className={`
          w-full px-4 py-2 rounded-lg border
          transition-colors duration-200
          placeholder:text-gray-400
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
          }
          focus:outline-none focus:ring-4
          [&::-webkit-calendar-picker-indicator]:opacity-100
          [&::-webkit-calendar-picker-indicator]:hover:cursor-pointer
          ${className}
        `}
        {...props}
      />
      {helperText && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default DateInput;