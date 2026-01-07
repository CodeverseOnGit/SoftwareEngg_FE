"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { achievements } from "@/app/data/achievements";

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
                <Card
                  className={`rounded-2xl border-zinc-800 bg-zinc-900 p-6 text-center space-y-4 transition-all ${
                    unlocked
                      ? "shadow-lg shadow-emerald-500/20"
                      : "opacity-40"
                  }`}
                >
                  <CardContent className="space-y-3">
                    <div className="text-5xl">{a.icon}</div>
                    <h3 className="text-xl font-semibold">{a.title}</h3>
                    <p className="text-sm text-zinc-400">
                      {unlocked ? a.description : "Locked"}
                    </p>
                    {!unlocked && (
                      <p className="text-xs text-zinc-500">Keep learning!</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
