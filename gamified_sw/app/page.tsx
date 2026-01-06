"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-100">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold tracking-tight"
        >
          Learn Software Development<br />Like a Game
        </motion.h1>
        <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
          From zero to real-world systems — with XP, levels, quizzes, and boss fights.
          Built for absolute beginners and CS students.
        </p>
        <div className="mt-10 flex justify-center">
          <Button size="lg" className="rounded-2xl px-8 py-6 text-lg">
            ▶ Start Free
          </Button>
        </div>

        {/* XP BAR */}
        <div className="mt-16 max-w-md mx-auto">
          <div className="text-sm text-zinc-400 mb-2">Level 1 — 120 / 500 XP</div>
          <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "24%" }}
              transition={{ duration: 1 }}
              className="h-full bg-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid gap-6 md:grid-cols-4">
        {["Learn", "Understand", "Quiz", "Level Up"].map((step, i) => (
          <Card key={i} className="bg-zinc-900 border-zinc-800 rounded-2xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-4">{i === 0 ? "📘" : i === 1 ? "🧠" : i === 2 ? "❓" : "⭐"}</div>
              <h3 className="font-semibold text-lg mb-2">{step}</h3>
              <p className="text-sm text-zinc-400">
                {i === 0 && "Simple explanations with real examples."}
                {i === 1 && "Build strong mental models."}
                {i === 2 && "Answer quizzes and get instant feedback."}
                {i === 3 && "Earn XP and unlock new challenges."}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* DIFFERENT */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-10">Why This Is Different</h2>
        <ul className="space-y-4 text-zinc-400 text-center">
          <li>No framework-first nonsense</li>
          <li>First-principles explanations</li>
          <li>Designed like a game, not a textbook</li>
          <li>Free core forever</li>
        </ul>
      </section>

      {/* ROADMAP */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid gap-6 md:grid-cols-4">
        {["Foundations", "Systems", "Architecture", "Production"].map((q, i) => (
          <Card key={i} className="bg-zinc-900 border-zinc-800 rounded-2xl">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">Quarter {i + 1}</h3>
              <p className="text-zinc-400 text-sm">{q}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* FINAL CTA */}
      <section className="text-center py-32">
        <h2 className="text-4xl font-bold mb-6">Start Learning Today</h2>
        <p className="text-zinc-400 mb-10">No pressure. No fluff. Just progress.</p>
        <Button size="lg" className="rounded-2xl px-10 py-6 text-lg">
          ▶ Start Free
        </Button>
      </section>
    </div>
  );
}
