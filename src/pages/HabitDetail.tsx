
import React, { useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Calendar, Award } from 'lucide-react';
import GlassButton from '@/components/GlassButton';
import GlassCard from '@/components/GlassCard';
import StreakCounter from '@/components/StreakCounter';
import { mockHabits } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';

const HabitDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const habit = useMemo(() => mockHabits.find((h) => h.id === id), [id]);
  
  if (!habit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassCard className="max-w-md w-full text-center">
          <h2 className="text-2xl font-semibold mb-4">Habit not found</h2>
          <p className="mb-6">The habit you're looking for doesn't exist.</p>
          <Link to="/">
            <GlassButton variant="primary">Back to Dashboard</GlassButton>
          </Link>
        </GlassCard>
      </div>
    );
  }
  
  const handleDelete = () => {
    toast({
      title: "Habit deleted",
      description: `"${habit.name}" has been removed from your habits.`,
      className: "glass border-white/30"
    });
    navigate('/');
  };
  
  // Create a calendar grid for the current month
  const renderCalendarGrid = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const completedDaysSet = new Set(habit.completedDays);
    
    return (
      <div className="grid grid-cols-7 gap-2 mt-6">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-600">
            {day}
          </div>
        ))}
        
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const date = new Date(currentYear, currentMonth, day);
          const dateStr = date.toISOString().split('T')[0];
          const isCompleted = completedDaysSet.has(dateStr);
          const isToday = day === today.getDate();
          
          return (
            <div 
              key={day}
              className={`
                text-center py-1 rounded-full text-sm
                ${isToday ? 'ring-2 ring-primary/30' : ''}
                ${isCompleted ? 'bg-green-500/80 text-white' : 'glass'}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/">
            <GlassButton 
              icon={<ArrowLeft size={16} />}
              variant="ghost"
              size="sm"
            >
              Back to Dashboard
            </GlassButton>
          </Link>
        </div>
        
        <GlassCard className="mb-8 animate-fade-in">
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl font-bold">{habit.name}</h1>
              <p className="text-gray-600 mt-2">{habit.description}</p>
            </div>
            <div className="flex gap-2">
              <Link to={`/edit-habit/${habit.id}`}>
                <GlassButton 
                  icon={<Edit size={18} />}
                  variant="outline"
                  size="sm"
                >
                  Edit
                </GlassButton>
              </Link>
              <GlassButton 
                icon={<Trash2 size={18} />}
                variant="ghost"
                size="sm"
                className="text-red-500 hover:bg-red-50"
                onClick={handleDelete}
              >
                Delete
              </GlassButton>
            </div>
          </div>
        </GlassCard>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <GlassCard className="animate-fade-in" style={{animationDelay: "100ms"}}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <Calendar size={20} className="mr-2 text-primary" />
                Current Streak
              </h2>
              <StreakCounter 
                count={habit.currentStreak} 
                highlight={true} 
              />
            </div>
            <p className="text-gray-600">
              {habit.currentStreak > 0 
                ? `You've completed this habit ${habit.currentStreak} days in a row!` 
                : "Start your streak today!"}
            </p>
          </GlassCard>
          
          <GlassCard className="animate-fade-in" style={{animationDelay: "200ms"}}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <Award size={20} className="mr-2 text-amber-500" />
                Longest Streak
              </h2>
              <StreakCounter 
                count={habit.longestStreak} 
                className="text-amber-600"
              />
            </div>
            <p className="text-gray-600">
              {habit.longestStreak > 0 
                ? `Your personal best is ${habit.longestStreak} days!` 
                : "Complete this habit to start your streak!"}
            </p>
          </GlassCard>
        </div>
        
        <GlassCard className="animate-fade-in" style={{animationDelay: "300ms"}}>
          <h2 className="text-lg font-semibold mb-4">Monthly Activity</h2>
          {renderCalendarGrid()}
        </GlassCard>
      </div>
    </div>
  );
};

export default HabitDetail;
