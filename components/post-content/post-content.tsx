import "./post-content.scss";

type PostContentProps = {
  content: string;
};

export default function PostContent({ content }: PostContentProps) {
  return (
    <main
      className="post-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
