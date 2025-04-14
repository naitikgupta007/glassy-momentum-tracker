
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit, LogOut, Calendar, Award, Mail } from 'lucide-react';
import GlassButton from '@/components/GlassButton';
import GlassCard from '@/components/GlassCard';
import { mockUser, mockHabits } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { toast } = useToast();
  const [isHovering, setIsHovering] = useState(false);
  
  const totalHabits = mockHabits.length;
  const activeDays = [...new Set(mockHabits.flatMap(h => h.completedDays))].length;
  const totalCompletions = mockHabits.reduce((sum, h) => sum + h.completedDays.length, 0);
  const longestStreak = Math.max(...mockHabits.map(h => h.longestStreak));
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
      className: "glass border-white/30"
    });
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
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <GlassCard className="flex-1 animate-fade-in">
            <div className="flex flex-col items-center mb-6 relative">
              <div 
                className="relative rounded-full overflow-hidden mb-4 ring-4 ring-white/30"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <img 
                  src={mockUser.avatarUrl} 
                  alt={mockUser.name} 
                  className="w-32 h-32 object-cover"
                />
                {isHovering && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Edit className="text-white" size={24} />
                  </div>
                )}
              </div>
              
              <h1 className="text-2xl font-bold">{mockUser.name}</h1>
              <div className="flex items-center text-gray-600 mt-2">
                <Mail size={16} className="mr-2" />
                <span>{mockUser.email}</span>
              </div>
            </div>
            
            <div className="border-t border-white/20 pt-4">
              <p className="text-gray-600 text-center">
                Member since {new Date(mockUser.joinedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
              
              <div className="mt-6 flex justify-center">
                <GlassButton 
                  icon={<LogOut size={18} />}
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-800"
                  onClick={handleLogout}
                >
                  Log Out
                </GlassButton>
              </div>
            </div>
          </GlassCard>
          
          <div className="flex-1 grid grid-cols-1 gap-6">
            <GlassCard className="animate-fade-in" style={{animationDelay: "100ms"}}>
              <h2 className="font-semibold mb-4 flex items-center">
                <Calendar size={18} className="mr-2 text-primary" />
                Activity Summary
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 glass rounded-lg">
                  <p className="text-xs text-gray-600">Total Habits</p>
                  <p className="text-xl font-bold">{totalHabits}</p>
                </div>
                <div className="p-3 glass rounded-lg">
                  <p className="text-xs text-gray-600">Active Days</p>
                  <p className="text-xl font-bold">{activeDays}</p>
                </div>
                <div className="p-3 glass rounded-lg">
                  <p className="text-xs text-gray-600">Completions</p>
                  <p className="text-xl font-bold">{totalCompletions}</p>
                </div>
                <div className="p-3 glass rounded-lg">
                  <p className="text-xs text-gray-600">Best Streak</p>
                  <p className="text-xl font-bold">{longestStreak} days</p>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="animate-fade-in" style={{animationDelay: "200ms"}}>
              <h2 className="font-semibold mb-4 flex items-center">
                <Award size={18} className="mr-2 text-amber-500" />
                Achievements
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 glass rounded-lg ${totalCompletions >= 50 ? 'bg-gradient-to-br from-amber-300 to-amber-100' : 'opacity-60'}`}>
                  <p className="text-sm font-medium">50 Completions</p>
                  {totalCompletions >= 50 ? (
                    <p className="text-xs mt-1 text-amber-800">Unlocked!</p>
                  ) : (
                    <p className="text-xs mt-1">{totalCompletions}/50 done</p>
                  )}
                </div>
                
                <div className={`p-3 glass rounded-lg ${longestStreak >= 7 ? 'bg-gradient-to-br from-amber-300 to-amber-100' : 'opacity-60'}`}>
                  <p className="text-sm font-medium">7-Day Streak</p>
                  {longestStreak >= 7 ? (
                    <p className="text-xs mt-1 text-amber-800">Unlocked!</p>
                  ) : (
                    <p className="text-xs mt-1">Best: {longestStreak}/7 days</p>
                  )}
                </div>
                
                <div className={`p-3 glass rounded-lg opacity-60`}>
                  <p className="text-sm font-medium">30-Day Streak</p>
                  <p className="text-xs mt-1">Best: {longestStreak}/30 days</p>
                </div>
                
                <div className={`p-3 glass rounded-lg ${totalHabits >= 5 ? 'bg-gradient-to-br from-amber-300 to-amber-100' : 'opacity-60'}`}>
                  <p className="text-sm font-medium">5 Habits</p>
                  {totalHabits >= 5 ? (
                    <p className="text-xs mt-1 text-amber-800">Unlocked!</p>
                  ) : (
                    <p className="text-xs mt-1">{totalHabits}/5 habits</p>
                  )}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
