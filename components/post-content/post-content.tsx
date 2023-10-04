import "./post-content.scss";

type PostContentProps = {
  content: string;
};

export default function PostContent({ content }: PostContentProps) {
  return <main dangerouslySetInnerHTML={{ __html: content }} />;
}
