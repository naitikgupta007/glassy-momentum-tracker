
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const GlassCard = ({ 
  children, 
  className, 
  onClick, 
  hover = true 
}: GlassCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card p-6",
        hover && "hover:translate-y-[-5px]", 
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
