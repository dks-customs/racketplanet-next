"use client";

import { routes } from "../../../../constants/constants";
import { APICategories } from "../../../../graphql/types/categories";
import { APISports } from "../../../../graphql/types/sports";
import "./header-bottom.scss";
import SubcategoriesDropdown from "./components/subcategories-dropdown/subcategories-dropdown";
import ActiveLink from "../../../active-link/active-link";
import ActiveLinkClient from "../../../active-link/components/active-link-client";
import { useState } from "react";
import { Collapse } from "react-bootstrap";
import ChevronDownSVG from "../../../svg/chevron-down";

type HeaderBottomProps = {
  sports: APISports;
  categories: APICategories;
};

export default function HeaderBottom({
  categories,
  sports,
}: HeaderBottomProps) {
  const [showSports, setShowSports] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const hideSports = () => setShowSports(false);

  const hideCategories = () => setShowCategories(false);

  const hideEverything = () => {
    setShowSports(false);
    setShowCategories(false);
  };

  const toggleSports = () => {
    hideCategories();
    setShowSports(!showSports);
  };

  const toggleCategories = () => {
    hideSports();
    setShowCategories(!showCategories);
  };

  return (
    <nav className="header-bottom">
      <button
        className="header-bottom__sports-btn hoverable"
        onClick={toggleSports}
      >
        Dyscypliny
        <ChevronDownSVG />
      </button>
      <button
        className="header-bottom__categories-btn hoverable"
        onClick={toggleCategories}
      >
        Kategorie
        <ChevronDownSVG />
      </button>
      <ul className="header-bottom__links">
        <li>
          <ActiveLinkClient
            href={routes.EVENTS}
            className="hoverable"
            onClick={hideEverything}
          >
            Kalendarz
          </ActiveLinkClient>
        </li>
        <li>
          <ActiveLinkClient
            href={routes.RACKET_MAPA}
            className="hoverable"
            onClick={hideEverything}
          >
            Racket Mapa
          </ActiveLinkClient>
        </li>
      </ul>
      <div className="header-bottom__collapsible">
        <Collapse in={showSports}>
          <div>
            <ul className="header-bottom__collapsible__sports">
              {sports.map((sport) => (
                <li key={`header-bottom-${sport.id}`}>
                  <ActiveLinkClient
                    className="hoverable"
                    href={`${routes.SPORT}/${sport.slug}`}
                    onClick={hideSports}
                  >
                    {sport.name}
                  </ActiveLinkClient>
                </li>
              ))}
            </ul>
          </div>
        </Collapse>
        <Collapse in={showCategories}>
          <div>
            <ul className="header-bottom__collapsible__categories">
              {categories.map((category) => {
                if (category.children?.nodes?.length > 0) {
                  return category.children.nodes.map((child) => (
                    <li key={`header-bottom-category-${child.id}`}>
                      <ActiveLinkClient
                        href={`${routes.CATEGORY}/${child.slug}`}
                        className="hoverable"
                        onClick={hideCategories}
                      >
                        {child.name}
                      </ActiveLinkClient>
                    </li>
                  ));
                } else {
                  return (
                    <li key={`header-bottom-${category.id}`}>
                      <ActiveLinkClient
                        href={`${routes.CATEGORY}/${category.slug}`}
                        className="hoverable"
                        onClick={hideCategories}
                      >
                        {category.name}
                      </ActiveLinkClient>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </Collapse>
      </div>
    </nav>
  );
}
