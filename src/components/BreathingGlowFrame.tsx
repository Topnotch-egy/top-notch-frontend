"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type BreathingGlowFrameProps = {
  children: ReactNode;
  glowColor?: string;
  radius?: number | string;
  className?: string;
};

export function BreathingGlowFrame({
  children,
  glowColor = "#ff2d2d",
  radius = 32,
  className = "",
}: BreathingGlowFrameProps) {
  // Determine outer radius dynamically whether a string or number was passed
  const outerRadius = typeof radius === "number" ? radius + 10 : `calc(${radius} + 10px)`;

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ borderRadius: radius }}
    >
      {/* Sharp Inner Border */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          borderRadius: radius,
          border: `1px solid ${glowColor}`,
          boxShadow: `0 0 12px ${glowColor}`,
        }}
        animate={{
          opacity: [0.45, 0.9, 0.45],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Soft Outer Aura */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-0"
        style={{
          inset: -10, // Creates the outer padding for the aura
          borderRadius: outerRadius,
          boxShadow: `
            0 0 30px ${glowColor},
            0 0 60px ${glowColor},
            0 0 90px ${glowColor}
          `,
          opacity: 0.35,
        }}
        animate={{
          opacity: [0.18, 0.42, 0.18],
          scale: [0.99, 1.01, 0.99],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Foreground Content Wrapper */}
      <div
        className="relative z-10 w-full h-full"
        style={{ borderRadius: radius }}
      >
        {children}
      </div>
    </div>
  );
}
