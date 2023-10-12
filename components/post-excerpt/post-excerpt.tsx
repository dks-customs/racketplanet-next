import "./post-excerpt.scss";

type PostExcerptTypes = {
  excerpt: string;
};

export default function PostExcerpt({ excerpt }: PostExcerptTypes) {
  if (excerpt) {
    return (
      <div
        className="post-excerpt"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      ></div>
    );
  } else {
    return null;
  }
}
