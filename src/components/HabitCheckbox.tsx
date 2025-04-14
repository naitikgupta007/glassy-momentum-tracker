
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HabitCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const HabitCheckbox = ({ 
  checked: initialChecked = false, 
  onChange, 
  className 
}: HabitCheckboxProps) => {
  const [checked, setChecked] = useState(initialChecked);
  
  const handleClick = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <div
      className={cn(
        "relative w-7 h-7 rounded-md cursor-pointer transition-all duration-300",
        "border flex items-center justify-center",
        checked 
          ? "bg-primary border-primary animate-pulse-glow" 
          : "glass border-white/30 hover:bg-white/30",
        className
      )}
      onClick={handleClick}
    >
      {checked && (
        <Check 
          className="text-white animate-rotate-check" 
          size={16} 
          strokeWidth={3} 
        />
      )}
    </div>
  );
};

export default HabitCheckbox;
