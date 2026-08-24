import { ImageResponse } from "next/og";

export const alt = "Genivere | Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 50% 40%, #1a1030 0%, #0a0614 60%, #050309 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 128,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            Genivere
          </div>
          <svg width="72" height="72" viewBox="12 12 8 8">
            <path
              d="M16 12.5 L16.9 15.1 L19.5 16 L16.9 16.9 L16 19.5 L15.1 16.9 L12.5 16 L15.1 15.1 Z"
              fill="#E8CC88"
            />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: 32,
            fontFamily: "Verdana, sans-serif",
            fontWeight: 400,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#A898E8",
          }}
        >
          Software Engineer
        </div>
      </div>
    ),
    { ...size }
  );
}
