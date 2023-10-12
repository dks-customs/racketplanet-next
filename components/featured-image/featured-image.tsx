import { FeaturedImageAPI } from "../../graphql/types/featuredImage";
import Caption from "./components/caption";
import Image from "./components/image";
import "./featured-image.scss";

type FeaturedImageProps = {
  src?: string;
  alt?: string;
  loading?: "eager" | "lazy";
  className?: string;
  caption?: FeaturedImageAPI["node"]["atrybucjaAutora"];
  availableSizes?: {
    name: string;
    sourceUrl: string;
    height: string;
    width: string;
  }[];
  sizes?: string;
};

export default function FeaturedImage({
  src,
  alt,
  loading,
  className,
  caption,
  availableSizes,
  sizes,
}: FeaturedImageProps) {
  let srcset: string = "";

  if (availableSizes) {
    availableSizes.forEach((size, index) => {
      srcset =
        srcset +
        size.sourceUrl +
        " " +
        size.width +
        "w" +
        (index === availableSizes.length - 1 ? "" : ", ");
    });
  }

  if (
    caption &&
    (caption.attachmentAuthor ||
      caption.attachmentUrl ||
      caption.license ||
      caption.licenseUrl)
  ) {
    return (
      <figure>
        <Image
          src={src}
          alt={alt}
          loading={loading}
          srcset={srcset}
          sizes={sizes}
        />
        {caption && <Caption caption={caption} />}
      </figure>
    );
  } else {
    return (
      <Image
        src={src}
        alt={alt}
        loading={loading}
        srcset={srcset}
        sizes={sizes}
      />
    );
  }
}
