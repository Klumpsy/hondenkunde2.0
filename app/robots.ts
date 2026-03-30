import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.hondenkunde.nl";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/*?*search=",
        "/*?*page=",
        "/*?*tags=",
        "/*?*search=*&*page=",
        "/*?*search=*&*tags=",
        "/*?*page=*&*tags=",
        "/*?*search=*&*page=*&*tags=",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
