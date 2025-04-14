
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, User, Settings, Calendar } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import HabitCheckbox from '@/components/HabitCheckbox';
import StreakCounter from '@/components/StreakCounter';
import GlassButton from '@/components/GlassButton';
import { mockHabits, getMotivationalPhrase } from '@/data/mockData';
import { Habit } from '@/data/types';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const [habits, setHabits] = useState<Habit[]>(mockHabits);
  const { toast } = useToast();
  
  const handleToggleHabit = (id: string, completed: boolean) => {
    setHabits(prevHabits =>
      prevHabits.map(habit =>
        habit.id === id ? { ...habit, completedToday: completed } : habit
      )
    );
    
    const habit = habits.find(h => h.id === id);
    
    toast({
      title: completed 
        ? `✨ "${habit?.name}" completed!` 
        : `"${habit?.name}" marked as incomplete`,
      description: completed 
        ? "Great job maintaining your momentum!" 
        : "No worries, you can complete it later today.",
      className: "glass border-white/30"
    });
  };

  // Get today's date formatted as "Monday, April 14"
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen px-4 py-8">
      <header className="max-w-5xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
              Momentum
            </h1>
            <p className="text-gray-600 mt-1">{today}</p>
          </div>
          
          <div className="flex gap-3">
            <Link to="/profile">
              <GlassButton 
                icon={<User size={18} />}
                variant="ghost"
                size="sm"
              >
                Profile
              </GlassButton>
            </Link>
            <Link to="/settings">
              <GlassButton 
                icon={<Settings size={18} />}
                variant="ghost"
                size="sm"
              >
                Settings
              </GlassButton>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Today's Habits</h2>
          <Link to="/add-habit">
            <GlassButton 
              icon={<Plus size={18} />}
              variant="primary"
              className="animate-fade-in"
            >
              Add Habit
            </GlassButton>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map((habit) => (
            <GlassCard 
              key={habit.id}
              className="animate-fade-in"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{habit.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{habit.description}</p>
                </div>
                <HabitCheckbox 
                  checked={habit.completedToday} 
                  onChange={(checked) => handleToggleHabit(habit.id, checked)} 
                />
              </div>
              
              <div className="mt-4">
                <StreakCounter 
                  count={habit.currentStreak}
                  highlight={habit.currentStreak >= 5}
                />
                <p className={`text-sm mt-2 opacity-0 ${habit.completedToday ? 'animate-fade-in opacity-100' : ''}`}>
                  {getMotivationalPhrase()}
                </p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/20">
                <Link 
                  to={`/habit/${habit.id}`} 
                  className="flex items-center text-sm text-primary hover:text-primary/80 transition"
                >
                  <Calendar size={14} className="mr-1" />
                  View details
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
