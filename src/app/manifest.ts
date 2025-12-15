import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SyntheticPush",
    short_name: "SyntheticPush",
    description: "A developer tool to simulate and understand GitHub commit activity.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#050741",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
