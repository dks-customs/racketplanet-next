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
} from "next/font/google";

// export const displayFont = Playfair_Display({
//   subsets: ["latin"],
//   variable: "--font-display",
// });

export const displayFont = Cardo({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700"],
  // weight: ["300", "400", "500", "600", "700", "900"],
});

export const uiFont = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-ui",
});

export const uiHeadingFont = Oswald({
  subsets: ["latin"],
  variable: "--font-ui-heading",
  weight: ["300", "400", "500", "600", "700"],
});

export const bodyFont = Noto_Serif({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
});
