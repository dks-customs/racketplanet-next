import { Playfair_Display, Fira_Sans, Noto_Serif } from "next/font/google";

export const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const uiFont = Fira_Sans({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ui",
});

export const bodyFont = Noto_Serif({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
});
