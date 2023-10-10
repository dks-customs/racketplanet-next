import Link from "next/link";
import { Suspense } from "react";
import { Dropdown } from "react-bootstrap";
import { routes } from "../../../../../../constants/constants";
import { APICategories } from "../../../../../../graphql/types/categories";
import SubcategoriesDropdownClient from "./subcategories-dropdown-client";

export type SubcategoriesDropdownProps = {
  parentCategory: APICategories[0];
};

export default function SubcategoriesDropdown({
  parentCategory,
}: SubcategoriesDropdownProps) {
  {
    /* BOOTSTRAP DROPDOWN HAS PROBLEMS WHEN RENDERED SERVER SIDE SO USING SUSPENSE TO RENDER IT ON THE CLIENT BUT STILL RENDERING FALLBACK BUTTON ON THE SERVER FOR SEO */
  }
  return (
    <Suspense
      fallback={
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle">
            {parentCategory.name}
          </button>
        </div>
      }
    >
      <SubcategoriesDropdownClient parentCategory={parentCategory} />
    </Suspense>
  );
}
