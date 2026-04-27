"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, Globe, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export function Navbar() {
  const { t, locale, toggle } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#clients", label: t.nav.clients },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_10px_40px_-20px_rgba(237,28,36,0.25)]"
            : "bg-transparent"
        }`}
      >
        <div className="container-xl flex h-16 sm:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#top"
            className="group flex items-center gap-2 sm:gap-3 rounded-lg px-1.5 py-1 -mx-1.5 transition hover:bg-white/5"
          >
            <span className="relative block h-10 w-28 sm:h-12 sm:w-32 overflow-hidden">
              <Image
                src="/logo.jpg"
                alt="Top Notch"
                fill
                sizes="(max-width: 640px) 112px, 128px"
                className="object-contain object-left"
                priority
              />
            </span>
            <span className="hidden xs:flex flex-col leading-none">
              <span className="font-display text-[13px] sm:text-sm font-bold tracking-tight text-foreground">
                Top Notch
              </span>
              <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
                Marketing Agency
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute inset-0 rounded-full bg-white/0 transition-colors hover:bg-white/[0.04]" />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggle}
              aria-label="Toggle language"
              className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-1/60 px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-brand/50 hover:bg-surface-2"
            >
              <Globe className="h-3.5 w-3.5 text-muted transition-colors group-hover:text-brand-300" />
              <span className="tabular-nums">
                {locale === "en" ? "EN" : "AR"}
              </span>
              <span className="text-subtle">/</span>
              <span className="text-subtle">
                {locale === "en" ? "AR" : "EN"}
              </span>
            </button>

            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs sm:text-sm font-medium text-white transition-all hover:bg-brand-600 active:scale-95 shadow-[0_10px_30px_-12px_rgba(237,28,36,0.7)]"
            >
              {t.nav.cta}
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-1/60 text-foreground transition-colors hover:bg-surface-2"
              aria-label="Open menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative mt-20 mx-5 rounded-2xl glass-strong p-5"
            >
              <div className="flex flex-col divide-y divide-white/[0.05]">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="flex items-center justify-between py-3.5 text-base text-foreground"
                  >
                    <span>{l.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-subtle" />
                  </motion.a>
                ))}
              </div>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-5 w-full"
              >
                {t.nav.cta}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
