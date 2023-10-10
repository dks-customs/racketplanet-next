"use client";

import { useState } from "react";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  routes,
} from "../../../../constants/constants";
import Link from "next/link";
import InstagramSVG from "../../../svg/instagram";
import FacebookSVG from "../../../svg/facebook";
import { Offcanvas, OffcanvasHeader } from "react-bootstrap";
import CategoryCollapse from "./components/category-collapse/category-collapse";
import { APICategories } from "../../../../graphql/types/categories";
import { APISports } from "../../../../graphql/types/sports";
import ListSVG from "../../../svg/list";
import "./side-menu.scss";

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
      <button className="header-top__menu-btn hoverable" onClick={handleShow}>
        <ListSVG />
      </button>
      <Offcanvas show={show} onHide={handleClose} backdrop={true} scroll={true}>
        <OffcanvasHeader closeButton />
        <Offcanvas.Body>
          <nav className="side-menu">
            <ul>
              <li onClick={handleClose}>
                <Link href={routes.EVENTS}>Wydarzenia</Link>
              </li>
              <li onClick={handleClose}>
                <Link href={routes.RACKET_MAPA}>Racket Mapa</Link>
              </li>
            </ul>
            <ul>
              {sports
                .filter((sport) => sport.slug !== "bez-sportu")
                .map((sport) => (
                  <li key={`side-menu-${sport.id}`} onClick={handleClose}>
                    <Link href={`${routes.SPORT}/${sport.slug}`}>
                      {sport.name}
                    </Link>
                  </li>
                ))}
            </ul>
            <ul>
              {categories.map((category) => {
                if (category.children?.nodes?.length > 0) {
                  return (
                    <li
                      key={`header-bottom-${category.id}`}
                      onClick={handleClose}
                    >
                      <CategoryCollapse category={category} />
                    </li>
                  );
                } else {
                  return (
                    <li
                      key={`header-bottom-${category.id}`}
                      onClick={handleClose}
                    >
                      <Link href={`${routes.CATEGORY}/${category.slug}`}>
                        {category.name}
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
            <ul className="side-menu__footer">
              <li onClick={handleClose}>
                <Link href={routes.ABOUT}>O nas</Link>
              </li>
              <li onClick={handleClose}>
                <Link href={routes.CONTACT}>Kontakt</Link>
              </li>
              <li onClick={handleClose}>
                <Link href={routes.PRIVACY_POLICY}>Polityka prywatności</Link>
              </li>
            </ul>
            <div className="side-menu__social">
              <h5>Śledź nas na</h5>
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
