"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

type Props = {
  level: number;
  open: boolean;
  onClose: () => void;
};

export default function LevelUpModal({ level, open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
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
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-2">Level Up!</h2>
            <p className="text-zinc-400 mb-6">
              You reached <span className="text-white font-semibold">Level {level}</span>
            </p>

            <Button size="lg" className="rounded-xl w-full" onClick={onClose}>
              Continue →
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
