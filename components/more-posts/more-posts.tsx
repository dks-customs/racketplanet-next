"use client";

import { Button, Fade, Spinner } from "react-bootstrap";
import { APIPostPreview } from "../../api/types/post-preview";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { POSTS_PER_PAGE } from "../../constants/constants";
import getPosts from "../../api/getPosts";
import getCategory from "../../api/getCategory";

type MorePostsButtonProps = {
  afterPostCursor: string;
  categorySlug?: string;
};

export default function MorePosts({
  afterPostCursor,
  categorySlug,
}: MorePostsButtonProps) {
  const [after, setAfter] = useState<string | undefined>(afterPostCursor);
  const [posts, setPosts] = useState<APIPostPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadPosts = async () => {
    try {
      if (after) {
        setLoading(true);

        let newPosts: APIPostPreview[] = [];
        let newAfter: string | undefined = undefined;

        if (categorySlug) {
          const category = await getCategory(categorySlug, after);

          newPosts = category.posts.map((post) => post.node);

          if (category.haveNextPage) {
            newAfter = category.posts[POSTS_PER_PAGE - 1].cursor;
          }
        } else {
          const posts = await getPosts(after);

          newPosts = posts.items.map((post) => post.node);

          if (posts.haveNextPage) {
            newAfter = posts.items[POSTS_PER_PAGE - 1].cursor;
          }
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
        <Button
          className="more-posts-btn"
          variant="primary"
          onClick={loadPosts}
        >
          {loading ? <Spinner /> : "Załaduj więcej"}
        </Button>
      )}
    </>
  );
}
