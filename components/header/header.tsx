"use client";
import { APICategories } from "../../api/types/categories";
import { APIEvents } from "../../api/types/events";
import { APISports } from "../../api/types/sports";
import SideMenu from "./components/side-menu/side-menu";
import SearchModal from "./components/search-modal/search-modal";
import EventsWidget from "./components/events-widget/events-widget";
import HeaderBottom from "./components/header-bottom/header-bottom";
import HeaderTop from "./components/header-top/header-top";
import { useState } from "react";

import "./header.scss";

type HeaderProps = {
  categories: APICategories;
  sports: APISports;
  events: APIEvents;
};

export default function Header({ categories, sports, events }: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <header className="header">
        <EventsWidget events={events} />
        <HeaderTop setShowSearch={setShowSearch} setShowMenu={setShowMenu} />
        <HeaderBottom categories={categories} />
      </header>
      <SideMenu
        sports={sports}
        categories={categories}
        show={showMenu}
        setShow={setShowMenu}
      />
      <SearchModal show={showSearch} setShow={setShowSearch} />
    </>
  );
}
