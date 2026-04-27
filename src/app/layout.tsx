import type { Metadata } from "next";
import { Inter, Space_Grotesk, Tajawal } from "next/font/google";
import { LanguageProvider } from "@/lib/language-context";
import { LenisProvider } from "@/components/LenisProvider";
import { BreathingGlowFrame } from "@/components/BreathingGlowFrame";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Top Notch | Marketing Agency",
  description:
    "Top Notch is a full-service marketing agency turning brands into stories that inspire and endure.",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${tajawal.variable} bg-background text-foreground overflow-x-hidden`}
      >
        {/* ── Fixed full-screen video background ── */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src="/hero.mp4"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Semi-transparent overlay for text readability */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(7, 9, 15, 0.55)",
            }}
          />

          {/* 
            Glowing Bounding Box Frame 
            We inset it by 16px (inset-4) so the frame sits visibly inside the corners of the monitor!
          */}
          <div className="absolute inset-4 sm:inset-6 z-10 pointer-events-none">
            <BreathingGlowFrame
              radius={24}
              glowColor="#ff2d2d"
              className="w-full h-full"
            >
              {/* Empty content because this is just an ambient HUD bounding frame */}
            </BreathingGlowFrame>
          </div>
        </div>

        {/* All page content sits above the video (z-index: 1+) */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <LenisProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </LenisProvider>
        </div>
      </body>
    </html>
  );
}
