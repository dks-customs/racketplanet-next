import { usePathname } from "next/navigation";
import "./header-bottom.scss";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  routes,
} from "../../../../constants/constants";
import Link from "next/link";
import FacebookSVG from "../../../svg/facebook";
import InstagramSVG from "../../../svg/instagram";
import { Dropdown } from "react-bootstrap";
import { APICategories } from "../../../../graphql/types/categories";
import { APISports } from "../../../../graphql/types/sports";

type HeaderBottomProps = {
  sports: APISports;
  categories: APICategories;
};

export default function HeaderBottom({
  categories,
  sports,
}: HeaderBottomProps) {
  const pathname = usePathname();
  const className =
    pathname === routes.RACKET_MAPA ? "header-bottom--hidden" : "header-bottom";

  return (
    <nav className={`${className} layout-container`}>
      <ul className="header-bottom__sports">
        {sports.map((sport) => (
          <li key={`header-bottom-${sport.id}`}>
            <Link href={`${routes.SPORT}/${sport.slug}`}>{sport.name}</Link>
          </li>
        ))}
      </ul>
      <ul className="header-bottom__categories">
        {categories.map((category) => {
          if (category.children?.nodes?.length > 0) {
            return (
              <li key={`header-bottom-${category.id}`}>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {category.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {category.children.nodes.map((child) => (
                      <Dropdown.Item key={`header-bottom-child-${child.id}`}>
                        <Link href={`${routes.CATEGORY}/${child.slug}`}>
                          {child.name}
                        </Link>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
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
      <ul className="header-bottom__pages">
        <li>
          <Link href={routes.RACKET_MAPA}>Racket Mapa</Link>
        </li>
        <li>
          <Link href={routes.EVENTS}>Wydarzenia</Link>
        </li>
      </ul>
      <ul className="header-bottom__social">
        <li>
          <a href={FACEBOOK_URL} target="_blank">
            <FacebookSVG />
          </a>
        </li>
        <li>
          <a href={INSTAGRAM_URL} target="_blank">
            <InstagramSVG />
          </a>
        </li>
      </ul>
    </nav>
  );
}
