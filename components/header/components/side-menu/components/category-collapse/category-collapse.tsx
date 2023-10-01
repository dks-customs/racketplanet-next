import { useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { Categories } from "../../../../../../api/types/categories";
import Link from "next/link";

import "./category-collapse.scss";

type CategoryCollapseProps = {
  category: Categories[0];
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
              <Link href={`/${child.slug}`} key={`collapse-item-${child.id}`}>
                {child.name}
              </Link>
            );
          })}
        </div>
      </Collapse>
    </>
  );
}
