"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  BarChart3,
  Palette,
  Film,
  Megaphone,
  Target,
  FileText,
  Search,
  Headset,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  BarChart3,
  Palette,
  Film,
  Megaphone,
  Target,
  FileText,
  Search,
  Headset,
};

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="container-xl">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="section-label">{t.services.label}</div>
          <h2 className="mt-5 font-display text-display-lg">
            {t.services.title}
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted">
            {t.services.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 sm:mt-16 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Briefcase;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
                className="group relative overflow-hidden rounded-2xl glass p-6 sm:p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand/40"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-brand/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                {/* Corner accent line */}
                <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-brand/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 to-brand/5 ring-1 ring-inset ring-brand/20 transition-all duration-500 group-hover:from-brand/40 group-hover:to-brand/10 group-hover:ring-brand/50">
                      <Icon className="h-5 w-5 text-brand-300 transition-colors group-hover:text-brand-200" />
                    </div>
                    <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-lg sm:text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-muted">
                    {item.body}
                  </p>

                  <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-subtle transition-colors group-hover:text-brand-300">
                    <span className="h-px w-6 bg-current" />
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
