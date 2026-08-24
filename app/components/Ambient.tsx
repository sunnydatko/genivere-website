"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Decorative sprig SVG --------------------------------------------------- */
const BotanicalSprig = ({
  style,
  className,
}: {
  style?: CSSProperties;
  className?: string;
}) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 60 220"
    fill="none"
    stroke="rgba(168,146,216,0.40)"
    strokeWidth={1.1}
    strokeLinecap="round"
    aria-hidden
  >
    <path d="M30 220 C 30 150, 30 110, 30 40" />
    <path d="M30 168 C 14 158, 8 168, 6 180" />
    <path d="M30 150 C 46 140, 52 150, 54 162" />
    <path d="M30 128 C 16 120, 10 128, 8 140" />
    {[40, 52, 64, 76, 88, 100].map((y, i) => (
      <g key={y} transform={`translate(0 ${y})`}>
        <circle cx={30} cy={0} r={i < 2 ? 2.6 : 2.2} fill="rgba(168,146,216,0.25)" />
        <line x1={30} y1={-3} x2={24} y2={-7} />
        <line x1={30} y1={-3} x2={36} y2={-7} />
      </g>
    ))}
  </svg>
);

/* Gradient auras + parallax scroll --------------------------------------- */
const GradientAura = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(0, ${window.scrollY * 0.06}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="ambient-layer" aria-hidden>
      <div ref={ref} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
        <div className="ambient-aura violet" />
        <div className="ambient-aura violet-muted" />
        <div className="ambient-aura violet-deep" />
        <div className="ambient-aura amber" />
        <div className="ambient-aura cyan" />
        <BotanicalSprig
          className="sway"
          style={{ position: "absolute", bottom: -10, left: "3vw", width: 90, height: 240, opacity: 0.12 }}
        />
        <BotanicalSprig
          className="sway sway-slow"
          style={{
            position: "absolute",
            bottom: -10,
            right: "4vw",
            width: 80,
            height: 220,
            opacity: 0.1,
            transform: "scaleX(-1)",
          }}
        />
      </div>
    </div>
  );
};

/* Firefly field (canvas) ------------------------------------------------- */
type Firefly = {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  phase: number;   // pulse phase offset
  speed: number;   // pulse speed
  type: "warm" | "cool" | "blue";   // amber / lavender / teal
};

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = prefersReducedMotion();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let flies: Firefly[] = [];
    let raf = 0;
    let frame = 0;

    const count = () => {
      const base = Math.round((window.innerWidth * window.innerHeight) / 40000);
      return Math.max(18, Math.min(38, base));
    };

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      flies = Array.from({ length: count() }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.14,
        r: Math.random() * 1.4 + 1.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.012 + 0.006,
        type: Math.random() < 0.25 ? "warm" : Math.random() < 0.2 ? "blue" : "cool",
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const f of flies) {
        if (!reduced) {
          f.x += f.vx;
          f.y += f.vy;
          if (f.x < -30) f.x = width + 30;
          if (f.x > width + 30) f.x = -30;
          if (f.y < -30) f.y = height + 30;
          if (f.y > height + 30) f.y = -30;
          f.phase += f.speed;
        }
        const pulse = (Math.sin(f.phase) + 1) / 2;        // 0..1
        const alpha = 0.06 + pulse * 0.14;
        const glowR = f.r * (1.2 + pulse * 0.6);

        // soft outer glow
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, glowR * 3.5);
        if (f.type === "warm") {
          grad.addColorStop(0, `rgba(232,196,140,${(alpha * 0.7).toFixed(3)})`);
          grad.addColorStop(1, "rgba(232,196,140,0)");
        } else if (f.type === "blue") {
          grad.addColorStop(0, `rgba(74,155,232,${(alpha * 0.65).toFixed(3)})`);
          grad.addColorStop(1, "rgba(74,155,232,0)");
        } else {
          grad.addColorStop(0, `rgba(200,184,237,${(alpha * 0.6).toFixed(3)})`);
          grad.addColorStop(1, "rgba(187,168,226,0)");
        }
        ctx.beginPath();
        ctx.arc(f.x, f.y, glowR * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // bright core
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = f.type === "warm"
          ? `rgba(245,218,168,${alpha.toFixed(3)})`
          : f.type === "blue"
          ? `rgba(100,180,240,${alpha.toFixed(3)})`
          : `rgba(220,210,245,${alpha.toFixed(3)})`;
        ctx.fill();
      }
      frame++;
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    init();
    if (reduced) draw();
    else loop();

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(init, 200);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-particles" aria-hidden />;
};

/* Cursor sparkle trail --------------------------------------------------- */
const SPARKLE_CHARS = ["✦", "✦", "·", "∗"];

const CursorSparkle = () => {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (prefersReducedMotion()) return;

    let lastSpawn = 0;

    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastSpawn < 160) return;
      lastSpawn = now;

      const el = document.createElement("span");
      el.textContent = SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)];
      const size = Math.random() * 4 + 6;
      const offsetX = (Math.random() - 0.5) * 14;
      const duration = (Math.random() * 0.2 + 0.5).toFixed(2);
      const color = Math.random() > 0.75
        ? "rgba(232,196,140,0.45)"
        : "rgba(187,168,226,0.55)";
      el.style.cssText = [
        "position:fixed",
        `left:${e.clientX + offsetX}px`,
        `top:${e.clientY}px`,
        `font-size:${size}px`,
        `color:${color}`,
        "pointer-events:none",
        "user-select:none",
        "z-index:9998",
        `animation:cursorSparkleRise ${duration}s ease-out forwards`,
      ].join(";");
      document.body.appendChild(el);
      el.addEventListener("animationend", () => el.remove(), { once: true });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return null;
};

/* Cursor glow ------------------------------------------------------------ */
const CursorGlow = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      el.style.opacity = "1";
    };
    const loop = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <div ref={ref} className="ambient-cursor-glow" style={{ opacity: 0 }} aria-hidden />;
};

/* Root ------------------------------------------------------------------- */
export default function Ambient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <GradientAura />
      <ParticleField />
      <CursorGlow />
      <CursorSparkle />
      <div className="ambient-noise" aria-hidden />
    </>
  );
}
