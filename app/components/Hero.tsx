"use client";

import { useEffect, useRef } from "react";
import { keyframes } from "@emotion/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import fairyBg from "../images/hero-bg-2.png";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(32px); filter: blur(6px); }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0px); }
`;

const twinkle = keyframes`
  0%, 100% { transform: scale(1)    rotate(0deg);   filter: drop-shadow(0 0 0px transparent); }
  25%       { transform: scale(1.18) rotate(12deg);  filter: drop-shadow(0 0 7px rgba(255,220,100,0.75)); }
  50%       { transform: scale(0.92) rotate(0deg);   filter: drop-shadow(0 0 2px rgba(255,220,100,0.3)); }
  75%       { transform: scale(1.12) rotate(-9deg);  filter: drop-shadow(0 0 9px rgba(255,220,100,0.85)); }
`;

const anim = (delay: string) => ({
  animation: `${fadeUp} 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay} forwards`,
  opacity: 0,
  "@media (prefers-reduced-motion: reduce)": { animation: "none", opacity: 1 },
});

const NEUTRAL =
  "radial-gradient(ellipse 70% 80% at 50% 50%, transparent 0%, rgba(8,13,26,0.4) 100%)";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mouseOverlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mouseOverlayRef.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mouseOverlayRef.current.style.background = `radial-gradient(ellipse 70% 80% at ${x}% ${y}%, transparent 0%, rgba(8,13,26,0.4) 100%)`;
  };

  const handleMouseLeave = () => {
    if (mouseOverlayRef.current) mouseOverlayRef.current.style.background = NEUTRAL;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current) return;
      const progress = Math.min(window.scrollY / sectionRef.current.offsetHeight, 1);
      bgRef.current.style.transform = `scale(${1 + progress * 0.08})`;
      bgRef.current.style.opacity = String((1 - progress * 0.4) * 0.9);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        minHeight: { xs: "100svh", md: "100vh" },
        overflow: "hidden",
        backgroundColor: "#0a0614",
      }}
    >
      {/* Background photo */}
      <Box
        ref={bgRef}
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${fairyBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: { xs: "68% center", md: "center" },
          willChange: "transform, opacity",
          transformOrigin: "center center",
          opacity: 0.9,
        }}
      />

      {/* Dark gradient — left-heavy so text stays legible, fairy glows on right */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background: {
            xs: "linear-gradient(180deg, rgba(10,6,20,0.88) 0%, rgba(10,6,20,0.62) 50%, rgba(10,6,20,0.92) 100%)",
            md: "linear-gradient(90deg, rgba(10,6,20,0.97) 0%, rgba(10,6,20,0.88) 26%, rgba(10,6,20,0.28) 56%, rgba(10,6,20,0.02) 100%)",
          },
        }}
      />

      {/* Cursor-tracked radial overlay — desktop only */}
      <Box
        ref={mouseOverlayRef}
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background: NEUTRAL,
          transition: "background 0.18s ease",
          display: { xs: "none", md: "block" },
          pointerEvents: "none",
        }}
      />

      <Container sx={{ position: "relative", zIndex: 2, py: { xs: 12, md: 10 } }}>
        <Box sx={{ maxWidth: { xs: "100%", md: 580 } }}>
          {/* Eyebrow */}
          <Typography
            sx={{
              ...anim("0.35s"),
              color: "primary.light",
              fontWeight: 600,
              fontSize: { xs: 11, md: 12 },
              letterSpacing: "0.30em",
              textTransform: "uppercase",
              mb: 2.5,
            }}
          >
            Hello, I&apos;m Genivere
          </Typography>

          {/* Headline */}
          <Typography
            variant="h1"
            sx={{
              ...anim("0.6s"),
              fontSize: { xs: "44px", sm: "60px", md: "78px" },
              lineHeight: 1.03,
              color: "common.white",
              mb: { xs: 3, md: 4 },
              fontWeight: 700,
            }}
          >
            Building software
            <br />
            with equal parts
            <br />
            <Box component="span" sx={{ color: "primary.light" }}>
              logic
            </Box>
            {" "}and{" "}
            <Box
              component="span"
              sx={{
                fontStyle: "italic",
                fontWeight: 500,
                color: "secondary.light",
              }}
            >
              magic.
            </Box>
            {" "}
            <Box
              component="span"
              sx={{
                display: "inline-block",
                ml: { xs: "2px", md: "4px" },
                fontSize: { xs: "26px", sm: "36px", md: "46px" },
                color: "secondary.light",
                verticalAlign: "middle",
                lineHeight: 1,
                mb: { xs: "6px", md: "10px" },
                animation: `${twinkle} 3.2s ease-in-out 1.8s infinite`,
                "@media (prefers-reduced-motion: reduce)": { animation: "none" },
              }}
            >
              ✦
            </Box>
          </Typography>

          {/* Subtext */}
          <Typography
            sx={{
              ...anim("0.95s"),
              color: "grey.300",
              fontSize: { xs: 15, md: 17 },
              lineHeight: 1.65,
              maxWidth: 460,
              mb: { xs: 4, md: 5 },
            }}
          >
            Junior Software Engineer passionate about turning complex problems
            into elegant, user-friendly solutions that make a real impact.
          </Typography>

          {/* CTAs */}
          <Box
            sx={{
              ...anim("1.2s"),
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: { xs: 3, md: 4 },
              mb: { xs: 5, md: 7 },
            }}
          >
            <Button
              variant="outlined"
              href="#experience"
              startIcon={
                <Box
                  component="svg"
                  viewBox="0 0 16 16"
                  sx={{ width: 13, height: 13 }}
                  aria-hidden
                >
                  <path
                    d="M8 1 C5 1, 3 3.5, 3 6 C3 9, 5.5 10.5, 6 12 L10 12 C10.5 10.5, 13 9, 13 6 C13 3.5, 11 1, 8 1 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <line x1="6" y1="12" x2="6" y2="14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="10" y1="12" x2="10" y2="14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="6.5" y1="14.5" x2="9.5" y2="14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </Box>
              }
              sx={{
                fontSize: { xs: 12, md: 13 },
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                px: 3,
                py: 1.4,
                borderColor: "rgba(168,146,216,0.5)",
                color: "common.white",
                "&:hover": {
                  borderColor: "primary.light",
                  backgroundColor: "rgba(168,146,216,0.08)",
                },
              }}
            >
              View My Work
            </Button>

            <Box
              component="a"
              href="#about"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                color: "grey.200",
                fontSize: { xs: 12, md: 13 },
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                borderBottom: "1px solid",
                borderColor: "rgba(168,146,216,0.3)",
                pb: "3px",
                transition: "color 0.3s, border-color 0.3s",
                textDecoration: "none",
                "&:hover": {
                  color: "primary.light",
                  borderColor: "primary.light",
                },
              }}
            >
              <Box
                component="span"
                sx={{ color: "primary.light", fontSize: { xs: 9, md: 10 }, lineHeight: 1 }}
              >
                ✦
              </Box>
              About Me
            </Box>
          </Box>

          {/* Tech stack icons */}
          <Box
            sx={{
              ...anim("1.5s"),
              display: "flex",
              alignItems: "center",
              gap: { xs: 2, md: 2.5 },
            }}
          >
            {/* Python */}
            <Box
              component="svg"
              viewBox="0 0 28 28"
              sx={{ width: 26, height: 26, opacity: 0.65, "&:hover": { opacity: 1 }, transition: "opacity 0.2s" }}
              aria-label="Python"
            >
              <path d="M14 3.5 C10.5 3.5 8 4.5 8 6.5 L8 10.5 C8 11.5 9 12.5 10 12.5 L14 12.5 L14 14 L8 14 C6.5 14 5 15.5 5 17.5 L5 21.5 C5 23.5 8 24.5 11.5 24.5 L13 24.5 C14 24.5 14 23.5 14 22.5 L14 20.5 C14 19.5 13 19 12 19 L10 19 L10 17.5 C10 16.5 10.5 16 11.5 16 L18 16 C19.5 16 21 14.5 21 13 L21 8 C21 5 18 3.5 14 3.5 Z" fill="#3776AB" />
              <path d="M14 24.5 C17.5 24.5 20 23.5 20 21.5 L20 17.5 C20 16.5 19 15.5 18 15.5 L14 15.5 L14 14 L20 14 C21.5 14 23 12.5 23 10.5 L23 6.5 C23 4.5 20 3.5 16.5 3.5 L15 3.5 C14 3.5 14 4.5 14 5.5 L14 7.5 C14 8.5 15 9 16 9 L18 9 L18 10.5 C18 11.5 17.5 12 16.5 12 L10 12 C8.5 12 7 13.5 7 15 L7 20 C7 23 10 24.5 14 24.5 Z" fill="#FFD43B" />
              <circle cx="11.5" cy="7" r="1.2" fill="white" opacity="0.9" />
              <circle cx="16.5" cy="21" r="1.2" fill="white" opacity="0.9" />
            </Box>

            {/* HTML & CSS */}
            <Box
              component="svg"
              viewBox="0 0 28 28"
              sx={{ width: 26, height: 26, opacity: 0.65, "&:hover": { opacity: 1 }, transition: "opacity 0.2s" }}
              aria-label="HTML & CSS"
            >
              <text x="2" y="13" fontFamily="monospace" fontSize="8.5" fontWeight="bold" fill="#E34F26">&lt;/&gt;</text>
              <text x="3" y="23" fontFamily="monospace" fontSize="7.5" fontWeight="bold" fill="#264DE4">CSS</text>
            </Box>

            {/* Git */}
            <Box
              component="svg"
              viewBox="0 0 28 28"
              sx={{ width: 26, height: 26, opacity: 0.65, "&:hover": { opacity: 1 }, transition: "opacity 0.2s" }}
              aria-label="Git"
            >
              <circle cx="7" cy="21" r="3" fill="none" stroke="#F05032" strokeWidth="1.5" />
              <circle cx="21" cy="7" r="3" fill="none" stroke="#F05032" strokeWidth="1.5" />
              <circle cx="21" cy="17" r="3" fill="none" stroke="#F05032" strokeWidth="1.5" />
              <line x1="7" y1="18" x2="7" y2="10" stroke="#F05032" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M7 10 C7 7, 21 7, 21 10 L21 14" fill="none" stroke="#F05032" strokeWidth="1.5" strokeLinecap="round" />
            </Box>

            {/* GitHub */}
            <Box
              component="svg"
              viewBox="0 0 28 28"
              sx={{ width: 26, height: 26, opacity: 0.65, "&:hover": { opacity: 1 }, transition: "opacity 0.2s" }}
              aria-label="GitHub"
            >
              <path
                d="M14 2.8C7.92 2.8 3 7.73 3 13.82c0 4.9 3.17 9.06 7.58 10.53.55.1.75-.24.75-.54v-1.9c-3.08.67-3.73-1.48-3.73-1.48-.5-1.28-1.23-1.62-1.23-1.62-1-.69.08-.67.08-.67 1.11.08 1.7 1.14 1.7 1.14.98 1.69 2.58 1.2 3.21.92.1-.72.39-1.2.71-1.48-2.46-.28-5.04-1.23-5.04-5.48 0-1.21.43-2.2 1.14-2.97-.11-.28-.5-1.41.11-2.93 0 0 .93-.3 3.05 1.14a10.6 10.6 0 012.78-.37c.94.01 1.89.13 2.78.37 2.11-1.44 3.04-1.14 3.04-1.14.61 1.52.23 2.65.11 2.93.71.77 1.14 1.76 1.14 2.97 0 4.26-2.59 5.2-5.06 5.47.4.34.75 1.02.75 2.05 0 1.48-.01 2.68-.01 3.04 0 .3.2.64.76.53C21.84 22.87 25 18.71 25 13.82 25 7.73 20.08 2.8 14 2.8z"
                fill="rgba(230,237,243,0.88)"
              />
            </Box>

            {/* Linux */}
            <Box
              component="svg"
              viewBox="0 0 28 28"
              sx={{ width: 26, height: 26, opacity: 0.65, "&:hover": { opacity: 1 }, transition: "opacity 0.2s" }}
              aria-label="Linux"
            >
              {/* Tux body */}
              <ellipse cx="14" cy="16" rx="7" ry="8.5" fill="rgba(230,237,243,0.88)" />
              {/* Tux belly */}
              <ellipse cx="14" cy="18" rx="4" ry="5.5" fill="#F5C842" opacity="0.85" />
              {/* Tux head */}
              <ellipse cx="14" cy="6.5" rx="5" ry="4.5" fill="rgba(230,237,243,0.88)" />
              {/* Eyes */}
              <circle cx="12" cy="5.5" r="1" fill="#111" />
              <circle cx="16" cy="5.5" r="1" fill="#111" />
              {/* Beak */}
              <ellipse cx="14" cy="8" rx="1.8" ry="1" fill="#F5C842" opacity="0.9" />
            </Box>

            {/* Flask */}
            <Box
              component="svg"
              viewBox="0 0 28 28"
              sx={{ width: 26, height: 26, opacity: 0.65, "&:hover": { opacity: 1 }, transition: "opacity 0.2s" }}
              aria-label="Flask"
            >
              {/* Flask neck */}
              <rect x="11" y="3" width="6" height="7" rx="1" fill="none" stroke="rgba(230,237,243,0.88)" strokeWidth="1.4" />
              {/* Flask body */}
              <path d="M11 10 L5 22 C5 24, 7 25, 14 25 C21 25, 23 24, 23 22 L17 10 Z" fill="none" stroke="rgba(230,237,243,0.88)" strokeWidth="1.4" strokeLinejoin="round" />
              {/* Liquid */}
              <path d="M8 19 C8 21, 10 22.5, 14 22.5 C18 22.5, 20 21, 20 19 Z" fill="rgba(168,146,216,0.5)" />
              {/* Bubbles */}
              <circle cx="12" cy="17" r="1" fill="rgba(168,146,216,0.6)" />
              <circle cx="16" cy="15.5" r="0.7" fill="rgba(168,146,216,0.5)" />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
