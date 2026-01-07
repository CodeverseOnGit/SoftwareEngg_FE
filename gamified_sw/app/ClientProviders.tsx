"use client";

import { XPProvider, useXP } from "./context/XPContext";
import LevelUpModal from "@/components/LevelUpModal";
import AchievementModal from "@/components/AchievementModal";

function LevelUpWatcher() {
  const { levelUp, setLevelUp } = useXP();

  return (
    <LevelUpModal
      open={levelUp !== null}
      level={levelUp ?? 0}
      onClose={() => setLevelUp(null)}
    />
  );
}

function AchievementWatcher() {
  const { activeAchievement, setActiveAchievement } = useXP();

  return (
    <AchievementModal
      open={!!activeAchievement}
      achievement={activeAchievement}
      onClose={() => setActiveAchievement(null)}
    />
  );
}

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <XPProvider>
      {children}
      <LevelUpWatcher />
      <AchievementWatcher />
    </XPProvider>
  );
}
