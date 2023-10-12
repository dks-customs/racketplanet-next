import { useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import Link from "next/link";

import "./category-collapse.scss";
import { APICategories } from "../../../../../../graphql/types/categories";
import { routes } from "../../../../../../constants/constants";
import ActiveLinkClient from "../../../../../active-link/components/active-link-client";
import ChevronDownSVG from "../../../../../svg/chevron-down";

type CategoryCollapseProps = {
  category: APICategories[0];
};

export default function CategoryCollapse({ category }: CategoryCollapseProps) {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => setShow(!show)}
        aria-controls={`category-${category.id}-collapse`}
        aria-expanded={show}
        className="hoverable"
      >
        {category.name}
        <ChevronDownSVG />
      </button>
      <Collapse in={show}>
        <ul id={`category-${category.id}-collapse`}>
          {category.children.nodes.map((child) => {
            return (
              <li key={`category-child-${child.slug}`}>
                <ActiveLinkClient
                  href={`${routes.CATEGORY}/${child.slug}`}
                  key={`collapse-item-${child.id}`}
                  className="hoverable"
                >
                  {child.name}
                </ActiveLinkClient>
              </li>
            );
          })}
        </ul>
      </Collapse>
    </>
  );
}
