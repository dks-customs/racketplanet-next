import { MetadataRoute } from "next";
import { CANONICAL_BASE } from "../constants/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: CANONICAL_BASE,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
