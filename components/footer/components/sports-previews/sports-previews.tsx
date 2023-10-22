"use client";

import Link from "next/link";
import { APISports } from "../../../../graphql/types/sports";
import { routes } from "../../../../constants/constants";
import prepareExcerpt from "../../../../util/prepareExcerpt";
import Glide from "@glidejs/glide/dist/glide.esm";
import { useEffect, useState } from "react";
import ChevronLeftSVG from "../../../svg/chevron-left";
import ChevronRightSVG from "../../../svg/chevron-right";

import "./sports-previews.scss";

type SportsPreviewsProps = {
  sports: APISports;
};

const sliderConfiguration = {
  type: "carousel",
  startAt: 0,
  perView: 4,
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

export default function SportsPreviews({ sports }: SportsPreviewsProps) {
  const [slider] = useState(new Glide(".glide", sliderConfiguration));

  useEffect(() => {
    slider.mount();
  }, []);

  if (sports.length > 0) {
    return (
      <section className="sports-previews-container layout-container">
        <div className="glide">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides sports-previews">
              {sports.map((sport) => {
                let node: React.ReactNode | undefined;

                sport.pages.nodes.forEach((page) => {
                  if (page.slug === `historia-${sport.slug}`) {
                    node = (
                      <li
                        className="glide__slide"
                        key={`sports-previews-footer-${sport.id}`}
                      >
                        <h3>{sport.name}</h3>
                        {prepareExcerpt(page.excerpt) && (
                          <p>{prepareExcerpt(page.excerpt)}</p>
                        )}
                        <Link href={`${routes.SPORT}/${sport.slug}`}>
                          Pokaż {sport.name}&nbsp;&rarr;
                        </Link>
                      </li>
                    );
                  }
                });

                if (node) return node;
                else return null;
              })}
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
