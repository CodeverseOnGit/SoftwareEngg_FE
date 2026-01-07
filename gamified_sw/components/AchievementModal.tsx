"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  achievement: {
    title: string;
    description: string;
    icon: string;
  } | null;
  onClose: () => void;
};

export default function AchievementModal({ open, achievement, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && achievement && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center max-w-sm w-full"
          >
            <div className="text-5xl mb-4">{achievement.icon}</div>
            <h2 className="text-2xl font-bold mb-2">
              Achievement Unlocked!
            </h2>
            <p className="font-semibold">{achievement.title}</p>
            <p className="text-zinc-400 text-sm mb-6">
              {achievement.description}
            </p>

            <Button size="lg" className="w-full" onClick={onClose}>
              Nice! →
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
