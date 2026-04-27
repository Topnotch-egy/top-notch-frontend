"use client";

import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

type CountUpProps = {
  /** A display value like "19+", "100%", "24/7" — the first numeric run is animated. */
  value: string;
  duration?: number;
  className?: string;
};

/**
 * Parse a display value into [prefix, number, suffix].
 * Examples:
 *   "19+"   -> ["", 19, "+"]
 *   "100%"  -> ["", 100, "%"]
 *   "+19"   -> ["+", 19, ""]
 *   "24/7"  -> ["", 24, "/7"]   (first numeric run only)
 *   "9"     -> ["", 9, ""]
 */
function parseValue(v: string): { prefix: string; num: number; suffix: string } {
  const m = v.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return { prefix: v, num: 0, suffix: "" };
  return { prefix: m[1] ?? "", num: Number(m[2]), suffix: m[3] ?? "" };
}

export function CountUp({ value, duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const { prefix, num, suffix } = parseValue(value);
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (latest) =>
    Number.isInteger(num) ? Math.round(latest).toString() : latest.toFixed(1)
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, num, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, num, duration, mv]);

  useEffect(() => {
    const el = ref.current?.querySelector<HTMLSpanElement>(
      "[data-count-target]"
    );
    if (!el) return;
    const unsub = rounded.on("change", (v) => {
      el.textContent = v;
    });
    return () => unsub();
  }, [rounded]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span data-count-target className="tabular-nums">
        0
      </span>
      {suffix}
    </span>
  );
}
