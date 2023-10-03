import { Dispatch, SetStateAction } from "react";
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

import "./side-menu.scss";
import { APICategories } from "../../../../api/types/categories";
import { APISports } from "../../../../api/types/sports";

type SideMenuProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  categories: APICategories;
  sports: APISports;
};

export default function SideMenu({
  show,
  setShow,
  categories,
  sports,
}: SideMenuProps) {
  const handleClose = () => setShow(false);

  return (
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
                  <li key={`header-bottom-${category.id}`}>
                    <CategoryCollapse category={category} />
                  </li>
                );
              } else {
                return (
                  <li key={`header-bottom-${category.id}`}>
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
              <li>
                <a href={FACEBOOK_URL} target="_blank" onClick={handleClose}>
                  <FacebookSVG />
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" onClick={handleClose}>
                  <InstagramSVG />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
