"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function Contact() {
  const { t, locale } = useLanguage();

  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "Topnotch.agency03@gmail.com";
  const phone1 = process.env.NEXT_PUBLIC_CONTACT_PHONE_1 || "+201508222122";
  const phone2 = process.env.NEXT_PUBLIC_CONTACT_PHONE_2 || "+966562625379";
  const address = locale === "ar" 
    ? process.env.NEXT_PUBLIC_CONTACT_ADDRESS_AR || "مكتب n1 -1 مصطفي النحاس تقاطع عباس العقاد الرئيسي - مدينة نصر - القاهرة"
    : process.env.NEXT_PUBLIC_CONTACT_ADDRESS_EN || "N1-1 Office, Mostafa El-Nahas intersection with Main Abbas El-Akkad - Nasr City - Cairo";

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-surface-1/80 via-surface/60 to-surface-1/80 p-8 sm:p-12 lg:p-16"
        >
          {/* Decorative bg */}
          <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand/25 blur-[140px]" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-[360px] w-[360px] rounded-full bg-accent/10 blur-[120px]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            }}
          />

          <div className="relative grid gap-10 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3">
              <div className="section-label">{t.contact.label}</div>
              <h2 className="mt-5 font-display text-display-lg">
                {t.contact.title}
                <span className="text-gradient-brand">
                  {t.contact.titleAccent}
                </span>
                {t.contact.titleSuffix}
              </h2>
              <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-muted">
                {t.contact.subtitle}
              </p>

              <div className="mt-8 flex flex-col xs:flex-row items-stretch xs:items-center gap-3">
                <a href={`mailto:${email}`} className="btn-primary">
                  {t.contact.cta}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="#services" className="btn-secondary">
                  {t.contact.secondary}
                </a>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-center gap-3">
              {email && <ContactRow icon={Mail} label={locale === "ar" ? "البريد الإلكتروني" : "Email"} value={email} href={`mailto:${email}`} />}
              {phone1 && <ContactRow icon={Phone} label={locale === "ar" ? "الهاتف ١" : "Phone 1"} value={phone1} href={`tel:${phone1}`} />}
              {phone2 && <ContactRow icon={Phone} label={locale === "ar" ? "الهاتف ٢" : "Phone 2"} value={phone2} href={`tel:${phone2}`} />}
              {address && <ContactRow icon={MapPin} label={locale === "ar" ? "العنوان" : "Address"} value={address} href={`https://maps.google.com/?q=${address}`} />}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-surface-1/40 p-4 transition-all hover:border-brand/40 hover:bg-surface-2/60"
    >
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 ring-1 ring-inset ring-brand/20 transition group-hover:bg-brand/20">
        <Icon className="h-4 w-4 text-brand-300" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-[10px] uppercase tracking-[0.22em] text-subtle">
          {label}
        </span>
        <span className="truncate text-sm font-medium text-foreground">
          {value}
        </span>
      </span>
      <ArrowUpRight className="ms-auto h-4 w-4 text-subtle transition-colors group-hover:text-brand-300" />
    </a>
  );
}
