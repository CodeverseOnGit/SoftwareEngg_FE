"use client";

import { createContext, useContext, useState, ReactNode } from "react";

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
};

const XPContext = createContext<XPContextType | null>(null);

export function XPProvider({ children }: { children: ReactNode }) {
  const [totalXP, setTotalXP] = useState(170);

  function addXP(amount: number) {
    setTotalXP((xp) => xp + amount);
  }

  return (
    <XPContext.Provider value={{ totalXP, addXP }}>
      {children}
    </XPContext.Provider>
  );
}

export function useXP() {
  const ctx = useContext(XPContext);
  if (!ctx) throw new Error("useXP must be used inside XPProvider");
  return ctx;
}
