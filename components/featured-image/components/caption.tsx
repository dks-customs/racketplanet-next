import { ReactNode } from "react";
import { FeaturedImageAPI } from "../../../graphql/types/featuredImage";

type CaptionProps = {
  caption: FeaturedImageAPI["node"]["atrybucjaAutora"];
};

export default function Caption({ caption }: CaptionProps) {
  const { attachmentAuthor, attachmentUrl, license, licenseUrl } = caption;
  let authorCaption: ReactNode = "";

  if (attachmentAuthor && !attachmentUrl) {
    authorCaption = (
      <span className="featured-image-caption__author">{attachmentAuthor}</span>
    );
  } else if (attachmentAuthor && attachmentUrl) {
    authorCaption = (
      <a href={attachmentUrl} target="_blank">
        {attachmentAuthor}
      </a>
    );
  }

  let licenseCaption: ReactNode = "";

  if (license && !licenseUrl) {
    licenseCaption = (
      <span className="featured-image-caption__license">{license}</span>
    );
  } else if (license && licenseUrl) {
    licenseCaption = (
      <a href={licenseUrl} target="_blank">
        {license}
      </a>
    );
  }

  return (
    <figcaption className="featured-image-caption">
      {authorCaption}
      {authorCaption && licenseCaption ? ", " : null}
      {licenseCaption}
    </figcaption>
  );
}
