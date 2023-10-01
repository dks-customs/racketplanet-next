import Link from "next/link";
import { routes } from "../../../../constants/constants";
import ListSVG from "../../../svg/list";
import LogoSVG from "../../../svg/logo";
import SearchSVG from "../../../svg/search";
import { Dispatch, SetStateAction } from "react";

type HeaderTopProps = {
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  setShowSearch: Dispatch<SetStateAction<boolean>>;
};

export default function HeaderTop({
  setShowMenu,
  setShowSearch,
}: HeaderTopProps) {
  return (
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
  );
}
