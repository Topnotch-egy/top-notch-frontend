"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { PhysicsClients } from "./PhysicsClients";

export function Clients() {
  const { t } = useLanguage();
  const names = t.clients.names;

  const half = Math.ceil(names.length / 2);
  const row1 = names.slice(0, half);
  const row2 = names.slice(half);

  return (
    <section id="clients" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="container-xl">
        <div className="max-w-3xl">
          <div className="section-label">{t.clients.label}</div>
          <h2 className="mt-5 font-display text-display-lg">
            {t.clients.title}
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted">
            {t.clients.subtitle}
          </p>
        </div>
      </div>

      {/* Gravity Sandbox */}
      <div className="container-xl mt-12 sm:mt-16">
        <PhysicsClients names={t.clients.names} interactionHint={t.clients.interactionHint} />
      </div>

      {/* Static grid on very small screens feels crowded; keep marquee. Add bottom stats */}
      <div className="container-xl mt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl bg-white/[0.06]"
        >
          {[
            { v: "19+", l: t.clients.label },
            { v: "9", l: t.services.label },
            { v: "100%", l: "★" },
            { v: "24/7", l: "Support" },
          ].map((s) => (
            <div
              key={s.l + s.v}
              className="flex flex-col items-center justify-center gap-1 bg-background/60 backdrop-blur-sm px-4 py-6 sm:py-8"
            >
              <span className="font-display text-2xl sm:text-3xl font-semibold text-gradient-brand tabular-nums">
                {s.v}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-subtle">
                {s.l}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Marquee({ items, reverse }: { items: readonly string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="group relative overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

      <div
        className={`flex w-max items-center gap-3 sm:gap-4 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
      >
        {doubled.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="group/chip flex shrink-0 items-center gap-2 rounded-full border border-white/[0.06] bg-surface-1/60 px-4 py-2.5 sm:px-6 sm:py-3 transition-all duration-300 hover:border-brand/40 hover:bg-surface-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400/70 transition-all duration-300 group-hover/chip:scale-150 group-hover/chip:bg-brand" />
            <span className="whitespace-nowrap text-sm sm:text-base font-medium text-foreground/90">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
