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
import PostsGrid from "../posts-grid/posts-grid";
import PostsList from "../posts-list/posts-list";
import getAuthor from "../../graphql/getAuthor";

type MorePostsButtonProps = {
  afterCursor: string;
  categorySlug?: string;
  sportSlug?: string;
  tagSlug?: string;
  authorId?: string;
  variant?: "list" | "grid";
};

export default function LoadMore({
  afterCursor,
  categorySlug,
  sportSlug,
  tagSlug,
  authorId,
  variant = "list",
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
        } else if (authorId) {
          const author = await getAuthor(authorId, after);

          if (author) {
            newPosts = author.posts.map((post) => post.node);
            if (author.hasNextPage) newAfter = author.endCursor;
          }
        } else {
          const posts = await getPostsPreviews(after);

          if (posts) {
            newPosts = posts.items.map((post) => post.node);
            if (posts.hasNextPage) newAfter = posts.endCursor;
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
      {variant === "grid" && <PostsGrid posts={posts} />}
      {variant === "list" && <PostsList posts={posts} />}
      {after && (
        <div className="more-posts-btn-container">
          <Button
            className="more-posts-btn"
            variant="primary"
            onClick={loadMore}
          >
            {loading ? <Spinner /> : "Załaduj więcej"}
          </Button>
        </div>
      )}
    </>
  );
}
