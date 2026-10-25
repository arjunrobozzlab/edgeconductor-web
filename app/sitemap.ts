import { MetadataRoute } from "next";

const BASE = "https://edgeconductor.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const industryslugs = [
    "fleet-management",
    "smart-buildings",
    "cold-chain-logistics",
    "industrial-iot",
    "healthcare-assets",
    "education",
    "energy-utilities",
  ];

  return [
    // Core
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/platform`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/get-started`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },

    // Features & solutions
    { url: `${BASE}/solutions`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/solutions/climate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/solutions/tracker`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/solutions/home`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/hardware`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/operations`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },

    // Industries
    { url: `${BASE}/industries`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...industryslugs.map((slug) => ({
      url: `${BASE}/industries/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // Developers & partners
    { url: `${BASE}/developers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/partners`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },

    // Content
    { url: `${BASE}/case-studies`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/demo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },

    // Company
    { url: `${BASE}/company`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },

    // Legal
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/security`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/sla`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
