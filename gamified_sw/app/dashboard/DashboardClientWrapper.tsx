// src/app/dashboard/DashboardClientWrapper.tsx
"use client";

import { ReactNode } from "react";
import { useXP } from "@/app/context/XPContext";
import LevelUpModal from "@/components/LevelUpModal";
import AchievementModal from "@/components/AchievementModal";

export default function DashboardClientWrapper({ children }: { children: ReactNode }) {
  const { levelUp, setLevelUp, activeAchievement, setActiveAchievement } = useXP();

  return (
    <>
      {children}

      <LevelUpModal
        open={levelUp !== null}
        level={levelUp ?? 0}
        onClose={() => setLevelUp(null)}
      />

      <AchievementModal
        open={!!activeAchievement}
        achievement={activeAchievement}
        onClose={() => setActiveAchievement(null)}
      />
    </>
  );
}
