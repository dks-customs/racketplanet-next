import { Metadata } from "next";
import PostAuthor from "../../../components/post-author/post-author";
import PostComments from "../../../components/post-comments/post-comments";
import PostContent from "../../../components/post-content/post-content";
import PostDate from "../../../components/post-date/post-date";
import PostTags from "../../../components/post-tags/post-tags";
import getAllPostsMeta from "../../../graphql/getAllPostsMeta";
import getPost from "../../../graphql/getPost";
import NotFound from "../../not-found";
import "./post.scss";
import pageMetadata from "../../../util/pageMetadata";
import notFoundMetadata from "../../../util/notFoundMetadata";
import PostsGrid from "../../../components/posts-grid/posts-grid";
import FeaturedImage from "../../../components/featured-image/featured-image";
import PostExcerpt from "../../../components/post-excerpt/post-excerpt";
import prepareExcerpt from "../../../util/prepareExcerpt";
import stripHtmlTags from "../../../util/stripHtmlTags";
import PostMeta from "../../../components/post-meta/post-meta";

type PostProps = {
  params: {
    pid: string;
    slug: string;
  };
};

export default async function Post({ params }: PostProps) {
  const post = await getPost(params.pid);

  if (post && post.slug === params.slug) {
    const featuredImage = post.featuredImage?.node;

    return (
      <main className="post layout-container">
        <article>
          <header className="post-header">
            <div className="post-header__meta">
              <PostMeta
                sports={post.sports.nodes}
                categories={post.categories.nodes}
                date={post.date}
              />
            </div>
            <h1 className="post-header__title">
              {stripHtmlTags(post.title, false)}
            </h1>
            {prepareExcerpt(post.excerpt) && (
              <div className="post-header__excerpt">
                <PostExcerpt excerpt={prepareExcerpt(post.excerpt)} />
              </div>
            )}
            {featuredImage && (
              <div className="post-header__image">
                <FeaturedImage
                  src={featuredImage?.sourceUrl}
                  loading="eager"
                  alt={post.title}
                  caption={featuredImage?.atrybucjaAutora}
                  availableSizes={featuredImage.mediaDetails.sizes}
                  sizes="(min-width: 1200px) 1000px, 100vw"
                />
              </div>
            )}
            <div className="post-header__author">
              <PostAuthor
                name={post.author.node.name}
                id={post.author.node.databaseId}
              />
            </div>
          </header>
          <PostContent content={post.content} />
          <footer className="post-footer">
            <PostTags tags={post.tags.nodes} />
            <PostComments id={post.id} title={post.title} />
          </footer>
        </article>
        {post.morePosts.length > 0 && (
          <div className="post-see-more see-more">
            <h5>Zobacz też</h5>
            <PostsGrid posts={post.morePosts} />
          </div>
        )}
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
