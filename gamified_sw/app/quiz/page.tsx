"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useXP } from "../context/XPContext";


// ------------------ TYPES ------------------
type Question = {
  question: string;
  options: string[];
  correctIndex: number;
};

// ------------------ DATA ------------------
const QUESTIONS: Question[] = [
  {
    question: "What is a variable?",
    options: [
      "A fixed value",
      "A named memory location",
      "A function",
      "A compiler instruction",
    ],
    correctIndex: 1,
  },
  {
    question: "What happens when you reassign a variable?",
    options: [
      "A new variable is created",
      "The old value is deleted",
      "The same memory location is updated",
      "The program restarts",
    ],
    correctIndex: 2,
  },
  {
    question: "Why are variables useful?",
    options: [
      "They make code run faster",
      "They allow data to change",
      "They remove memory",
      "They compile programs",
    ],
    correctIndex: 1,
  },
];

// ------------------ CONFIG ------------------
const XP_PER_CORRECT = 25;
const QUIZ_BONUS = 25;

export default function QuizEngine() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = QUESTIONS[current];

  function submitAnswer() {
    if (selected === question.correctIndex) {
      setScore((s) => s + XP_PER_CORRECT);
    }

    if (current + 1 < QUESTIONS.length) {
      setTimeout(() => {
        setCurrent((c) => c + 1);
        setSelected(null);
      }, 600);
    } else {
      setTimeout(() => setCompleted(true), 600);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-100 px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-zinc-900 border-zinc-800 rounded-2xl">
          <CardContent className="p-8 space-y-6">

            {!completed ? (
              <>
                {/* PROGRESS */}
                <div className="text-sm text-zinc-400">
                  Question {current + 1} of {QUESTIONS.length}
                </div>

                {/* QUESTION */}
                <h2 className="text-2xl font-semibold">
                  {question.question}
                </h2>

                {/* OPTIONS */}
                <div className="space-y-3">
                  {question.options.map((opt, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className={`w-full justify-start ${
                        selected === i ? "border-emerald-500" : ""
                      }`}
                      onClick={() => setSelected(i)}
                    >
                      {opt}
                    </Button>
                  ))}
                </div>

                {/* ACTION */}
                <div className="text-right">
                  <Button
                    disabled={selected === null}
                    onClick={submitAnswer}
                  >
                    Submit
                  </Button>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
              >
                <h2 className="text-3xl font-bold">Quiz Complete 🎉</h2>
                <p className="text-zinc-400">
                  You earned <span className="text-emerald-400 font-semibold">{score} XP</span>
                </p>

                {/* XP BAR */}
                <div className="space-y-2">
                  <div className="text-sm text-zinc-400">Level 1 — {170 + score} / 500 XP</div>
                  <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "34%" }}
                      animate={{ width: `${((170 + score) / 500) * 100}%` }}
                      transition={{ duration: 1 }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                </div>

                <Button size="lg">Continue →</Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}