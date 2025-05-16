import React from 'react';

export function Button({ 
  children, 
  className, 
  variant = "default", 
  size = "md",
  ...props 
}) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-5 py-2.5 text-lg"
  };
  
  const variantClasses = {
    default: "bg-[#D6BD94] text-[#0a0a0c] hover:bg-[#D6BD94]/90",
    secondary: "bg-[#D6BD94] text-[#0a0a0c] hover:bg-[#D6BD94]/80",
    outline: "bg-transparent border border-[#D6BD94] text-[#D6BD94] hover:bg-[#D6BD94]/10",
    ghost: "bg-transparent text-[#D6BD94] hover:bg-[#D6BD94]/10"
  };
  
  return (
    <button 
      className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-md font-medium transition-colors ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}