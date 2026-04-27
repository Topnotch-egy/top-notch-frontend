"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, PlayCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { InteractiveVoxel } from "./InteractiveVoxel";
import { PerspectiveStats } from "./PerspectiveStats";

export function Hero() {
  const { t, locale } = useLanguage();

  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] items-center pt-28 pb-16 sm:pt-32 sm:pb-24"
    >
      <div className="container-xl relative z-10 w-full">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-label"
          >
            <Sparkles className="h-3 w-3 text-brand-300" />
            {t.hero.eyebrow}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-display-xl"
          >
            <span className="block text-gradient-brand">
              {t.hero.titleLine1}
            </span>
            <span className="block text-gradient-subtle">
              {t.hero.titleLine2}
            </span>
            <span className="block text-foreground">
              {t.hero.titleLine3}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className={`mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted ${
              locale === "ar" ? "font-arabic" : ""
            }`}
          >
            {t.hero.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4 w-full xs:w-auto"
          >
            <a href="#contact" className="btn-primary">
              {t.hero.ctaPrimary}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#services" className="btn-secondary">
              <PlayCircle className="h-4 w-4 text-brand-300" />
              {t.hero.ctaSecondary}
            </a>
          </motion.div>

          {/* 3D Perspective Cards for Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="w-full"
          >
            <PerspectiveStats stats={t.hero.stats} />
            {/* 
              Client disabled the Voxel component, but kept here for future reference:
              <InteractiveVoxel stats={t.hero.stats} /> 
            */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
