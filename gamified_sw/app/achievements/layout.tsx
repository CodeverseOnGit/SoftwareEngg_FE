// src/app/achievements/layout.tsx

import type { ReactNode } from "react";
import AchievementsClientWrapper from "./AchievementsClientWrapper";

export default function AchievementsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-100 px-6 py-20">
      <AchievementsClientWrapper>
        {children}
      </AchievementsClientWrapper>
    </div>
  );
}