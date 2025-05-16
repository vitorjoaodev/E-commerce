import React from 'react';

export function Button({ children, className, ...props }) {
  return (
    <button 
      className={`px-4 py-2 bg-[#D6BD94] text-[#0a0a0c] rounded-md hover:bg-[#D6BD94]/90 font-medium ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}