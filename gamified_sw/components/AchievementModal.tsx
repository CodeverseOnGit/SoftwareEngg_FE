"use client";

import { motion, AnimatePresence } from "framer-motion";

type Achievement = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  open: boolean;
  achievement: Achievement | null;
  onClose: () => void;
};

export default function AchievementModal({
  open,
  achievement,
  onClose,
}: Props) {
  if (!achievement) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl
                     bg-zinc-900 border border-zinc-800 shadow-xl
                     px-6 py-5 pointer-events-none"
        >
          {/* Glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-emerald-400/10 blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />

          <div className="relative flex gap-4 items-start">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6 }}
              className="text-4xl"
            >
              🏆
            </motion.div>

            <div>
              <p className="text-xs text-emerald-400 font-semibold">
                Achievement Unlocked
              </p>
              <h3 className="text-lg font-bold">{achievement.title}</h3>
              <p className="text-sm text-zinc-400">
                {achievement.description}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
