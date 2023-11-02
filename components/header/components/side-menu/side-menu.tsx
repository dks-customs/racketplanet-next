"use client";

import { useState } from "react";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  routes,
} from "../../../../constants/constants";
import InstagramSVG from "../../../svg/instagram";
import FacebookSVG from "../../../svg/facebook";
import { Offcanvas } from "react-bootstrap";
import CategoryCollapse from "./components/category-collapse/category-collapse";
import { APICategories } from "../../../../graphql/types/categories";
import { APISports } from "../../../../graphql/types/sports";
import ListSVG from "../../../svg/list";
import ActiveLinkClient from "../../../active-link/components/active-link-client";
import "./side-menu.scss";
import CloseSVG from "../../../svg/close";

type SideMenuProps = {
  categories: APICategories;
  sports: APISports;
};

export default function SideMenu({ categories, sports }: SideMenuProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="header-menu-btn hoverable" onClick={handleShow}>
        <ListSVG />
      </button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        backdrop={true}
        scroll={false}
      >
        <Offcanvas.Body>
          <nav className="side-menu">
            <button onClick={handleClose} className="side-menu__close">
              <CloseSVG />
            </button>
            <ul className="side-menu__pages side-menu-list">
              <li onClick={handleClose}>
                <ActiveLinkClient href={routes.HOME}>
                  Strona główna
                </ActiveLinkClient>
              </li>
              <li onClick={handleClose}>
                <ActiveLinkClient href={routes.EVENTS}>
                  Kalendarz
                </ActiveLinkClient>
              </li>
              <li onClick={handleClose}>
                <ActiveLinkClient href={routes.RACKET_MAPA}>
                  Racket Mapa
                </ActiveLinkClient>
              </li>
            </ul>
            <ul className="side-menu__sports side-menu-list">
              {sports
                .filter((sport) => sport.slug !== "bez-sportu")
                .map((sport) => (
                  <li key={`side-menu-${sport.id}`} onClick={handleClose}>
                    <ActiveLinkClient href={`${routes.SPORT}/${sport.slug}`}>
                      {sport.name}
                    </ActiveLinkClient>
                  </li>
                ))}
            </ul>
            <ul className="side-menu__categories side-menu-list">
              {categories.map((category) => {
                if (category.children?.nodes?.length > 0) {
                  return (
                    <li key={`header-bottom-${category.id}`}>
                      <CategoryCollapse
                        category={category}
                        handleClose={handleClose}
                      />
                    </li>
                  );
                } else {
                  return (
                    <li
                      key={`header-bottom-${category.id}`}
                      onClick={handleClose}
                    >
                      <ActiveLinkClient
                        href={`${routes.CATEGORY}/${category.slug}`}
                      >
                        {category.name}
                      </ActiveLinkClient>
                    </li>
                  );
                }
              })}
            </ul>
            <ul className="side-menu__about side-menu-list">
              <li onClick={handleClose}>
                <ActiveLinkClient href={routes.ABOUT}>O nas</ActiveLinkClient>
              </li>
              <li onClick={handleClose}>
                <ActiveLinkClient href={routes.CONTACT}>
                  Kontakt
                </ActiveLinkClient>
              </li>
              <li onClick={handleClose}>
                <ActiveLinkClient href={routes.PRIVACY_POLICY}>
                  Polityka prywatności
                </ActiveLinkClient>
              </li>
            </ul>
            <div className="side-menu__social side-menu-list">
              <h5>Śledź nas na:</h5>
              <ul>
                <li onClick={handleClose}>
                  <a href={FACEBOOK_URL} target="_blank">
                    <FacebookSVG />
                  </a>
                </li>
                <li onClick={handleClose}>
                  <a href={INSTAGRAM_URL} target="_blank">
                    <InstagramSVG />
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
