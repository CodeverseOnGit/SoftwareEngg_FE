"use client";

import { motion } from "framer-motion";
import { achievements } from "@/app/data/achievements";
import AchievementCard from "@/components/AchievementCard";

export default function AchievementGalleryPage() {
  const unlockedIds = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("achievements") || "[]"
      : "[]"
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-100 px-6 py-20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* HEADER */}
        <header className="space-y-2">
          <h1 className="text-4xl font-bold">Achievements</h1>
          <p className="text-zinc-400">
            Unlock badges as you progress through your engineering journey.
          </p>
        </header>

        {/* GRID */}
        <section className="grid gap-6 md:grid-cols-3">
          {achievements.map((a, i) => {
            const unlocked = unlockedIds.includes(a.id);

            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <AchievementCard
                achievement={a}
                unlocked={unlocked}
              />
              </motion.div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
