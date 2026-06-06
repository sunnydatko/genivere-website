export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#020817",
        zIndex: 9999,
      }}
    >
      <div className="orion-loader" aria-hidden="true">
        <div className="orion-track" />
        <div className="orion-arc" />
        <svg
          className="orion-sparkle"
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z"
            fill="rgba(147, 197, 253, 0.65)"
          />
        </svg>
      </div>
      <span
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        Loading
      </span>
      <style>{`
        .orion-loader {
          position: relative;
          width: 160px;
          height: 160px;
        }
        .orion-track {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px solid rgba(59, 130, 246, 0.12);
        }
        .orion-arc {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: conic-gradient(
            from 270deg,
            transparent 0%,
            rgba(59, 130, 246, 0.08) 25%,
            rgba(59, 130, 246, 0.4) 60%,
            rgba(147, 197, 253, 0.85) 82%,
            rgba(255, 255, 255, 0.95) 93%,
            transparent 100%
          );
          -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #000 0);
          mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #000 0);
          animation: orionSpin 2s linear infinite;
        }
        .orion-sparkle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.7;
        }
        @keyframes orionSpin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .orion-arc { animation: none; }
        }
      `}</style>
    </div>
  );
}
