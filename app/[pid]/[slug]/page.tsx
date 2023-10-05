import { Metadata } from "next";
import PostAuthor from "../../../components/post-author/post-author";
import PostCategories from "../../../components/post-categories/post-categories";
import PostComments from "../../../components/post-comments/post-comments";
import PostContent from "../../../components/post-content/post-content";
import PostDate from "../../../components/post-date/post-date";
import PostSports from "../../../components/post-sports/post-sports";
import PostTags from "../../../components/post-tags/post-tags";
import getAllPostsMeta from "../../../graphql/getAllPostsMeta";
import getPost from "../../../graphql/getPost";
import NotFound from "../../not-found";
import "./post.scss";
import pageMetadata from "../../../util/pageMetadata";
import notFoundMetadata from "../../../util/notFoundMetadata";

type PostProps = {
  params: {
    pid: string;
    slug: string;
  };
};

export default async function Post({ params }: PostProps) {
  const post = await getPost(params.pid);

  if (post && post.slug === params.slug) {
    return (
      <main className="post layout-container">
        <article>
          <header>
            <PostSports sports={post.sports.nodes} />
            <h1>{post.title}</h1>
            <PostCategories categories={post.categories.nodes} />
            {/* FEATURED IMAGE */}
            <PostAuthor
              name={post.author.node.name}
              slug={post.author.node.slug}
            />
            <PostDate date={post.date} />
          </header>
          <PostContent content={post.content} />
          <footer>
            <PostTags tags={post.tags.nodes} />
            <PostComments id={post.id} title={post.title} />
          </footer>
        </article>
        {/* SEE MORE */}
      </main>
    );
  } else {
    return <NotFound />;
  }
}

export async function generateStaticParams() {
  const allPostsMeta = await getAllPostsMeta();

  return allPostsMeta.map((postMeta) => ({
    pid: postMeta.postId.toString(),
    slug: postMeta.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPost(params.pid);
  const url = `${params.pid}/${params.slug}`;

  if (post && post.slug === params.slug) {
    return pageMetadata({
      url,
      titleFollowUp: post.title,
      twitterCard: "summary_large_image",
      description: post.excerpt,
      ogType: "article",
    });
  } else {
    return notFoundMetadata(url);
  }
}
