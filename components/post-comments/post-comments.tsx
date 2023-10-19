"use client";

import { DiscussionEmbed, CommentCount } from "disqus-react";
import "./post-comments.scss";
import { DISQUS_SHORTNAME } from "../../constants/constants";
import useGDPRCookies from "../gdpr/hooks/useGDPRCookies";
import { useEffect, useState } from "react";
import ChevronUpSVG from "../svg/chevron-up";
import { Button } from "react-bootstrap";
import ChevronDownSVG from "../svg/chevron-down";

type PostCommentsProps = {
  id: string;
  title: string;
};

export default function PostComments({ id, title }: PostCommentsProps) {
  const [show, setShow] = useState<boolean>(false);
  const [DOMLoaded, setDOMLoaded] = useState<boolean>(false);
  const { disqus } = useGDPRCookies();

  useEffect(() => {
    setDOMLoaded(true);
  }, []);

  if (DOMLoaded && disqus === true) {
    return (
      <>
        <div className="post-comments">
          {show && (
            <>
              <DiscussionEmbed
                shortname={DISQUS_SHORTNAME || ""}
                config={{
                  identifier: `${id}`,
                  title: title,
                }}
              />
              <Button
                onClick={() => setShow(false)}
                className="post-comments-btn"
                variant="secondary"
              >
                Zwiń komentarze
                <ChevronUpSVG />
              </Button>
            </>
          )}
          {!show && (
            <Button
              variant="secondary"
              onClick={() => setShow(true)}
              className="post-comments-btn"
            >
              Pokaż komentarze
              <span className="post-comments-btn__count">
                {"("}
                <CommentCount
                  shortname={DISQUS_SHORTNAME || ""}
                  config={{
                    identifier: `${id}`,
                    title: title,
                  }}
                ></CommentCount>
                {")"}
              </span>
              <ChevronDownSVG />
            </Button>
          )}
        </div>
      </>
    );
  } else {
    return null;
  }
}
