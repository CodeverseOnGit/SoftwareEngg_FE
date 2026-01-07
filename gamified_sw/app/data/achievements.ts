export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (state: AchievementState) => boolean;
};

export type AchievementState = {
  totalXP: number;
  lessonsCompleted: number;
  quizzesCompleted: number;
  level: number;
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
];
