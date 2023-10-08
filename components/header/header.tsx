"use client";
import { APICategories } from "../../graphql/types/categories";
import { APISports } from "../../graphql/types/sports";
import SideMenu from "./components/side-menu/side-menu";
import SearchModal from "./components/search-modal/search-modal";
import EventsWidget from "./components/events-widget/events-widget";
import HeaderBottom from "./components/header-bottom/header-bottom";
import HeaderTop from "./components/header-top/header-top";
import { useState } from "react";

import "./header.scss";
import { APIEvent } from "../../graphql/types/event";

type HeaderProps = {
  categories: APICategories;
  sports: APISports;
  events: APIEvent[];
};

export default function Header({ categories, sports, events }: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <header className="header">
        <EventsWidget events={events} />
        <HeaderTop setShowSearch={setShowSearch} setShowMenu={setShowMenu} />
        <HeaderBottom sports={sports} categories={categories} />
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
