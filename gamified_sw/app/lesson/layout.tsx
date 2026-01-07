import type { ReactNode } from "react";

export default function LessonLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      {children}
    </div>
  );
}
