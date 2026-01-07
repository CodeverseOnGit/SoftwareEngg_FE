"use client";

import { ReactNode } from "react";
import { useXP } from "@/app/context/XPContext";
import AchievementModal from "@/components/AchievementModal";
import LevelUpModal from "@/components/LevelUpModal";

export default function AchievementsClientWrapper({ children }: { children: ReactNode }) {
  const { activeAchievement, setActiveAchievement, levelUp, setLevelUp } = useXP();

  return (
    <>
      {children}

      {/* Level-up modal */}
      <LevelUpModal
        open={levelUp !== null}
        level={levelUp ?? 0}
        onClose={() => setLevelUp(null)}
      />

      {/* Achievement modal */}
      <AchievementModal
        open={!!activeAchievement}
        achievement={activeAchievement}
        onClose={() => setActiveAchievement(null)}
      />
    </>
  );
}
