import { Metadata } from "next";
import { WEBSITE_TITLE } from "../constants/constants";

type MetadataInfo = {
  url: string;
  titleFollowUp: string;
  description?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  imageUrl: string;
  imageAlt: string;
  twitterCard: "summary" | "summary_large_image";
  ogType?: "article" | "website";
  showOgDescription?: boolean;
};

export default function getMetadata({
  url,
  titleFollowUp,
  description,
  author,
  publishedTime,
  modifiedTime,
  imageUrl,
  imageAlt,
  twitterCard,
  ogType = "website",
  showOgDescription = true,
}: MetadataInfo): Metadata {
  const title = `${WEBSITE_TITLE} - ${titleFollowUp}`;
  const images =
    imageUrl && imageAlt
      ? [
          {
            url: imageUrl,
            alt: imageAlt,
          },
        ]
      : undefined;

  return {
    title,
    description: description ? description : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: description && showOgDescription ? description : undefined,
      url,
      siteName: WEBSITE_TITLE,
      images,
      locale: "pl_PL",
      type: ogType,
      authors: author ? [author] : undefined,
      publishedTime: publishedTime ? publishedTime : undefined,
    },
    twitter: {
      title,
      description: description ? description : undefined,
      card: twitterCard,
      images,
    },
  };
}
