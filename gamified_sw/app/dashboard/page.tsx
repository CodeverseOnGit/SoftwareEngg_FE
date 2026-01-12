"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useXP, progressToNextLevel } from "@/app/context/XPContext"; 

export default function DashboardPage() {
  const { totalXP, currentStreak, longestStreak } = useXP();
  const progress = progressToNextLevel(totalXP);


  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-100 px-6 py-20">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold">Your Journey</h1>
            <p className="text-zinc-400">Level {progress.level} • Beginner Engineer</p>
          </div>
          <Button size="lg" className="rounded-2xl">
            Continue Learning →
          </Button>
        </header>

        {/* XP CARD */}
        <Card className="bg-zinc-900 border-zinc-800 rounded-2xl">
          <CardContent className="p-8 space-y-4">
            <div className="flex justify-between text-sm text-zinc-400">
              <span>Level {progress.level}</span>
              <span>{progress.currentXP} / {progress.neededXP} XP</span>
            </div>
            <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress.progressPercent}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-emerald-500"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 rounded-2xl">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-zinc-400 text-sm">Daily Streak</p>
              <h3 className="text-3xl font-bold">{currentStreak} 🔥</h3>
              <p className="text-xs text-zinc-500">Best: {longestStreak}</p>
            </div>
            <div className="text-4xl">🔥</div>
          </CardContent>
        </Card>


        {/* CURRENT FOCUS */}
        <Card className="bg-zinc-900 border-zinc-800 rounded-2xl">
          <CardContent className="p-8 space-y-2">
            <h2 className="text-2xl font-semibold">Current Focus</h2>
            <p className="text-zinc-400">Quarter 1 • Foundations</p>
            <p className="text-zinc-400">Lesson: Variables & Memory</p>
          </CardContent>
        </Card>

        {/* QUARTERS */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Your Roadmap</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {['Foundations', 'Systems', 'Architecture', 'Production'].map((q, i) => (
              <Card key={i} className="bg-zinc-900 border-zinc-800 rounded-2xl">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-lg font-semibold">Quarter {i + 1}</h3>
                  <p className="text-zinc-400 text-sm">{q}</p>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: i === 0 ? '40%' : '0%' }}
                      transition={{ duration: 1 }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Achievements</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {['First Variable', 'First Quiz Passed', 'Level 1 Reached'].map((a, i) => (
              <Card key={i} className="bg-zinc-900 border-zinc-800 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <p className="text-zinc-400 text-sm">{a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
