"use-client";

import { Dropdown } from "react-bootstrap";
import { SubcategoriesDropdownProps } from "./subcategories-dropdown";
import Link from "next/link";
import { routes } from "../../../../../../constants/constants";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SubcategoriesDropdownClient({
  parentCategory,
}: SubcategoriesDropdownProps) {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  const toggleShow = () => setShow(!show);
  const hide = () => setShow(false);

  useEffect(() => {
    hide();
  }, [pathname]);

  return (
    <Dropdown show={show}>
      <Dropdown.Toggle id="dropdown-basic" onClick={toggleShow}>
        {parentCategory.name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <ul>
          {parentCategory.children.nodes.map((child) => (
            <li key={`header-bottom-child-${child.id}`}>
              <Link
                href={`${routes.CATEGORY}/${child.slug}`}
                onClick={toggleShow}
              >
                {child.name}
              </Link>
            </li>
          ))}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
}
