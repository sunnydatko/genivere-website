import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Genivere | Software Engineer",
    short_name: "Genivere",
    description:
      "Portfolio of Genivere, a junior software engineer turning complex problems into elegant, user-friendly solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#080510",
    theme_color: "#080510",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
