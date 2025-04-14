
import { Habit, User } from './types';

// Helper to get ISO dates for the last n days
const getLastNDays = (n: number): string[] => {
  return Array.from({ length: n }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  });
};

// Generate random completed days for the last 30 days
const generateRandomCompletedDays = (consistency: number): string[] => {
  const days = [];
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Higher consistency means more completed days
    if (Math.random() < consistency) {
      days.push(date.toISOString().split('T')[0]);
    }
  }
  
  return days;
};

export const mockHabits: Habit[] = [
  {
    id: '1',
    name: 'Meditate',
    description: 'Daily mindfulness practice',
    reminderTime: '07:00',
    currentStreak: 7,
    longestStreak: 14,
    completedDays: getLastNDays(7),
    category: 'Wellness',
    createdAt: '2023-01-15',
    completedToday: true
  },
  {
    id: '2',
    name: 'Drink 8 Glasses of Water',
    description: 'Stay hydrated throughout the day',
    reminderTime: '09:00',
    currentStreak: 3,
    longestStreak: 21,
    completedDays: [...getLastNDays(3), ...generateRandomCompletedDays(0.7).slice(3)],
    category: 'Health',
    createdAt: '2023-02-01',
    completedToday: true
  },
  {
    id: '3',
    name: 'Read 10 Pages',
    description: 'Daily reading habit',
    reminderTime: '21:00',
    currentStreak: 0,
    longestStreak: 10,
    completedDays: generateRandomCompletedDays(0.5),
    category: 'Learning',
    createdAt: '2023-03-10',
    completedToday: false
  },
  {
    id: '4',
    name: 'Exercise',
    description: '30 minutes of physical activity',
    reminderTime: '17:00',
    currentStreak: 5,
    longestStreak: 30,
    completedDays: [...getLastNDays(5), ...generateRandomCompletedDays(0.6).slice(5)],
    category: 'Fitness',
    createdAt: '2023-01-05',
    completedToday: true
  },
  {
    id: '5',
    name: 'Journal',
    description: 'Write down thoughts and reflections',
    reminderTime: '22:00',
    currentStreak: 12,
    longestStreak: 25,
    completedDays: [...getLastNDays(12), ...generateRandomCompletedDays(0.8).slice(12)],
    category: 'Mindfulness',
    createdAt: '2023-02-20',
    completedToday: true
  },
  {
    id: '6',
    name: 'Learn Something New',
    description: 'Spend time learning a new skill',
    reminderTime: '19:00',
    currentStreak: 0,
    longestStreak: 7,
    completedDays: generateRandomCompletedDays(0.4),
    category: 'Learning',
    createdAt: '2023-04-01',
    completedToday: false
  }
];

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatarUrl: 'https://i.pravatar.cc/300',
  joinedDate: '2023-01-01'
};

export function getMotivationalPhrase(): string {
  const phrases = [
    "Stay the course!",
    "You're on a roll!",
    "Keep up the momentum!",
    "One day at a time!",
    "Progress, not perfection!",
    "Small steps, big changes!",
    "You've got this!",
    "Consistency is key!",
    "Building greatness daily!",
    "Every day counts!",
  ];
  
  return phrases[Math.floor(Math.random() * phrases.length)];
}
