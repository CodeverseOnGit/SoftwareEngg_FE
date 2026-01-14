"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { achievements } from "../data/achievements";
import { RARITY_XP } from "../data/achievementRarity";

// ---------------- XP LOGIC ----------------
export function xpForLevel(level: number) {
  return 100 * level + 50 * level * level;
}

export function getLevelFromXP(totalXP: number) {
  let level = 1;
  while (totalXP >= xpForLevel(level)) level++;
  return level - 1;
}

export function progressToNextLevel(totalXP: number) {
  const level = getLevelFromXP(totalXP);
  const currentLevelXP = xpForLevel(level);
  const nextLevelXP = xpForLevel(level + 1);

  return {
    level,
    currentXP: totalXP - currentLevelXP,
    neededXP: nextLevelXP - currentLevelXP,
    progressPercent:
      ((totalXP - currentLevelXP) /
        (nextLevelXP - currentLevelXP)) *
      100,
  };
}


// ---------------- CONTEXT TYPE ----------------
type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: keyof typeof RARITY_XP;
  condition: (state: AchievementState) => boolean;
  reward?: (ctx: { setStreakFreeze: React.Dispatch<React.SetStateAction<number>> }) => void;
};

type AchievementState = {
  totalXP: number;
  lessonsCompleted: number;
  quizzesCompleted: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
};

type XPContextType = {
  totalXP: number;
  addXP: (amount: number) => void;
  resetXP: () => void;

  levelUp: number | null;
  setLevelUp: (lvl: number | null) => void;

  currentStreak: number;
  longestStreak: number;

  completeLesson: () => void;
  completeQuiz: () => void;

  activeAchievement: Achievement | null;
  setActiveAchievement: (a: Achievement | null) => void;

  streakFreeze: number;
  buyStreakFreeze: () => boolean;
};

const XPContext = createContext<XPContextType | null>(null);

// ---------------- PROVIDER ----------------
export function XPProvider({ children }: { children: ReactNode }) {
  const prevLevelRef = useRef(1);

  const [totalXP, setTotalXP] = useState(0);
  const [levelUp, setLevelUp] = useState<number | null>(null);

  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [quizzesCompleted, setQuizzesCompleted] = useState(0);

  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [lastActiveDate, setLastActiveDate] = useState<string | null>(null);

  const [streakFreeze, setStreakFreeze] = useState(1);

  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [activeAchievement, setActiveAchievement] =
    useState<Achievement | null>(null);

  // ---------------- LOAD ----------------
  useEffect(() => {
    const savedXP = localStorage.getItem("totalXP");
    if (savedXP) setTotalXP(Number(savedXP));

    const savedAchievements = localStorage.getItem("achievements");
    if (savedAchievements) setUnlocked(JSON.parse(savedAchievements));

    const savedStreak = localStorage.getItem("streak");
    if (savedStreak) {
      const s = JSON.parse(savedStreak);
      setCurrentStreak(s.currentStreak);
      setLongestStreak(s.longestStreak);
      setLastActiveDate(s.lastActiveDate);
    }

    const savedFreeze = localStorage.getItem("streakFreeze");
    if (savedFreeze) setStreakFreeze(Number(savedFreeze));
  }, []);

  // ---------------- SAVE ----------------
  useEffect(() => {
    localStorage.setItem("totalXP", totalXP.toString());

    const level = getLevelFromXP(totalXP);
    if (level > prevLevelRef.current) {
      setLevelUp(level);
      prevLevelRef.current = level;
    }
  }, [totalXP]);

  useEffect(() => {
    localStorage.setItem("achievements", JSON.stringify(unlocked));
  }, [unlocked]);

  useEffect(() => {
    localStorage.setItem(
      "streak",
      JSON.stringify({ currentStreak, longestStreak, lastActiveDate })
    );
  }, [currentStreak, longestStreak, lastActiveDate]);

  useEffect(() => {
    localStorage.setItem("streakFreeze", streakFreeze.toString());
  }, [streakFreeze]);

  // ---------------- STREAK LOGIC ----------------
  function updateDailyStreak() {
    const today = new Date().toISOString().slice(0, 10);

    if (!lastActiveDate) {
      setCurrentStreak(1);
      setLongestStreak(1);
    } else {
      const diff =
        (new Date(today).getTime() -
          new Date(lastActiveDate).getTime()) /
        86400000;

      if (diff === 1) {
        setCurrentStreak((s) => {
          const next = s + 1;
          setLongestStreak((l) => Math.max(l, next));
          return next;
        });
      } else if (diff > 1) {
        if (streakFreeze > 0) {
          setStreakFreeze((f) => f - 1);
          setCurrentStreak(1);
        } else {
          setCurrentStreak(1);
        }
      }
    }

    setLastActiveDate(today);
  }

  // ---------------- XP ----------------
  function addXP(amount: number) {
    const bonus = currentStreak >= 5 ? 10 : 0;
    setTotalXP((xp) => xp + amount + bonus);
  }

  // ---------------- ACHIEVEMENTS ----------------
  useEffect(() => {
    const state: AchievementState = {
      totalXP,
      lessonsCompleted,
      quizzesCompleted,
      level: getLevelFromXP(totalXP),
      currentStreak,
      longestStreak,
    };

    achievements.forEach((a) => {
      if (!unlocked.includes(a.id) && a.condition(state)) {
        setUnlocked((u) => [...u, a.id]);
        setActiveAchievement(a);
        addXP(RARITY_XP[a.rarity]);
        a.reward?.({ setStreakFreeze });
      }
    });
  }, [totalXP, lessonsCompleted, quizzesCompleted, currentStreak]);

  useEffect(() => {
    if (!activeAchievement) return;
    const t = setTimeout(() => setActiveAchievement(null), 2500);
    return () => clearTimeout(t);
  }, [activeAchievement]);

  // ---------------- ACTIONS ----------------
  function completeLesson() {
    setLessonsCompleted((v) => v + 1);
    updateDailyStreak();
  }

  function completeQuiz() {
    setQuizzesCompleted((v) => v + 1);
    updateDailyStreak();
  }

  function resetXP() {
    setTotalXP(0);
  }

  const STREAK_FREEZE_COST = 200;
  function buyStreakFreeze() {
    if (totalXP < STREAK_FREEZE_COST || streakFreeze >= 5) return false;
    setTotalXP((xp) => xp - STREAK_FREEZE_COST);
    setStreakFreeze((f) => f + 1);
    return true;
  }

  return (
    <XPContext.Provider
      value={{
        totalXP,
        addXP,
        resetXP,

        levelUp,
        setLevelUp,

        currentStreak,
        longestStreak,

        completeLesson,
        completeQuiz,

        activeAchievement,
        setActiveAchievement,

        streakFreeze,
        buyStreakFreeze,
      }}
    >
      {children}
    </XPContext.Provider>
  );
}

// ---------------- HOOK ----------------
export function useXP() {
  const ctx = useContext(XPContext);
  if (!ctx) throw new Error("useXP must be used inside XPProvider");
  return ctx;
}
