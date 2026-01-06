"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LessonPage() {
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);

  function answer(isCorrect: boolean) {
    setAnswered(true);
    setCorrect(isCorrect);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-100 px-6 py-20">
      <div className="max-w-3xl mx-auto space-y-16">

        {/* HEADER */}
        <header className="space-y-2">
          <h1 className="text-4xl font-bold">Variables & Memory</h1>
          <p className="text-zinc-400">Quarter 1 • Foundations</p>
        </header>

        {/* THEORY */}
        <Card className="bg-zinc-900 border-zinc-800 rounded-2xl">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-2xl font-semibold">What is a Variable?</h2>
            <p className="text-zinc-400">
              A variable is a named location in memory that stores a value.
              When you write code, you are mostly telling the computer how to
              move and change values in memory.
            </p>
            <pre className="bg-zinc-950 p-4 rounded-xl text-sm overflow-x-auto">
{`int x = 10;
x = 20;`}
            </pre>
            <p className="text-zinc-400">
              The variable <strong>x</strong> points to a memory location.
              Changing its value does not create a new variable — it updates
              the existing memory slot.
            </p>
          </CardContent>
        </Card>

        {/* MENTAL MODEL */}
        <Card className="bg-zinc-900 border-zinc-800 rounded-2xl">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-2xl font-semibold">Mental Model</h2>
            <p className="text-zinc-400">
              Think of memory like labeled boxes. A variable is the label.
              The value inside the box can change, but the label stays the same.
            </p>
          </CardContent>
        </Card>

        {/* QUIZ */}
        <Card className="bg-zinc-900 border-zinc-800 rounded-2xl">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-2xl font-semibold">Quick Quiz</h2>
            <p className="text-zinc-400">
              What happens in memory when you reassign a variable?
            </p>

            {!answered && (
              <div className="space-y-3">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => answer(false)}
                >
                  A new memory location is created
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => answer(true)}
                >
                  The existing memory location is updated
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => answer(false)}
                >
                  The variable name changes
                </Button>
              </div>
            )}

            {answered && correct && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-emerald-500/10 text-emerald-400"
              >
                ✅ Correct! You earned 50 XP
              </motion.div>
            )}

            {answered && correct === false && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-500/10 text-red-400"
              >
                ❌ Not quite. Think about what changes — the label or the value?
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* XP BAR */}
        {answered && correct && (
          <div className="space-y-2">
            <div className="text-sm text-zinc-400">Level 1 — 170 / 500 XP</div>
            <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "24%" }}
                animate={{ width: "34%" }}
                transition={{ duration: 1 }}
                className="h-full bg-emerald-500"
              />
            </div>
          </div>
        )}

        {/* NEXT */}
        <div className="text-right">
          <Button size="lg" disabled={!correct}>
            Next Lesson →
          </Button>
        </div>
      </div>
    </div>
  );
}
