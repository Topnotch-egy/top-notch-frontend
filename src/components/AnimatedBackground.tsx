"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedBackground() {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mounted, setMounted] = useState(false);

  // Only render on the client — avoids SSR hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Play/pause based on reduced-motion preference
  useEffect(() => {
    if (!mounted) return;
    const video = videoRef.current;
    if (!video) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const tryPlay = () => {
      if (!mq.matches) void video.play().catch(() => {});
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplaythrough", tryPlay);

    const sync = () => {
      if (mq.matches) video.pause();
      else void video.play().catch(() => {});
    };
    mq.addEventListener("change", sync);

    return () => {
      mq.removeEventListener("change", sync);
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplaythrough", tryPlay);
    };
  }, [mounted]);

  // Mouse-following spotlight
  useEffect(() => {
    if (!mounted) return;
    const el = spotlightRef.current;
    if (!el) return;

    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      el.style.setProperty("--mouse-x", `${currentX}px`);
      el.style.setProperty("--mouse-y", `${currentY}px`);
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      {/* Full-screen looping background video */}
      <video
        ref={videoRef}
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

      {/* Overlay — just dark enough for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(7, 9, 15, 0.45)",
        }}
      />

      {/* Mouse-following spotlight */}
      <div ref={spotlightRef} className="absolute inset-0 spotlight" />
    </div>
  );
}
