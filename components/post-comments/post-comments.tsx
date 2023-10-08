"use client";

import { DiscussionEmbed } from "disqus-react";
import "./post-comments.scss";
import { DISQUS_SHORTNAME } from "../../constants/constants";
import useGDPRCookies from "../gdpr/hooks/useGDPRCookies";
import { useEffect, useState } from "react";

type PostCommentsProps = {
  id: string;
  title: string;
};

export default function PostComments({ id, title }: PostCommentsProps) {
  const [DOMLoaded, setDOMLoaded] = useState<boolean>(false);
  const { disqus } = useGDPRCookies();

  useEffect(() => {
    setDOMLoaded(true);
  }, []);

  if (DOMLoaded && disqus === true) {
    return (
      <div>
        <DiscussionEmbed
          shortname={DISQUS_SHORTNAME || ""}
          config={{
            identifier: `${id}`,
            title: title,
          }}
        />
      </div>
    );
  } else {
    return null;
  }
}
