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
      ((totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100,
  };
}

// ---------------- CONTEXT TYPE ----------------
type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
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
};

const XPContext = createContext<XPContextType | null>(null);

// ---------------- PROVIDER ----------------
export function XPProvider({ children }: { children: ReactNode }) {

  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [lastActiveDate, setLastActiveDate] = useState<string | null>(null);

  const [totalXP, setTotalXP] = useState(0);
  const [levelUp, setLevelUp] = useState<number | null>(null);
  const prevLevelRef = useRef(1);

  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [quizzesCompleted, setQuizzesCompleted] = useState(0);

  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [activeAchievement, setActiveAchievement] =
    useState<Achievement | null>(null);

  // Load XP
  useEffect(() => {
    const savedXP = localStorage.getItem("totalXP");
    if (savedXP) setTotalXP(Number(savedXP));

    const savedAchievements = localStorage.getItem("achievements");
    if (savedAchievements) setUnlocked(JSON.parse(savedAchievements));
  }, []);

  // Save XP
  useEffect(() => {
    localStorage.setItem("totalXP", totalXP.toString());

    const currentLevel = getLevelFromXP(totalXP);
    if (currentLevel > prevLevelRef.current) {
      setLevelUp(currentLevel);
      prevLevelRef.current = currentLevel;
    }
  }, [totalXP]);

  // Save achievements
  useEffect(() => {
    localStorage.setItem("achievements", JSON.stringify(unlocked));
  }, [unlocked]);

  // Achievement detection
  useEffect(() => {
    const state = {
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
      }
    });
  }, [totalXP, lessonsCompleted, quizzesCompleted]);

  useEffect(() => {
  const saved = localStorage.getItem("streak");
  if (saved) {
    const s = JSON.parse(saved);
    setCurrentStreak(s.currentStreak);
    setLongestStreak(s.longestStreak);
    setLastActiveDate(s.lastActiveDate);
  }
  }, []);


  useEffect(() => {
  localStorage.setItem(
    "streak",
    JSON.stringify({ currentStreak, longestStreak, lastActiveDate })
  );
  }, [currentStreak, longestStreak, lastActiveDate]);

  function updateStreak() {
  const today = new Date().toISOString().split("T")[0];

  if (lastActiveDate === today) return;

  const yesterday = new Date(Date.now() - 86400000)
    .toISOString()
    .split("T")[0];

  if (lastActiveDate === yesterday) {
    setCurrentStreak((s) => s + 1);
  } else {
    setCurrentStreak(1);
  }

  setLongestStreak((l) => Math.max(l, currentStreak + 1));
  setLastActiveDate(today);
  }


  function addXP(amount: number) {
  const streakBonus = currentStreak >= 5 ? 10 : 0;
  setTotalXP((xp) => xp + amount + streakBonus);
}


  function resetXP() {
    setTotalXP(0);
  }

  function completeLesson() {
    setLessonsCompleted((v) => v + 1);
  }

  function breakStreak() {
    setCurrentStreak(0);
  }

  function completeQuiz() {
    setQuizzesCompleted((v) => v + 1);

    setCurrentStreak((s) => {
      const next = s + 1;
      setLongestStreak((l) => Math.max(l, next));
      return next;
    });
  }


  return (
  <XPContext.Provider value={{
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
  }}>

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
