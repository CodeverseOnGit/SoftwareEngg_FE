// src/app/dashboard/layout.tsx
import type { ReactNode } from "react";
import DashboardClientWrapper from "./DashboardClientWrapper";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-100 px-6 py-20">
      <DashboardClientWrapper>{children}</DashboardClientWrapper>
    </div>
  );
}
