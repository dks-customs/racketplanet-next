"use client";

import { useEffect, useState } from "react";
import { APIPostPreview } from "../../graphql/types/post-preview";
import Glide from "@glidejs/glide/dist/glide.esm";
import "./category-slider.scss";
import Link from "next/link";
import FeaturedImage from "../featured-image/featured-image";
import stripHtmlTags from "../../util/stripHtmlTags";
import ChevronLeftSVG from "../svg/chevron-left";
import ChevronRightSVG from "../svg/chevron-right";
import PostMeta from "../post-meta/post-meta";
import prepareExcerpt from "../../util/prepareExcerpt";
import PostExcerpt from "../post-excerpt/post-excerpt";

type CategorySliderProps = {
  posts: APIPostPreview[];
  index: number;
};

const sliderConfiguration = {
  type: "slider",
  rewind: false,
  startAt: 0,
  perView: 4,
  bound: true,
  gap: 30,
  breakpoints: {
    100000: {
      gap: 30,
      perView: 4,
    },
    1023: {
      gap: 13,
      perView: 3,
    },
    767: {
      gap: 13,
      perView: 2,
    },
    575: {
      perView: 1,
    },
  },
};

export default function CategorySlider({ posts, index }: CategorySliderProps) {
  const [slider] = useState(
    new Glide(`.category-slider-${index}`, sliderConfiguration)
  );

  useEffect(() => {
    slider.mount();
  }, []);

  if (posts.length > 0) {
    return (
      <section className="category-slider">
        <div className={`glide category-slider-${index}`}>
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {posts.map((post) => {
                const featuredImage = post.featuredImage?.node;

                return (
                  <li
                    className="glide__slide"
                    key={`category-slider-slide-${post.id}`}
                  >
                    <div className="category-slider-post">
                      <Link
                        href={`/${post.databaseId}/${post.slug}`}
                        className="category-slider-post__image"
                      >
                        <FeaturedImage
                          src={featuredImage?.sourceUrl}
                          alt={post.title}
                          availableSizes={featuredImage?.mediaDetails.sizes}
                          loading="lazy"
                          sizes="(min-width: 576px) 400px, 300px"
                        />
                      </Link>
                      <h2 className="category-slider-post__title">
                        <Link
                          href={`/${post.databaseId}/${post.slug}`}
                          className="hoverable"
                        >
                          {stripHtmlTags(post.title, false)}
                        </Link>
                      </h2>
                      {prepareExcerpt(post.excerpt) && (
                        <div className="category-slider-post__excerpt">
                          <PostExcerpt excerpt={prepareExcerpt(post.excerpt)} />
                        </div>
                      )}
                      <div className="category-slider-post__meta">
                        <PostMeta date={post.date} sports={post.sports.nodes} />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="glide__arrows" data-glide-el="controls">
            <button
              className="glide__arrow glide__arrow--left"
              data-glide-dir="<"
            >
              <ChevronLeftSVG />
            </button>
            <button
              className="glide__arrow glide__arrow--right"
              data-glide-dir=">"
            >
              <ChevronRightSVG />
            </button>
          </div>
        </div>
      </section>
    );
  } else {
    return null;
  }
}
