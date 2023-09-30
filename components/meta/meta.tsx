import Head from "next/head";
import { WEBSITE_TITLE } from "../../lib/constants";
import stripHtmlTags from "../../helpers/stripHtmlTags";

export type MetaProps = {
  titleFollowUp: string;
  canonical: string;
  twitterCard: "summary" | "summary_large_image";
  publishedTime?: string;
  modifiedTime?: string;
  description?: string;
  author?: string;
  ogType?: "article" | "website";
  ogImage?: string;
  ogImageAlt?: string;
  showOgDescription?: boolean;
};

export default function Meta({
  titleFollowUp,
  publishedTime,
  modifiedTime,
  description,
  author,
  ogType = "website",
  ogImage,
  ogImageAlt,
  showOgDescription = true,
  twitterCard,
  canonical,
}: MetaProps) {
  const title = `${WEBSITE_TITLE} - ${titleFollowUp}`;
  const descriptionContent = description ? stripHtmlTags(description) : "";

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:site_name" content={WEBSITE_TITLE} />
      {description && <meta name="description" content={descriptionContent} />}
      {author && <meta name="author" content={author} />}
      <meta property="og:title" content={title} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      {description && showOgDescription && (
        <meta property="og:description" content={descriptionContent} />
      )}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
      {ogImage && <meta property="twitter:image" content={ogImage} />}
      {ogImageAlt && <meta property="twitter:image:alt" content={ogImageAlt} />}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      {description && (
        <meta property="twitter:description" content={descriptionContent} />
      )}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      <meta name="keywords" content="" />
      <meta charSet="utf-8" />
      <meta property="og:locale" content="pl_PL" />
      <meta httpEquiv="Content-Language" content="pl" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
    </Head>
  );
}
