"use client";

import { Button, Fade, Spinner } from "react-bootstrap";
import { APIPostPreview } from "../../graphql/types/post-preview";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import getCategory from "../../graphql/getCategory";
import getSport from "../../graphql/getSport";
import getPostsPreviews from "../../graphql/getPostsPreviews";
import getTag from "../../graphql/getTag";

type MorePostsButtonProps = {
  afterCursor: string;
  categorySlug?: string;
  sportSlug?: string;
  tagSlug?: string;
};

export default function LoadMore({
  afterCursor,
  categorySlug,
  sportSlug,
  tagSlug,
}: MorePostsButtonProps) {
  const [after, setAfter] = useState<string | undefined>(afterCursor);
  const [posts, setPosts] = useState<APIPostPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadMore = async () => {
    try {
      if (after) {
        setLoading(true);

        let newPosts: APIPostPreview[] = [];
        let newAfter: string | undefined = undefined;

        if (categorySlug) {
          const category = await getCategory(categorySlug, after);

          if (category) {
            newPosts = category.posts.map((post) => post.node);
            if (category.hasNextPage) newAfter = category.endCursor;
          }
        } else if (sportSlug) {
          const sport = await getSport(sportSlug, after);

          if (sport) {
            newPosts = sport.posts.map((post) => post.node);
            if (sport.hasNextPage) newAfter = sport.endCursor;
          }
        } else if (tagSlug) {
          const tag = await getTag(tagSlug, after);

          if (tag) {
            newPosts = tag.posts.map((post) => post.node);
            if (tag.hasNextPage) newAfter = tag.endCursor;
          }
        } else {
          const posts = await getPostsPreviews(after);
          newPosts = posts.items.map((post) => post.node);
          if (posts.hasNextPage) newAfter = posts.endCursor;
        }

        setAfter(newAfter);
        setPosts(posts.concat(newPosts));
        setLoading(false);
      }
    } catch (err) {
      toast.error("Coś poszło nie tak.");
      setLoading(false);
    }
  };

  return (
    <>
      {posts.length > 0 && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Fade in={true} appear>
                <article>
                  <Link href={`/${post.databaseId}/${post.slug}`}>
                    {post.title}
                  </Link>
                </article>
              </Fade>
            </li>
          ))}
        </ul>
      )}
      {after && (
        <Button className="more-posts-btn" variant="primary" onClick={loadMore}>
          {loading ? <Spinner /> : "Załaduj więcej"}
        </Button>
      )}
    </>
  );
}
