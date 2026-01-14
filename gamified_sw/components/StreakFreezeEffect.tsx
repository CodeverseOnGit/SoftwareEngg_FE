"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

type Props = {
  show: boolean;
  onDone: () => void;
};

const shards = Array.from({ length: 12 });

export default function StreakFreezeEffect({ show, onDone }: Props) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onDone, 1100);
    return () => clearTimeout(t);
  }, [show, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Frost Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-200/20 via-white/10 to-cyan-300/20 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            {/* Central Ice */}
            <motion.div
              className="text-7xl absolute"
              initial={{ scale: 0.6, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              ❄️
            </motion.div>

            {/* Ice Shards */}
            {shards.map((_, i) => {
              const angle = (360 / shards.length) * i;
              const distance = 120 + Math.random() * 40;

              return (
                <motion.div
                  key={i}
                  className="absolute text-xl"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                  animate={{
                    x: Math.cos((angle * Math.PI) / 180) * distance,
                    y: Math.sin((angle * Math.PI) / 180) * distance,
                    opacity: 0,
                    scale: 1,
                  }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  🧊
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
