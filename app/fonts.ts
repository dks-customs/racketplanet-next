import {
  Playfair_Display,
  Fira_Sans,
  Noto_Serif,
  Open_Sans,
  EB_Garamond,
  Lato,
  Play,
  Barlow_Semi_Condensed,
  Roboto_Condensed,
  Poltawski_Nowy,
  Cardo,
  Fira_Sans_Condensed,
  Fira_Sans_Extra_Condensed,
  Oswald,
  Anton,
  Lusitana,
} from "next/font/google";

// export const displayFont = Playfair_Display({
//   subsets: ["latin"],
//   variable: "--font-display",
// });

export const displayFont = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

export const uiFont = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-ui",
});

export const uiHeadingFont = Anton({
  subsets: ["latin"],
  variable: "--font-ui-heading",
  weight: ["400"],
});

// export const bodyFont = Noto_Serif({
//   weight: ["400", "500", "600"],
//   subsets: ["latin"],
//   variable: "--font-body",
// });

export const bodyFont = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});
