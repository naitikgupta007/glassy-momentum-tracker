
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const GlassButton = ({ 
  children, 
  onClick, 
  className, 
  icon,
  variant = 'default',
  size = 'md'
}: GlassButtonProps) => {
  const variants = {
    default: "glass-button",
    primary: "bg-primary hover:bg-primary/90 text-white border-primary/50 shadow-md",
    outline: "border border-white/40 hover:bg-white/20 backdrop-blur-sm",
    ghost: "hover:bg-white/10 backdrop-blur-sm"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };
  
  return (
    <button
      className={cn(
        "rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-in-out",
        "active:scale-[0.98] focus:outline-none",
        variants[variant],
        sizes[size],
        className
      )}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default GlassButton;
