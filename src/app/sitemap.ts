import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://synthetic-push.vercel.app";

  const routes = [
    "",
    "/about",
    "/contact",
    "/features",
    "/pricing",
    "/privacy-policy",
    "/terms-of-use",
    "/refund-return-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return routes;
}
