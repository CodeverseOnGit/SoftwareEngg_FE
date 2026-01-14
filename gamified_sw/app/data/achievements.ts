export type XPContextActions = {
  setStreakFreeze: React.Dispatch<React.SetStateAction<number>>;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (state: AchievementState) => boolean;
  reward?: (ctx: XPContextActions) => void;
};

export type AchievementState = {
  totalXP: number;
  level: number;
  lessonsCompleted: number;
  quizzesCompleted: number;

  currentStreak: number;
  longestStreak: number;
};

export const achievements: Achievement[] = [
  {
    id: "first_xp",
    title: "First Steps",
    description: "Earn your first XP",
    icon: "👣",
    condition: (s) => s.totalXP > 0,
  },
  {
    id: "first_quiz",
    title: "Quiz Crusher",
    description: "Complete your first quiz",
    icon: "🧠",
    condition: (s) => s.quizzesCompleted >= 1,
  },
  {
    id: "level_2",
    title: "Level Up!",
    description: "Reach Level 2",
    icon: "🚀",
    condition: (s) => s.level >= 2,
  },
  {
    id: "streak-7",
    title: "Consistency",
    description: "Maintain a 7-day learning streak",
    icon: "🔥",
    condition: (s) => s.currentStreak >= 7,
  },
  {
    id: "streak-10",
    title: "Unbreakable",
    description: "Reach a 10-day streak",
    condition: (s) => s.longestStreak >= 10,
    icon: "❄️",
    reward: (ctx) => ctx.setStreakFreeze((f) => f + 1),
  }
];
