"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent } from "react";
import { CountUp } from "./CountUp";

interface Stat {
  value: string;
  label: string;
}

function PerspectiveCard({ stat, index }: { stat: Stat; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs create a smooth transition when moving the mouse
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse percentage (-0.5 to 0.5) to rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    // Reset back to center when mouse leaves
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
        rotateX: [0, 6, -4, 0],
        rotateY: [0, -6, 4, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 1.5,
      }}
      style={{ transformStyle: "preserve-3d" }}
      className="w-full h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative flex flex-col items-center justify-center p-8 sm:p-12 w-full min-h-[180px] h-full glass-strong rounded-3xl border border-white/[0.08] transition-colors hover:border-brand/30 shadow-2xl"
      >
      {/* 
        This inner div has translateZ, pushing it visually outward towards the user 
        for a true 3D floating effect when the parent rotates.
      */}
      <div 
        style={{ transform: "translateZ(60px)" }} 
        className="flex flex-col items-center justify-center pointer-events-none"
      >
        <CountUp
          value={stat.value}
          className="font-display text-5xl sm:text-6xl font-bold text-gradient-brand shadow-black drop-shadow-lg leading-none"
        />
        <span className="mt-4 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-foreground text-center">
          {stat.label}
        </span>
      </div>
      
      
      {/* Decorative ambient glow that follows hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

export function PerspectiveStats({ stats }: { stats: Stat[] }) {
  return (
    <div 
      className="mt-14 sm:mt-24 w-full grid grid-cols-1 md:grid-cols-3 gap-6"
      style={{ perspective: "1200px" }}
    >
      {stats.map((stat, i) => (
        <PerspectiveCard key={i} stat={stat} index={i} />
      ))}
    </div>
  );
}
