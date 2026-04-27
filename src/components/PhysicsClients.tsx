"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

export function PhysicsClients({ names, interactionHint }: { names: readonly string[]; interactionHint: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || elementsRef.current.length === 0) return;

    const container = containerRef.current;
    
    // Engine setup
    const engine = Matter.Engine.create();
    const world = engine.world;

    // Get exact container dimensions for the boundaries
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Static Walls setup
    const wallOptions = { 
      isStatic: true, 
      render: { visible: false } 
    };
    
    // Floor, Left Wall, Right Wall (extra thick to prevent fast-moving objects from breaking out)
    const thickness = 200;
    const floor = Matter.Bodies.rectangle(width / 2, height + thickness / 2, width * 2, thickness, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 2, wallOptions);

    Matter.World.add(world, [floor, leftWall, rightWall]);

    // Create dynamic pill bodies based on the actual rendered widths in the DOM
    const bodies: Matter.Body[] = [];

    elementsRef.current.forEach((el, index) => {
      if (!el) return;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      
      // Random X so they don't drop in a vertical line
      const x = (Math.random() * (width - w)) + (w / 2);
      // Stagger the Y drops so they rain down sequentially
      const y = -150 - (index * 60);

      const body = Matter.Bodies.rectangle(x, y, w, h, {
        restitution: 0.6, // Bouncy
        friction: 0.1,    // A little slippery
        chamfer: { radius: h / 2 }, // Pill shape physically maps to CSS rounded-full
      });
      
      bodies.push(body);
    });

    Matter.World.add(world, bodies);

    // Mouse constraint so users can grab and toss pills
    const mouse = Matter.Mouse.create(container);
    
    // Crucial for UX: we don't want the physics engine to highjack the page scroll wheel
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    mouse.element.removeEventListener('wheel', mouse.mousewheel);

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Matter.World.add(world, mouseConstraint);

    // Start physics simulation
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Synchronization Loop
    let animationFrameId: number;
    const updateLoop = () => {
      bodies.forEach((body, i) => {
        const el = elementsRef.current[i];
        if (el) {
          const { x, y } = body.position;
          // Offset translation by element's center coordinate
          const w = el.offsetWidth;
          const h = el.offsetHeight;
          el.style.transform = `translate(${x - w / 2}px, ${y - h / 2}px) rotate(${body.angle}rad)`;
        }
      });
      animationFrameId = requestAnimationFrame(updateLoop);
    };
    updateLoop();

    // Resize handler (adjust floor & right wall distances dynamically)
    const handleResize = () => {
       const cw = container.clientWidth;
       const ch = container.clientHeight;
       Matter.Body.setPosition(floor, { x: cw / 2, y: ch + thickness / 2 });
       Matter.Body.setPosition(rightWall, { x: cw + thickness / 2, y: ch / 2 });
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount (essential for React Strict Mode)
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      Matter.Runner.stop(runner);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
    };
  }, []); 

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[500px] sm:h-[600px] overflow-hidden rounded-3xl bg-white/[0.02] border border-white/[0.05]"
    >
      {/* Aesthetic background hint */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <span className="font-display text-3xl sm:text-5xl font-bold tracking-[0.15em] uppercase text-muted text-center max-w-[80%]">
          {interactionHint}
        </span>
      </div>

      {names.map((name, i) => (
        <div
          key={i}
          ref={(el) => {
            elementsRef.current[i] = el;
          }}
          className="absolute top-0 left-0 flex items-center gap-2 rounded-full border border-white/[0.06] bg-surface-1/60 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-3 cursor-grab active:cursor-grabbing hover:border-brand/40 shadow-lg select-none transition-colors"
          style={{ willChange: "transform" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-400/70" />
          <span className="whitespace-nowrap text-sm sm:text-base font-medium text-foreground/90">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}
