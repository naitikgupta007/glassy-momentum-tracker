
export interface Habit {
  id: string;
  name: string;
  description?: string;
  reminderTime?: string;
  currentStreak: number;
  longestStreak: number;
  completedDays: string[]; // ISO dates
  category?: string;
  createdAt: string;
  completedToday: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  joinedDate: string;
}
