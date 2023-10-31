import Link from "next/link";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  routes,
} from "../../../../constants/constants";
import LogoSVG from "../../../svg/logo";
import "./header-top.scss";
import FacebookSVG from "../../../svg/facebook";
import InstagramSVG from "../../../svg/instagram";
import SideMenu from "../side-menu/side-menu";
import { APICategories } from "../../../../graphql/types/categories";
import { APISports } from "../../../../graphql/types/sports";
import SearchModal from "../search-modal/search-modal";
import ActiveLinkClient from "../../../active-link/components/active-link-client";
import ActiveLink from "../../../active-link/active-link";

type HeaderTopProps = {
  categories: APICategories;
  sports: APISports;
};

export default function HeaderTop({ categories, sports }: HeaderTopProps) {
  return (
    <div className="header-top layout-container">
      <SideMenu categories={categories} sports={sports} />
      <SearchModal />
      <Link className="header-top__logo" href={routes.HOME}>
        <LogoSVG />
      </Link>
      <nav className="header-top__links">
        <ul className="header-top__links__pages">
          <li>
            <ActiveLink href={routes.EVENTS} className="hoverable">
              Kalendarz
            </ActiveLink>
          </li>
          <li>
            <ActiveLink href={routes.RACKET_MAPA} className="hoverable">
              Racket Mapa
            </ActiveLink>
          </li>
        </ul>
        <ul className="header-top__links__social">
          <li>
            <a href={FACEBOOK_URL} target="_blank" className="hoverable">
              <FacebookSVG />
            </a>
          </li>
          <li>
            <a href={INSTAGRAM_URL} target="_blank" className="hoverable">
              <InstagramSVG />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
