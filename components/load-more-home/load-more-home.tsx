"use client";

import { useState } from "react";
import { APIPostPreview } from "../../graphql/types/post-preview";
import "./load-more-home.scss";
import PostsList from "../posts-list/posts-list";
import { Button } from "react-bootstrap";
import { POSTS_PER_PAGE } from "../../constants/constants";

type LoadMoreHomeProps = {
  posts: APIPostPreview[];
};

export default function LoadMoreHome({ posts }: LoadMoreHomeProps) {
  const [loadedPosts, setLoadedPosts] = useState<APIPostPreview[]>([]);

  const loadMore = () => {
    setLoadedPosts(posts.slice(0, loadedPosts.length + POSTS_PER_PAGE));
  };

  return (
    <div className="load-more-home">
      {loadedPosts.length > 0 && <PostsList posts={loadedPosts} />}
      {loadedPosts.length !== posts.length && (
        <Button variant="secondary" onClick={loadMore}>
          Wczytaj starsze posty
        </Button>
      )}
    </div>
  );
}
