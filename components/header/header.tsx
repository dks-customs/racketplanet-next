"use client";

import Link from "next/link";
import { Categories } from "../../api/types/categories";
import { Events } from "../../api/types/events";
import { Sports } from "../../api/types/sports";
import EventsWidget from "../events-widget/events-widget";
import "./header.scss";
import { routes } from "../../constants/constants";
import { useState } from "react";
import ListSVG from "../svg/list";
import LogoSVG from "../svg/logo";
import SearchSVG from "../svg/search";

type HeaderProps = {
  categories: Categories;
  sports: Sports;
  events: Events;
};

export default function Header({ categories, sports, events }: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="header">
      <EventsWidget events={events} />
      <div className="header-top container">
        <button
          className="header-top__menu-btn hoverable"
          onClick={() => setShowMenu(true)}
        >
          <ListSVG />
        </button>
        <Link href={routes.HOME} className="mh__top__logo">
          <LogoSVG />
        </Link>
        <button
          className="header-top__search-btn hoverable"
          onClick={() => setShowSearch(true)}
        >
          <SearchSVG />
        </button>
      </div>
    </header>
  );
}
