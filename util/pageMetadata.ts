import { Metadata } from "next";
import { WEBSITE_TITLE } from "../constants/constants";

type MetadataInfo = {
  url: string;
  titleFollowUp: string;
  titleFirst?: boolean;
  description?: string;
  author?: string;
  publishedTime?: string;
  imageUrl?: string;
  imageAlt?: string;
  twitterCard: "summary" | "summary_large_image";
  ogType?: "article" | "website";
  showOgDescription?: boolean;
};

export default function pageMetadata({
  url,
  titleFollowUp,
  description,
  author,
  publishedTime,
  imageUrl,
  imageAlt,
  twitterCard,
  ogType = "website",
  showOgDescription = true,
  titleFirst = false,
}: MetadataInfo): Metadata {
  const title = titleFirst
    ? `${WEBSITE_TITLE} - ${titleFollowUp}`
    : `${titleFollowUp} - ${WEBSITE_TITLE}`;
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
