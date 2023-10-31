import {
  Playfair_Display,
  Fira_Sans,
  Playfair,
  Noto_Sans,
  Noto_Serif,
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
});

export const bodyFont = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-body",
});

export const uiFont = Fira_Sans({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-ui",
});
