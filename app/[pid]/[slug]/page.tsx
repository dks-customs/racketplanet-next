import "./post.scss";

type PostProps = {
  params: {
    wpId: number;
    slug: string;
  };
};

export default async function Post({ params }: PostProps) {
  return <main className="single layout-container">Post</main>;
}
