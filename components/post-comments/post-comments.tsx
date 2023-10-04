"use client";

import { DiscussionEmbed } from "disqus-react";
import "./post-comments.scss";
import { DISQUS_SHORTNAME } from "../../constants/constants";

type PostCommentsProps = {
  id: string;
  title: string;
};

export default function PostComments({ id, title }: PostCommentsProps) {
  return (
    <div className="post-comments">
      <DiscussionEmbed
        shortname={DISQUS_SHORTNAME || ""}
        config={{
          identifier: `${id}`,
          title: title,
        }}
      />
    </div>
  );
}
