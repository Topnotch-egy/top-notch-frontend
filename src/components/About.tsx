"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { Binoculars, Compass, Crosshair } from "lucide-react";

export function About() {
  const { t } = useLanguage();
  const icons = [Crosshair, Binoculars, Compass];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left label column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="section-label">{t.about.label}</div>
            <h2 className="mt-6 font-display text-display-lg">
              {t.about.title}
              <span className="text-gradient-brand">{t.about.titleAccent}</span>
              {t.about.titleSuffix}
            </h2>
          </motion.div>

          {/* Right body */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-8 space-y-5 text-base sm:text-lg leading-relaxed text-muted"
          >
            <p>{t.about.body1}</p>
            <p>{t.about.body2}</p>
            <p className="text-foreground">{t.about.body3}</p>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="mt-20 sm:mt-28">
          <div className="flex items-end justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <div className="section-label">{t.pillars.label}</div>
              <h3 className="mt-4 font-display text-display-md">
                {t.pillars.title}
              </h3>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            {t.pillars.items.map((item, i) => {
              const Icon = icons[i];
              return (
              <motion.div
                key={item.tag}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl glass p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-brand/40"
              >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="mt-6 text-[11px] uppercase tracking-[0.22em] text-brand-300">
                    {item.tag}
                  </div>
                  <h4 className="mt-2 font-display text-lg sm:text-xl font-semibold text-foreground">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            )})}
          </div>
        </div>
      </div>
    </section>
  );
}
