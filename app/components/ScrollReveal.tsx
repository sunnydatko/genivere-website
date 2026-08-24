"use client";

import { useEffect } from "react";

// iOS Safari's IntersectionObserver doesn't reliably fire during momentum
// scrolling (or on initial load) — entries only flush once scrolling fully
// settles. Checking bounding rects directly on scroll/resize sidesteps that.
export default function ScrollReveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pending = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    if (reduced) {
      pending.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const check = () => {
      const vh = window.innerHeight;
      pending = pending.filter((el) => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < vh - 40 && rect.bottom > 0;
        if (inView) el.classList.add("is-visible");
        return !inView;
      });
      if (pending.length === 0) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        check();
        ticking = false;
      });
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
