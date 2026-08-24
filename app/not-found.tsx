"use client";

import { keyframes } from "@emotion/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import notFoundImg from "./images/not-found.webp";
import Ambient from "./components/Ambient";
import ResponsiveMenu from "./components/ResponsiveMenu";
import Footer from "./components/Footer";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); filter: blur(4px); }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0px); }
`;

const coronaPulse = keyframes`
  0%, 100% {
    text-shadow:
      0 0 20px rgba(123,93,184,0.45),
      0 0 60px rgba(123,93,184,0.18);
  }
  50% {
    text-shadow:
      0 0 40px rgba(168,146,216,0.80),
      0 0 100px rgba(123,93,184,0.40),
      0 0 180px rgba(74,50,111,0.30);
  }
`;

const sparkleFloat = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg);   opacity: 0.85; }
  30%       { transform: translate(3px, -4px) rotate(12deg);  opacity: 0.60; }
  65%       { transform: translate(-2px, -6px) rotate(-8deg); opacity: 1;    }
`;

const fairyBob = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-6px); }
`;

const anim = (delay: string) => ({
  animation: `${fadeUp} 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay} forwards`,
  opacity: 0,
  "@media (prefers-reduced-motion: reduce)": { animation: "none", opacity: 1 },
});

const FairyIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden style={{ width: 30, height: 30 }}>
    <ellipse cx="16" cy="21" rx="12" ry="5.5" fill="rgba(187,168,226,0.22)" stroke="rgba(187,168,226,0.55)" strokeWidth="0.7" />
    <ellipse cx="32" cy="21" rx="12" ry="5.5" fill="rgba(187,168,226,0.22)" stroke="rgba(187,168,226,0.55)" strokeWidth="0.7" />
    <ellipse cx="17" cy="27" rx="9" ry="4" fill="rgba(232,196,140,0.14)" stroke="rgba(232,196,140,0.36)" strokeWidth="0.6" />
    <ellipse cx="31" cy="27" rx="9" ry="4" fill="rgba(232,196,140,0.14)" stroke="rgba(232,196,140,0.36)" strokeWidth="0.6" />
    <ellipse cx="24" cy="26" rx="2.2" ry="8" fill="rgba(168,146,216,0.72)" />
    <circle cx="24" cy="15" r="3" fill="rgba(200,184,237,0.85)" />
    <line x1="22.5" y1="12.5" x2="19" y2="8" stroke="rgba(187,168,226,0.52)" strokeWidth="0.8" strokeLinecap="round" />
    <line x1="25.5" y1="12.5" x2="29" y2="8" stroke="rgba(187,168,226,0.52)" strokeWidth="0.8" strokeLinecap="round" />
    <circle cx="19" cy="8" r="1.2" fill="rgba(187,168,226,0.62)" />
    <circle cx="29" cy="8" r="1.2" fill="rgba(187,168,226,0.62)" />
  </svg>
);

export default function NotFound() {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", display: "flex", flexDirection: "column" }}>
      {/* Background image — fixed, no z-index, painted before Ambient so fireflies layer on top */}
      <Box
        aria-hidden
        sx={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url(${notFoundImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.38,
          pointerEvents: "none",
        }}
      />
      {/* Dark vignette — edges fade to deep black so text stays readable */}
      <Box
        aria-hidden
        sx={{
          position: "fixed",
          inset: 0,
          background: [
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(8,5,16,0.15) 0%, rgba(8,5,16,0.72) 100%)",
            "linear-gradient(to bottom, rgba(8,5,16,0.55) 0%, rgba(8,5,16,0.10) 30%, rgba(8,5,16,0.10) 70%, rgba(8,5,16,0.60) 100%)",
          ].join(", "),
          pointerEvents: "none",
        }}
      />

      {/* Ambient fireflies + auras — rendered after bg so they paint on top */}
      <Ambient />
      <ResponsiveMenu />

      <Box
        component="main"
        sx={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: { xs: 8, md: 14 },
          zIndex: 1,
        }}
      >
        <Container
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            maxWidth: "600px !important",
          }}
        >
          {/* Fairy icon — fades up, then bobs */}
          <Box sx={{ ...anim("0.1s"), display: "flex", justifyContent: "center", mb: 3 }}>
            <Box
              sx={{
                animation: `${fairyBob} 3.5s ease-in-out 1s infinite`,
                "@media (prefers-reduced-motion: reduce)": { animation: "none" },
              }}
            >
              <FairyIcon />
            </Box>
          </Box>

          {/* Eyebrow */}
          <Box
            sx={{
              ...anim("0.2s"),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              mb: 2,
            }}
          >
            <Box component="span" aria-hidden sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "primary.light", flexShrink: 0 }} />
            <Typography
              sx={{
                color: "primary.light",
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 600,
                fontSize: { xs: 10, md: 11 },
                letterSpacing: "0.30em",
                textTransform: "uppercase",
              }}
            >
              Page Not Found
            </Typography>
            <Box component="span" aria-hidden sx={{ width: 40, height: "1px", bgcolor: "rgba(168,146,216,0.38)", flexShrink: 0 }} />
          </Box>

          {/* 404 with corona glow + gold sparkle */}
          <Box sx={{ ...anim("0.35s"), position: "relative", display: "inline-block" }}>
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                inset: "-30px -50px",
                background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(74,50,111,0.50) 0%, transparent 68%)",
                filter: "blur(16px)",
                pointerEvents: "none",
              }}
            />
            <Box
              component="span"
              aria-hidden
              sx={{
                position: "absolute",
                top: { xs: "5%", md: "8%" },
                right: { xs: "-2%", md: "-5%" },
                fontSize: { xs: 15, md: 18 },
                color: "#E8C48C",
                lineHeight: 1,
                animation: `${sparkleFloat} 3.5s ease-in-out infinite`,
                "@media (prefers-reduced-motion: reduce)": { animation: "none" },
              }}
            >
              ✦
            </Box>
            <Typography
              component="div"
              sx={{
                fontFamily: "var(--font-cormorant-garamond), serif",
                fontWeight: 700,
                fontSize: { xs: "32vw", sm: "180px", md: "200px" },
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                userSelect: "none",
                color: "transparent",
                WebkitTextStroke: "2px rgba(168,146,216,0.65)",
                position: "relative",
                animation: `${coronaPulse} 4s ease-in-out infinite`,
                "@media (prefers-reduced-motion: reduce)": { animation: "none" },
              }}
            >
              404
            </Typography>
          </Box>

          {/* Dash dividers */}
          <Box
            sx={{
              ...anim("0.5s"),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mt: { xs: 1, md: 2 },
              mb: { xs: 2, md: 3.5 },
            }}
          >
            <Box sx={{ width: 28, height: "1px", bgcolor: "rgba(168,146,216,0.55)" }} />
            <Box sx={{ width: 6, height: "1px", bgcolor: "rgba(168,146,216,0.30)" }} />
            <Box sx={{ width: 44, height: "1px", bgcolor: "rgba(168,146,216,0.18)" }} />
          </Box>

          {/* Heading */}
          <Typography
            variant="h2"
            sx={{
              ...anim("0.65s"),
              fontSize: { xs: "22px", sm: "26px", md: "34px" },
              color: "common.white",
              lineHeight: 1.3,
              mb: { xs: 1, md: 1.5 },
            }}
          >
            Looks like you&apos;ve wandered<br />off the path.
          </Typography>

          {/* Subtext */}
          <Typography
            sx={{
              ...anim("0.8s"),
              color: "grey.400",
              fontSize: { xs: 13, md: 15 },
              lineHeight: 1.7,
              mb: { xs: 3, md: 5 },
            }}
          >
            Let&apos;s guide you back through the forest.
          </Typography>

          {/* CTA */}
          <Box sx={{ ...anim("1.0s"), display: "flex", justifyContent: "center" }}>
            <Button
              href="/"
              variant="outlined"
              sx={{
                fontSize: { xs: 11, md: 12 },
                fontWeight: 600,
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                px: 3,
                py: 1.4,
                borderColor: "rgba(180,140,255,0.35)",
                color: "common.white",
                boxShadow: "0 0 20px rgba(180,140,255,0.08)",
                "&:hover": {
                  borderColor: "primary.light",
                  backgroundColor: "rgba(168,146,216,0.08)",
                  boxShadow: "0 0 28px rgba(180,140,255,0.18)",
                  color: "primary.light",
                },
                "& .arrow": { ml: 1.5, transition: "transform 0.3s" },
                "&:hover .arrow": { transform: "translateX(4px)" },
              }}
            >
              Return Home
              <Box component="span" className="arrow" aria-hidden>
                {" "}→
              </Box>
            </Button>
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(8,5,16,0.55)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}
