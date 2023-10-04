import { APICategories } from "../../graphql/types/categories";
import { APISports } from "../../graphql/types/sports";
import "./footer.scss";

type FooterProps = {
  categories: APICategories;
  sports: APISports;
};

export default function Footer({ categories, sports }: FooterProps) {
  return <footer className="footer layout-container">Footer</footer>;
}
