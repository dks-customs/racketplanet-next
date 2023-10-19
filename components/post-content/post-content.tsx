import "./post-content.scss";

type PostContentProps = {
  content: string;
  small?: boolean;
};

export default function PostContent({
  content,
  small = false,
}: PostContentProps) {
  return (
    <main
      className={`post-content${small ? " small" : ""}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
