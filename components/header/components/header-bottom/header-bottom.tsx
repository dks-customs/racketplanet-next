import { routes } from "../../../../constants/constants";
import { APICategories } from "../../../../graphql/types/categories";
import { APISports } from "../../../../graphql/types/sports";
import "./header-bottom.scss";
import SubcategoriesDropdown from "./components/subcategories-dropdown/subcategories-dropdown";
import ActiveLink from "../../../active-link/active-link";

type HeaderBottomProps = {
  sports: APISports;
  categories: APICategories;
};

export default function HeaderBottom({
  categories,
  sports,
}: HeaderBottomProps) {
  return (
    <nav className="header-bottom">
      <ul className="header-bottom__sports">
        {sports.map((sport) => (
          <li key={`header-bottom-${sport.id}`}>
            <ActiveLink
              className="hoverable-background"
              href={`${routes.SPORT}/${sport.slug}`}
            >
              {sport.name}
            </ActiveLink>
          </li>
        ))}
      </ul>
      <ul className="header-bottom__categories">
        {categories.map((category) => {
          if (category.children?.nodes?.length > 0) {
            return (
              <li key={`header-bottom-category-${category.id}`}>
                <SubcategoriesDropdown parentCategory={category} />
              </li>
            );
          } else {
            return (
              <li key={`header-bottom-${category.id}`}>
                <ActiveLink href={`${routes.CATEGORY}/${category.slug}`}>
                  {category.name}
                </ActiveLink>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
}
