import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hondenkunde.nl",
    short_name: "Hondenkunde",
    description: "Hondenkunde.nl, het beste voor jouw hond. Blogs, producttests en reistips.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#14446c",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
