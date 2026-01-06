"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

// ---------------- CONTEXT ----------------
type XPContextType = {
  totalXP: number;
  addXP: (amount: number) => void;
  resetXP: () => void;
};

const XPContext = createContext<XPContextType | null>(null);

export function XPProvider({ children }: { children: ReactNode }) {
  const [totalXP, setTotalXP] = useState(0);

  // Load XP from localStorage on mount
  useEffect(() => {
    const savedXP = localStorage.getItem("totalXP");
    if (savedXP) setTotalXP(Number(savedXP));
  }, []);

  // Save XP to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("totalXP", totalXP.toString());
  }, [totalXP]);

  function addXP(amount: number) {
    setTotalXP((xp) => xp + amount);
  }

  function resetXP() {
    setTotalXP(0);
  }

  return (
    <XPContext.Provider value={{ totalXP, addXP, resetXP }}>
      {children}
    </XPContext.Provider>
  );
}

export function useXP() {
  const ctx = useContext(XPContext);
  if (!ctx) throw new Error("useXP must be used inside XPProvider");
  return ctx;
}
