import { useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import Link from "next/link";

import "./category-collapse.scss";
import { APICategories } from "../../../../../../api/types/categories";
import { routes } from "../../../../../../constants/constants";

type CategoryCollapseProps = {
  category: APICategories[0];
};

export default function CategoryCollapse({ category }: CategoryCollapseProps) {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <Button
        onClick={() => setShow(!show)}
        aria-controls={`category-${category.id}-collapse`}
        aria-expanded={show}
      >
        {category.name}
      </Button>
      <Collapse in={show}>
        <div id={`category-${category.id}-collapse`}>
          {category.children.nodes.map((child) => {
            return (
              <Link
                href={`${routes.CATEGORY}/${child.slug}`}
                key={`collapse-item-${child.id}`}
              >
                {child.name}
              </Link>
            );
          })}
        </div>
      </Collapse>
    </>
  );
}
