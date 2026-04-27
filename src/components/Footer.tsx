"use client";

import Image from "next/image";
import { Instagram, Linkedin, Facebook, ArrowUp } from "lucide-react";

function XLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor"
      stroke="none"
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zM16.083 19.77h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const exploreLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#clients", label: t.nav.clients },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="relative mt-16 border-t border-white/[0.06] bg-surface/40 backdrop-blur-md">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      <div className="container-xl py-16 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <a href="#top" className="inline-flex items-center gap-3">
              <span className="relative block h-14 w-36 sm:h-16 sm:w-48 overflow-hidden">
                <Image
                  src="/logo.jpg"
                  alt="Top Notch"
                  fill
                  sizes="(max-width: 640px) 144px, 192px"
                  className="object-contain object-left"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-bold text-foreground">
                  Top Notch
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-muted">
                  Marketing Agency
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm sm:text-base leading-relaxed text-muted">
              {t.footer.tagline}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { Icon: Instagram, href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM, label: "Instagram" },
                { Icon: Linkedin, href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN, label: "LinkedIn" },
                { Icon: Facebook, href: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK, label: "Facebook" },
                { Icon: XLogo, href: process.env.NEXT_PUBLIC_SOCIAL_X, label: "X" },
              ].map(({ Icon, href, label }) => (
                href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.06] bg-surface-1/60 text-muted transition-all hover:border-brand/40 hover:bg-surface-2 hover:text-brand-300"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ) : null
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.22em] text-subtle">
              {t.footer.columns.explore}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-brand-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-4">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.22em] text-subtle">
              {t.footer.columns.services}
            </h4>
            <ul className="mt-4 grid grid-cols-1 gap-2.5">
              {t.services.items.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    className="text-sm text-foreground/80 transition-colors hover:text-brand-300"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] pt-6">
          <p className="text-xs text-subtle text-center sm:text-start">
            © {year} {t.footer.copyright}
          </p>
          <div className="flex items-center gap-5">
            <span className="text-xs font-medium tracking-wide text-brand-300">
              {t.footer.builtWith}
            </span>
            <a
              href="#top"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.06] bg-surface-1/60 text-muted transition-all hover:border-brand/40 hover:text-brand-300"
              aria-label="Back to top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
