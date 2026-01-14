"use client";

import { Card, CardContent } from "@/components/ui/card";
import { rarityStyles } from "./rarityStyles";
import type { Achievement } from "@/app/data/achievements";

export default function AchievementCard({
  achievement,
  unlocked,
}: {
  achievement: Achievement;
   unlocked: boolean;
}) {
  return (
    <Card
        className={`
            ${rarityStyles[achievement.rarity]}
            ${unlocked ? "shadow-lg" : "opacity-40"}
        `}
        >
      <CardContent className="space-y-2">
        <span className="text-xs uppercase tracking-wide opacity-80">
        {achievement.rarity}
        </span>
        <h3 className="font-semibold text-lg">
          {achievement.title}
        </h3>

        <p className="text-sm opacity-80">
            {unlocked ? achievement.description : "Locked"}
            </p>
      </CardContent>
    </Card>
  );
}
