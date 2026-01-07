"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AchievementModal({
  open,
  achievement,
  onClose,
}: {
  open: boolean;
  achievement: any;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && achievement && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 w-full max-w-md text-center space-y-6 shadow-2xl"
            initial={{ scale: 0.7, y: 40, rotate: -5 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.7, y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <motion.div
              className="text-6xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              {achievement.icon}
            </motion.div>

            <h2 className="text-3xl font-bold text-emerald-400">
              Achievement Unlocked!
            </h2>

            <p className="text-xl font-semibold">{achievement.title}</p>
            <p className="text-zinc-400">{achievement.description}</p>

            <Button
              onClick={onClose}
              size="lg"
              className="rounded-2xl mt-4"
            >
              Continue
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
