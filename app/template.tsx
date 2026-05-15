"use client";

import { motion } from "framer-motion";

const luxuryEase = [0.22, 1, 0.36, 1] as const;

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="w-full min-w-0"
      style={{ width: "100%" }}
      initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: luxuryEase }}
    >
      {children}
    </motion.div>
  );
}
