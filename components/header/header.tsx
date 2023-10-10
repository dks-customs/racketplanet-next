import { APICategories } from "../../graphql/types/categories";
import { APISports } from "../../graphql/types/sports";
import SearchModal from "./components/search-modal/search-modal";
import EventsWidget from "./components/events-widget/events-widget";
import HeaderBottom from "./components/header-bottom/header-bottom";
import HeaderTop from "./components/header-top/header-top";

import "./header.scss";
import { APIEvent } from "../../graphql/types/event";

type HeaderProps = {
  categories: APICategories;
  sports: APISports;
  events: APIEvent[];
};

export default function Header({ categories, sports, events }: HeaderProps) {
  return (
    <>
      <header className="header layout-container">
        <EventsWidget events={events} />
        <HeaderTop sports={sports} categories={categories} />
        <HeaderBottom sports={sports} categories={categories} />
      </header>
    </>
  );
}
