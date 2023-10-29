import Link from "next/link";
import { APICategories } from "../../graphql/types/categories";
import { APISports } from "../../graphql/types/sports";
import LogoSVG from "../svg/logo";
import { FACEBOOK_URL, INSTAGRAM_URL, routes } from "../../constants/constants";
import GDPR from "../gdpr/gdpr";
import "./footer.scss";
import ActiveLink from "../active-link/active-link";
import FacebookSVG from "../svg/facebook";
import InstagramSVG from "../svg/instagram";
import SportsPreviews from "./components/sports-previews/sports-previews";

type FooterProps = {
  categories: APICategories;
  sports: APISports;
};

export default function Footer({ categories, sports }: FooterProps) {
  return (
    <>
      {/* <SportsPreviews sports={sports} /> */}
      <footer className="footer">
        <div className="footer-top layout-container">
          <div className="footer-top__logo">
            <ActiveLink href={routes.HOME}>
              <LogoSVG />
            </ActiveLink>
          </div>
          <nav className="footer-top__sections">
            <div className="footer-top__sections__sports">
              <h5>Dyscypliny</h5>
              <ul>
                {sports.map((sport) => (
                  <li key={`footer-sports-${sport.id}`}>
                    <ActiveLink
                      href={`${routes.SPORT}/${sport.slug}`}
                      className="hoverable"
                    >
                      {sport.name}
                    </ActiveLink>
                  </li>
                ))}
              </ul>
            </div>
            {categories.length > 0 && (
              <div className="footer-top__sections__categories">
                <h5>Kategorie</h5>
                <ul>
                  {categories.map((category) => {
                    if (category.children?.nodes?.length > 0) {
                      return category.children.nodes.map((child) => (
                        <li key={`footer-category-${child.id}`}>
                          <ActiveLink
                            href={`${routes.CATEGORY}/${child.slug}`}
                            className="hoverable"
                          >
                            {child.name}
                          </ActiveLink>
                        </li>
                      ));
                    } else {
                      return (
                        <li key={`footer-category-${category.id}`}>
                          <ActiveLink
                            href={`${routes.CATEGORY}/${category.slug}`}
                            className="hoverable"
                          >
                            {category.name}
                          </ActiveLink>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            )}
            <div className="footer-top__sections__pages">
              <h5>Podstrony</h5>
              <ul>
                <li>
                  <ActiveLink
                    href={`${routes.EVENTS}`}
                    className="hoverable decorate"
                  >
                    Kalendarz
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink
                    href={`${routes.RACKET_MAPA}`}
                    className="hoverable decorate"
                  >
                    Racket Mapa
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink href={`${routes.ABOUT}`} className="hoverable">
                    O nas
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink href={`${routes.CONTACT}`} className="hoverable">
                    Kontakt
                  </ActiveLink>
                </li>
              </ul>
            </div>
          </nav>
          <div className="footer-top__social">
            <h5>Śledź nas na:</h5>
            <ul>
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
          </div>
        </div>
        <div className="footer-bottom">
          <div className="layout-container">
            <div className="footer-bottom__privacy-policy">
              <ActiveLink href={`${routes.PRIVACY_POLICY}`}>
                Polityka prywatności
              </ActiveLink>
            </div>
            <div className="footer-bottom__gdpr">
              <GDPR />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
