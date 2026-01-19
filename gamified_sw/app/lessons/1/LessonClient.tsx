"use client";

import { useXP } from "@/app/context/XPContext";

export default function LessonClient({
  lessonId,
}: {
  lessonId: string;
}) {
  const { completeLesson } = useXP();

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100">
      <button
        onClick={() => completeLesson(Number(lessonId))}
        className="px-8 py-4 rounded-xl bg-emerald-500 text-black text-xl font-bold"
      >
        Complete Lesson #{lessonId}
      </button>
    </div>
  );
}
