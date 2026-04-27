"use client";

import { useAnimationFrame } from "framer-motion";
import { useRef } from "react";
import { CountUp } from "./CountUp";

interface Stat {
  value: string;
  label: string;
}

export function InteractiveVoxel({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useAnimationFrame((t) => {
    if (!ref.current) return;

    // Smooth continuous multi-axis rotation mixed with a gentle float
    const rotateX = Math.sin(t / 6000) * 180 + t / 40;
    const rotateY = t / 30;
    const y = (1 + Math.sin(t / 1000)) * -10;

    ref.current.style.transform = `translateY(${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  // Since we have 3 stats, we duplicate them perfectly to fill the 6 faces of the cube
  const faces = [...stats, ...stats];
  const faceClasses = ["front", "right", "back", "left", "top", "bottom"];

  return (
    <div className="relative mx-auto mt-20 sm:mt-28 flex w-full items-center justify-center pt-10 pb-20">
      <div className="perspective-container">
        <div className="cube" ref={ref}>
          {faceClasses.map((face, index) => (
            <div
              key={face}
              className={`side ${face} glass-strong flex flex-col items-center justify-center p-4 sm:p-6 text-center`}
            >
              <div className="flex flex-col items-center justify-center">
                <CountUp
                  value={faces[index].value}
                  className="font-display text-4xl sm:text-5xl font-bold text-gradient-brand leading-none"
                />
                <span className="mt-3 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-foreground balance-text max-w-[90%]">
                  {faces[index].label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <StyleSheet />
    </div>
  );
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
  return (
    <style>{`
      .perspective-container {
        perspective: 1200px;
        width: 160px;
        height: 160px;
      }
      @media (min-width: 640px) {
        .perspective-container {
          width: 220px;
          height: 220px;
        }
      }

      .cube {
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
      }

      .side {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 20px;
        backface-visibility: hidden;
      }

      /* Base translates for 160px size */
      .front { transform: rotateY(0deg) translateZ(80px); }
      .right { transform: rotateY(90deg) translateZ(80px); }
      .back { transform: rotateY(180deg) translateZ(80px); }
      .left { transform: rotateY(-90deg) translateZ(80px); }
      .top { transform: rotateX(90deg) translateZ(80px); }
      .bottom { transform: rotateX(-90deg) translateZ(80px); }

      /* Responsive translates for 220px size */
      @media (min-width: 640px) {
        .front { transform: rotateY(0deg) translateZ(110px); }
        .right { transform: rotateY(90deg) translateZ(110px); }
        .back { transform: rotateY(180deg) translateZ(110px); }
        .left { transform: rotateY(-90deg) translateZ(110px); }
        .top { transform: rotateX(90deg) translateZ(110px); }
        .bottom { transform: rotateX(-90deg) translateZ(110px); }
      }
    `}</style>
  );
}
