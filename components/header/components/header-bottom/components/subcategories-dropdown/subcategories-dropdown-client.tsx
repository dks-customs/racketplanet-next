"use client";

import { Dropdown } from "react-bootstrap";
import { SubcategoriesDropdownProps } from "./subcategories-dropdown";
import { routes } from "../../../../../../constants/constants";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ActiveLinkClient from "../../../../../active-link/components/active-link-client";

export default function SubcategoriesDropdownClient({
  parentCategory,
}: SubcategoriesDropdownProps) {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  const toggleShow = (bootstrapShow: boolean) => {
    setShow(bootstrapShow);
  };

  const hide = () => setShow(false);

  useEffect(() => {
    hide();
  }, [pathname]);

  return (
    <Dropdown show={show} onToggle={toggleShow}>
      <Dropdown.Toggle id="dropdown-basic">
        {parentCategory.name}
      </Dropdown.Toggle>
      <Dropdown.Menu rootCloseEvent="click">
        <ul>
          {parentCategory.children.nodes.map((child) => (
            <li key={`header-bottom-child-${child.id}`}>
              <ActiveLinkClient
                href={`${routes.CATEGORY}/${child.slug}`}
                onClick={() => setShow(false)}
              >
                {child.name}
              </ActiveLinkClient>
            </li>
          ))}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
}
