
import React from 'react';
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakCounterProps {
  count: number;
  className?: string;
  showIcon?: boolean;
  highlight?: boolean;
}

const StreakCounter = ({ 
  count, 
  className,
  showIcon = true,
  highlight = false
}: StreakCounterProps) => {
  return (
    <div 
      className={cn(
        "flex items-center gap-1 font-medium",
        highlight && "animate-pulse-glow",
        className
      )}
    >
      {showIcon && (
        <Flame 
          className={cn(
            "text-amber-500", 
            count > 5 && "text-amber-600"
          )} 
          size={18} 
        />
      )}
      <span>{count} {count === 1 ? 'day' : 'days'}</span>
    </div>
  );
};

export default StreakCounter;
