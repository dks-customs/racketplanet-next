"use client";

import { Categories } from "../../api/types/categories";
import { Events } from "../../api/types/events";
import { Sports } from "../../api/types/sports";
import EventsWidget from "./components/events-widget/events-widget";
import HeaderBottom from "./components/header-bottom/header-bottom";
import HeaderTop from "./components/header-top/header-top";
import { useState } from "react";

import "./header.scss";
import SideMenu from "./components/side-menu/side-menu";

type HeaderProps = {
  categories: Categories;
  sports: Sports;
  events: Events;
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
        setShowMenu={setShowMenu}
      />
    </>
  );
}
