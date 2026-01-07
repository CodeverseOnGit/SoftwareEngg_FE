"use client";

import { lessons } from "../data/lessons";
import { useXP, getLevelFromXP } from "../context/XPContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LessonsPage() {
  const { totalXP } = useXP();
  const level = getLevelFromXP(totalXP);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-20">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Lessons</h1>

        {lessons.map((lesson) => {
          const unlocked = level >= lesson.levelRequired;

          return (
            <Card key={lesson.id} className="bg-zinc-900 border-zinc-800 rounded-2xl">
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{lesson.title}</h2>
                  <p className="text-sm text-zinc-400">
                    Level {lesson.levelRequired} • {lesson.duration}
                  </p>
                </div>

                {unlocked ? (
                  <Button>Start</Button>
                ) : (
                  <span className="text-zinc-500 text-sm">🔒 Locked</span>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
