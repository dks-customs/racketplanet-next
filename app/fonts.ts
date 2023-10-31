import {
  Playfair_Display,
  Fira_Sans,
  Playfair,
  Noto_Sans,
  Noto_Serif,
  Source_Sans_3,
  IBM_Plex_Serif,
  Abhaya_Libre,
} from "next/font/google";

// export const displayFont = Playfair_Display({
//   subsets: ["latin"],
//   variable: "--font-display",
// });

//Merriweather
//Noto Serif !
//EB_Garamond !!
//Petrona !!!
//Cantata_One !!!!

export const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "800", "900"],
});

export const bodyFont = IBM_Plex_Serif({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const uiFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-ui",
});
