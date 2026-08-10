import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: "Theta Tau",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a1120",
    theme_color: "#0a1120",
  };
}
