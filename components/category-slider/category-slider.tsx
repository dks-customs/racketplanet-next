"use client";

import { useEffect, useState } from "react";
import { APIPostPreview } from "../../graphql/types/post-preview";
import Glide from "@glidejs/glide/dist/glide.esm";
import "./category-slider.scss";

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
  breakpoints: {
    1024: {
      perView: 3,
    },
    767: {
      perView: 2,
    },
    479: {
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
              {posts.map((post) => (
                <li
                  className="glide__slide"
                  key={`category-slider-slide-${post.id}`}
                >
                  {post.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="glide__arrows" data-glide-el="controls">
            <button
              className="glide__arrow glide__arrow--left"
              data-glide-dir="<"
            >
              &larr;
            </button>
            <button
              className="glide__arrow glide__arrow--right"
              data-glide-dir=">"
            >
              &rarr;
            </button>
          </div>
        </div>
      </section>
    );
  } else {
    return null;
  }
}
