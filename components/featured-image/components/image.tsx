type ImageProps = {
  src?: string;
  alt?: string;
  loading?: "eager" | "lazy";
  srcset?: string;
  sizes?: string;
};

export default function Image({
  src,
  alt,
  loading,
  srcset,
  sizes,
}: ImageProps) {
  return (
    <div className="featured-image-wrapper">
      <img
        className="featured-image"
        src={src}
        alt={alt}
        loading={loading}
        srcSet={srcset}
        sizes={sizes}
      ></img>
    </div>
  );
}
