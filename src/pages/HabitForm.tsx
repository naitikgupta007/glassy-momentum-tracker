
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Clock, BookText, Tag } from 'lucide-react';
import GlassButton from '@/components/GlassButton';
import GlassCard from '@/components/GlassCard';
import { mockHabits } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const HabitForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const isEditing = id !== undefined;
  const existingHabit = isEditing ? mockHabits.find(h => h.id === id) : undefined;
  
  const [formData, setFormData] = useState({
    name: existingHabit?.name || '',
    description: existingHabit?.description || '',
    reminderTime: existingHabit?.reminderTime || '',
    category: existingHabit?.category || 'Wellness'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessCheck, setShowSuccessCheck] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessCheck(true);
      
      toast({
        title: isEditing ? "Habit updated" : "New habit created",
        description: isEditing 
          ? `"${formData.name}" has been updated successfully.` 
          : `"${formData.name}" has been added to your habits.`,
        className: "glass border-white/30"
      });
      
      // Navigate after showing check animation
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }, 800);
  };
  
  const categories = [
    'Wellness', 'Fitness', 'Learning', 'Work', 'Personal', 'Health', 'Mindfulness'
  ];
  
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to={isEditing ? `/habit/${id}` : '/'}>
            <GlassButton 
              icon={<ArrowLeft size={16} />}
              variant="ghost"
              size="sm"
            >
              Back
            </GlassButton>
          </Link>
        </div>
        
        <GlassCard className="animate-fade-in">
          <h1 className="text-2xl font-bold mb-6">
            {isEditing ? 'Edit Habit' : 'Create New Habit'}
          </h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-gray-700 mb-2 font-medium">
                Habit Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full glass-input focus:animate-pulse-glow"
                placeholder="e.g., Read 10 Pages"
              />
            </div>
            
            <div className="mb-5">
              <label className="block text-gray-700 mb-2 font-medium">
                <div className="flex items-center gap-2">
                  <BookText size={16} />
                  <span>Description (Optional)</span>
                </div>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full glass-input min-h-[100px] focus:animate-pulse-glow"
                placeholder="e.g., Read at least 10 pages of any book every day"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>Reminder Time (Optional)</span>
                  </div>
                </label>
                <input
                  type="time"
                  name="reminderTime"
                  value={formData.reminderTime}
                  onChange={handleChange}
                  className="w-full glass-input focus:animate-pulse-glow"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  <div className="flex items-center gap-2">
                    <Tag size={16} />
                    <span>Category</span>
                  </div>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full glass-input focus:animate-pulse-glow"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <GlassButton
                type="submit"
                variant="primary"
                className={cn(
                  "min-w-[120px] relative",
                  isSubmitting && "opacity-80"
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                ) : showSuccessCheck ? (
                  <div className="flex items-center">
                    <svg 
                      className="animate-rotate-check" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M16.6666 5L7.49998 14.1667L3.33331 10" 
                        stroke="white" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>
                    <span className="ml-2">Saved!</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Save size={18} className="mr-2" />
                    <span>Save</span>
                  </div>
                )}
              </GlassButton>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default HabitForm;
