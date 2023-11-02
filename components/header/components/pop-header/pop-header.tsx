"use client";

import Link from "next/link";
import { APICategories } from "../../../../graphql/types/categories";
import { APISports } from "../../../../graphql/types/sports";
import SearchModal from "../search-modal/search-modal";
import SideMenu from "../side-menu/side-menu";
import LogoSVG from "../../../svg/logo";
import { routes } from "../../../../constants/constants";
import ActiveLink from "../../../active-link/active-link";
import SubcategoriesDropdown from "../header-bottom/components/subcategories-dropdown/subcategories-dropdown";
import { useEffect } from "react";
import ActiveLinkClient from "../../../active-link/components/active-link-client";

type PopHeaderProps = {
  sports: APISports;
  categories: APICategories;
};

export default function PopHeader({ sports, categories }: PopHeaderProps) {
  useEffect(() => {
    const popHeader = document.getElementById("pop-header");

    if (popHeader) {
      window.addEventListener("scroll", () => {
        var y = window.scrollY;

        if (y >= 500) {
          popHeader.classList.add("show");
        } else {
          popHeader.classList.remove("show");
        }
      });
    }
  }, []);

  return (
    <div className="pop-header" id="pop-header">
      <div className="layout-container">
        <SideMenu categories={categories} sports={sports} />
        <SearchModal />
        <Link className="pop-header__logo" href={routes.HOME}>
          <LogoSVG />
        </Link>
        <ul className="pop-header__sports">
          {sports.map((sport) => (
            <li key={`pop-header-${sport.id}`}>
              <ActiveLinkClient
                className="hoverable"
                href={`${routes.SPORT}/${sport.slug}`}
              >
                {sport.name}
              </ActiveLinkClient>
            </li>
          ))}
        </ul>
        <ul className="pop-header__categories">
          {categories.map((category) => {
            if (category.children?.nodes?.length > 0) {
              return (
                <li key={`pop-header-category-${category.id}`}>
                  <SubcategoriesDropdown parentCategory={category} />
                </li>
              );
            } else {
              return (
                <li key={`pop-header-${category.id}`}>
                  <ActiveLinkClient
                    href={`${routes.CATEGORY}/${category.slug}`}
                    className="hoverable"
                  >
                    {category.name}
                  </ActiveLinkClient>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}
