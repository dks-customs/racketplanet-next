import { Categories } from "../../api/types/categories";
import { Sports } from "../../api/types/sports";
import "./footer.scss";

type FooterProps = {
  categories: Categories;
  sports: Sports;
};

export default function Footer({ categories, sports }: FooterProps) {
  return <footer className="footer container">Footer</footer>;
}
