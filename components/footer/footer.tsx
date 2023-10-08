import Link from "next/link";
import { APICategories } from "../../graphql/types/categories";
import { APISports } from "../../graphql/types/sports";
import LogoSVG from "../svg/logo";
import "./footer.scss";
import { routes } from "../../constants/constants";
import GDPR from "../gdpr/gdpr";

type FooterProps = {
  categories: APICategories;
  sports: APISports;
};

export default function Footer({ categories, sports }: FooterProps) {
  return (
    <footer className="footer layout-container">
      <div>
        <div>
          <LogoSVG />
        </div>
        <div>
          <ul>
            {sports.map((sport) => (
              <li key={`footer-sports-${sport.id}`}>
                <Link href={`${routes.SPORT}/${sport.slug}`}>{sport.name}</Link>
              </li>
            ))}
          </ul>
          {categories.length > 0 && (
            <ul>
              {categories.map((category) => {
                if (category.children?.nodes?.length > 0) {
                  return category.children.nodes.map((child) => (
                    <li key={`footer-category-${child.id}`}>
                      <Link href={`${routes.CATEGORY}/${child.slug}`}>
                        {child.name}
                      </Link>
                    </li>
                  ));
                } else {
                  return (
                    <li key={`footer-category-${category.id}`}>
                      <Link href={`${routes.CATEGORY}/${category.slug}`}>
                        {category.name}
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          )}
          <ul>
            <li>
              <Link href={`${routes.ABOUT}`}>O nas</Link>
            </li>
            <li>
              <Link href={`${routes.EVENTS}`}>Wydarzenia</Link>
            </li>
            <li>
              <Link href={`${routes.RACKET_MAPA}`}>Racket Mapa</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div>Racketplanet.pl © 2021 - {new Date().getFullYear()}</div>
        <div>
          <Link href={`${routes.PRIVACY_POLICY}`}>Polityka prywatności</Link>
        </div>
        <div>
          <GDPR />
        </div>
      </div>
    </footer>
  );
}
